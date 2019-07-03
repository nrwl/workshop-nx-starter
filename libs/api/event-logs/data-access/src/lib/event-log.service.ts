import { Injectable } from '@nestjs/common';
import {
  EventLog,
  EVENTLOGS,
  ResourceType
} from '@tuskdesk-suite/event-log-utils';
import { Request } from 'express';
import { UserService } from '@tuskdesk-suite/api/users/data-access';

@Injectable()
export class EventLogService {
  private eventLogs: EventLog[] = [...EVENTLOGS];
  private lastEventLogId = this.eventLogs.length;

  constructor(private userService: UserService) {}

  trackEvent(request: Request, context: ResourceType, intent = 'viewed') {
    const currentUser = this.userService.currentUserForRequest(request);
    this.addEventLog(currentUser ? currentUser.id : null, intent, context);
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
