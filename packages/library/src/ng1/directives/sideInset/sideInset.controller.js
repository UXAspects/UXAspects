export default function SideInsetCtrl() {

}

SideInsetCtrl.prototype.setInitialWidth = function() {
    var si = this;

    si.mainContentWidth = 100 - si.sideInsetWidth;

    si.mainElement.style.width = '100%';
    si.sidePanel.style.width = '0%';

    if (si.position.right) {
        delete si.toggleButton.style.left;
        si.toggleButton.style.right = 0;
    } else if (si.position.left) {
        delete si.toggleButton.style.right;
        si.toggleButton.style.left = 0;
    }


    si.icon = si.position.right ? 'hpe-previous' : 'hpe-next';
    si.panelOpen = false;
};

SideInsetCtrl.prototype.setExpandedWidth = function() {
    var si = this;
    si.mainElement.style.width = si.mainContentWidth + '%';
    var sidePanelWidth = 100 - si.mainContentWidth;
    si.sidePanel.style.width = (sidePanelWidth) + '%';

    si.icon = si.position.right ? 'hpe-next' : 'hpe-previous';
    si.panelOpen = true;
};

SideInsetCtrl.prototype.togglePanel = function() {
    var si = this;
    if (si.panelOpen) {
        si.setInitialWidth();
    } else {
        si.setExpandedWidth();
    }
};