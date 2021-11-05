export class DashboardComponent {

  grabStartAnnouncement(widget): string {
    return `${ widget.id } has been grabbed`;
  }

  grabConfirmAnnouncement(widget): string {
    return `${ widget.id } has been resized to ${ widget.height }`;
  }
}
