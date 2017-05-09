import atexit
import datetime
import ssl
import sys
import time
import yaml

from pyVmomi import vim, vmodl
from pyVim import connect
from pyVim.connect import Disconnect, SmartConnect

inputs = {'vcenter_ip': '',
          'vcenter_user': '',
          'vcenter_password': '',
          'ignore_ssl': True}

def get_snapshots_recursively(snapshots, snapshot_location):
    snapshot_paths = []
    
    if not snapshots:
        return snapshot_paths 

    for snapshot in snapshots:
        if snapshot_location:
            current_snapshot_path = snapshot_location + '/' + snapshot.name
        else:
            current_snapshot_path = snapshot.name

        snapshot_paths.append(current_snapshot_path)
        snapshot_paths = snapshot_paths + get_snapshots_recursively(snapshot.childSnapshotList, current_snapshot_path)

    return snapshot_paths
    
def get_snapshots(vm):
    return get_snapshots_recursively(vm.snapshot.rootSnapshotList, '')

def wait_for_task(task):

    print('Waiting for task {0}'.format(task.info.key))
    while True:
        if task.info.state == vim.TaskInfo.State.success:
            print('Task {0} succeeded'.format(task.info.key))
            return 0
        elif task.info.state == vim.TaskInfo.State.error:
            print('Task {0} failed with error {2}'.format(task.info.key, task.info.error))
            return 1
        elif task.info.state == vim.TaskInfo.State.queued:
            print('Task {0} queued'.format(task.info.key))
            time.sleep(5)
        elif task.info.state == vim.TaskInfo.State.running:
            print('Task {0} running'.format(task.info.key))
            time.sleep(5)

def revert_to_snapshot(snapshots, sought):

    result = 1
    for snapshot in snapshots:
        if snapshot.name == sought:
            print('Found sought snapshot!')
            now = datetime.datetime.now()
            virtualMachineSnapshot = snapshot.snapshot
            virtualMachineConfigInfo = virtualMachineSnapshot.config
            revert_task = virtualMachineSnapshot.RevertToSnapshot_Task()
            print('Created RevertToSnapshot task')
            taskState = wait_for_task(revert_task)
            if taskState == 0:
                print('Reverted to specified snapshot')
                return 0
            else:
                print('Failed to revert to specified snapshot')
                return 1

        if snapshot.childSnapshotList:
            result = revert_to_snapshot(snapshot.childSnapshotList, sought)
        
    return result

def ensure_powered_on(vm):

    if vm.runtime.powerState == vim.VirtualMachinePowerState.poweredOn:
        print('Machine already powered on')
    else:
        print('Machine not powered on')
        power_on_task = vm.PowerOn()
        print('Created PowerOn task()')
        taskState = wait_for_task(power_on_task)
        
        if taskState == 0:
            print('Machine now powered on')
            return 0
        else:
            print('Machine is not powered on')
            return 1

def revertMachine(*args):

    try:
        si = None
        
        try:
            context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
            context.verify_mode = ssl.CERT_NONE

            # Read the credentials from the unencrypted file
            with open('/tmp/vsphere.yml', 'r') as f:
                inputs = yaml.load(f)
            f.close()

            if inputs['ignore_ssl']:            
                si = connect.SmartConnect(host=inputs['vcenter_ip'], user=inputs['vcenter_user'], pwd=inputs['vcenter_password'], sslContext=context)
            else:
                try:
                    si = connect.SmartConnect(host=inputs['vcenter_ip'], user=inputs['vcenter_user'], pwd=inputs['vcenter_password'])
                    print('Valid certificate')
                except:
                    si = connect.SmartConnect(host=inputs['vcenter_ip'], user=inputs['vcenter_user'], pwd=inputs['vcenter_password'], sslContext=context)
                    print('Invalid or untrusted certificate')
        except IOError as e:
            print ('Caught IOError: %s' % e.msg)
            sys.exit(1)
        
        print('')
        atexit.register(Disconnect, si)

        # Get list of VMs
        datacenter = si.content.rootFolder.childEntity[1]
        folders = datacenter.vmFolder.childEntity

        #print('Root folder child names:')
        #for f in folders:
        #    print(f.name)
        #print('')

        for f in folders: 
            if f.name == args[1]:
                vms = f.childEntity
                print('Found sought group')
                break
        print('')

        # Get the required VM, revert it to the specified snapshot and make
        # sure it is powered on
        for vm in vms:
            if vm.name == args[2]:
                print('Found sought VM')
                
                snapshotInfo = vm.snapshot
                snapshots = snapshotInfo.rootSnapshotList
                
                #print('Listing all the snapshot paths')
                #snapshot_paths = get_snapshots(vm)
                #for snapshot_path in snapshot_paths:
                #    print(snapshot_path)
                #print('')

                print('Reverting to the specified snapshot')
                result = revert_to_snapshot(vm.snapshot.rootSnapshotList, args[3])
                if result == 1:
                    return 1
                print('')

                print('Ensuring the machine is powered on')
                result = ensure_powered_on(vm)
                if result == 1:
                    return 1
                print('')

        print('')
        
        # Create file indicating tasks completed
        open(args[4], 'w').close()

        return 0

    except vmodl.MethodFault as e:
        print ('Caught vmodl fault: %s' % e.msg)
        return 1
    except Exception as e:
        if str(e).startswith("'vim.Task'"):
            return 1
        print ("Caught exception: %s" % str(e))
        return 1
    
# Start program
if __name__ == "__main__":
    revertMachine(*sys.argv)