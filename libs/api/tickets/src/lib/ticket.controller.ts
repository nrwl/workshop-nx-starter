import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { TicketService } from './ticket/ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  getData(@Req() request: Request) {
    return this.ticketService.findMatchingTickets(request);
  }
}
