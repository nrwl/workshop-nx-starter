import { Controller, Get } from '@nestjs/common';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access/src';

@Controller('event-logs')
export class EventLogsController {
  constructor(private eventLogService: EventLogService) {}

  @Get()
  getAllEventLogs() {
    return this.eventLogService.findAll();
  }
}
