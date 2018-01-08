export class ScrollAdapter {

    constructor(element) {
        this.element = element ? angular.element(element) : null;
        this.subscribers = [];
    }

    /**
     * Subscribe to events
     */
    subscribe(event, callback) {
        this.subscribers.push({
            event: event,
            callback: callback
        });
    }

    /**
     * Notify subscribers about an event
     */
    notify(event, value) {

        this.subscribers
            .filter(subscriber => subscriber.event === event)
            .forEach(subscriber => subscriber.callback(value));
    }

    /**
     * Tear down the scroll adapter
     */
    destroy() {
        this.element = null;
        this.subscribers = [];
    }
}