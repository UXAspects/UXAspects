@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ConduitZone]
})
export class AppComponent extends ConduitZoneComponent {
    zoneId: string = 'root-zone';
}