import { Controller, Get, Req } from '@nestjs/common';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { Request } from 'express';
import { UserService } from '@tuskdesk-suite/api/users/data-access';

@Controller('event-logs')
export class EventLogsController {
  constructor(
    private eventLogService: EventLogService,
    private userService: UserService
  ) {}

  @Get()
  getAllEventLogs(@Req() request: Request) {
    const eventLogs = this.eventLogService.findAll();
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'event-log',
      'viewed all EVENTLOGS'
    );
    return eventLogs;
  }
}
