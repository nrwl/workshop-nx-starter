import { Injectable } from '@nestjs/common';
import { Company, COMPANIES } from '@tuskdesk-suite/company-utils';
import { ResourceType } from '@tuskdesk-suite/event-log-utils';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { Request } from 'express';

@Injectable()
export class CompanyService {
  private companies: Company[] = [...COMPANIES];

  constructor(private eventLogService: EventLogService) {}

  findAll(): Company[] {
    return this.companies;
  }

  findById(id: number): Company {
    return this.companies.find(company => company.id === id);
  }

  trackEvent(
    request: Request,
    context: ResourceType,
    intent = 'viewed',
    itemId?: number
  ) {
    this.eventLogService.trackEvent(request, context, intent, itemId);
  }
}
