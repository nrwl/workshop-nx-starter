import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { createTicketRequestFromRequest } from '@tuskdesk-suite/ticket-utils';
import { UserService } from '@tuskdesk-suite/api/users';

@Controller('ticket')
export class TicketController {
  constructor(private userService: UserService) {}

  @Get()
  getData(@Req() request: Request) {
    // const ticketRequest = createTicketRequestFromRequest(request, []);
    // return { data: 'data' };
    return this.userService.findAll();
  }
}
