import { Injectable } from '@nestjs/common';
import {
  EventLog,
  EVENTLOGS,
  ResourceType
} from '@tuskdesk-suite/shared/event-log-utils';
import { User } from '@tuskdesk-suite/shared/user-utils';

@Injectable()
export class EventLogService {
  private eventLogs: EventLog[] = [...EVENTLOGS];
  private lastEventLogId = this.eventLogs.length;

  trackEvent(
    requestingUser: User,
    context: ResourceType,
    intent = 'viewed',
    itemId?: number
  ) {
    this.addEventLog(
      requestingUser ? requestingUser.id : null,
      intent,
      context,
      itemId
    );
  }

  findAll(): EventLog[] {
    return this.eventLogs;
  }

  private addEventLog(
    userId: number,
    message: string,
    resourceType: ResourceType,
    resourceId: number = null
  ) {
    this.eventLogs = [
      ...this.eventLogs,
      { id: ++this.lastEventLogId, message, resourceType, userId, resourceId }
    ];
  }
}
