import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '@tuskdesk-suite/api/users/data-access/src';
import { Request } from 'express';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access/src';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private eventLogService: EventLogService
  ) {}

  @Get()
  findUsers(@Req() request: Request) {
    const searchTerm =
      request.query['searchTerm'] !== undefined
        ? request.query['searchTerm']
        : null;
    const users = this.userService.findByPartialName(searchTerm);
    this.eventLogService.trackEvent(
      request,
      'user',
      `view USERS at ids: [ ${users.map(x => x.id).join(', ')} ].`
    );
    return users;
  }
}
