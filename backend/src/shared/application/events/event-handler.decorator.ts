export const EVENT_HANDLER_METADATA = 'event_handler';

export function EventHandler(eventName: string) {
    return function (target: any) {
        Reflect.defineMetadata(EVENT_HANDLER_METADATA, eventName, target);
    };
}