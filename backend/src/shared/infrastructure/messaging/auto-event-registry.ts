import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InMemoryEventBus } from './in-memory-event-bus';
import { EVENT_HANDLER_METADATA } from '../../application/events/event-handler.decorator';

@Injectable()
export class AutoEventRegistry {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly eventBus: InMemoryEventBus
    ) { }

    async registerAllHandlers(): Promise<void> {
        const providers = this.discoveryService.getProviders();

        for (const provider of providers) {
            const instance = provider.instance;
            const eventName = Reflect.getMetadata(EVENT_HANDLER_METADATA, instance.constructor);

            if (eventName && typeof instance.handle === 'function') {
                this.eventBus.registerHandler(eventName, instance);
            }
        }
    }
}