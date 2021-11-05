...
grabStartAnnouncement(widget: DashboardWidgetComponent): string {
  return `${ widget.id } has been grabbed`;
}

grabConfirmAnnouncement(widget: DashboardWidgetComponent): string {
  return `${ widget.id } has been resized to ${ widget.height }`;
}
...