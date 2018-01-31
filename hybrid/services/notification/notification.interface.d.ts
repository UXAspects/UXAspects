export interface INotificationService {
    showNotification(options: NotificationOptions): HTMLElement;
    dismissNotification(element: HTMLElement): void;
    dismissAllNotifications(): void;
    getNotifications(): any[];
    setNotificationVisibility(visible: boolean): void;
    setDirection(direction: 'append' | 'prepend'): void;
}
export interface NotificationOptions {
    icon: string;
    title: string;
    text: string;
    subtitle: Date;
    duration: number;
    backgroundColor: string;
}
