import { Controller, Get, Req } from '@nestjs/common';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access/src';
import { Request } from 'express';

@Controller('event-logs')
export class EventLogsController {
  constructor(private eventLogService: EventLogService) {}

  @Get()
  getAllEventLogs(@Req() request: Request) {
    const eventLogs = this.eventLogService.findAll();
    this.eventLogService.trackEvent(
      request,
      'event-log',
      'viewed all EVENTLOGS'
    );
    return eventLogs;
  }
}
