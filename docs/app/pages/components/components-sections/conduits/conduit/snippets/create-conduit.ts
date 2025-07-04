class AppComponent {
  @Conduit({ id: 'search' }) search = new BehaviorSubject<string>('');
}
