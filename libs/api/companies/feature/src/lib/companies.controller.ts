import { Controller, Get, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { CompanyService } from '@tuskdesk-suite/api/companies/data-access';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { UserService } from '@tuskdesk-suite/api/users/data-access';

@Controller('companies')
export class CompaniesController {
  constructor(
    private companyService: CompanyService,
    private eventLogService: EventLogService,
    private userService: UserService
  ) {}

  @Get()
  getAllCompanies(@Req() request: Request) {
    const companies = this.companyService.findAll();
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'company',
      'viewed all COMPANIES'
    );
    return companies;
  }

  @Get(':id')
  getCompany(@Req() request: Request) {
    const company = this.companyService.findById(+request.params.id);
    if (!company) {
      throw new BadRequestException(
        `No company exists at ${+request.params.id}`
      );
    }
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'company',
      `viewed COMPANY at id: ${company.id}`,
      company.id
    );
    return company;
  }

  @Get(':id/users')
  getCompanyUsers(@Req() request: Request) {
    const company = this.companyService.findById(+request.params.id);
    if (!company) {
      throw new BadRequestException(
        `No company exists at id: ${+request.params.id}.`
      );
    }
    const users = company.userIds.map(userId =>
      this.userService.findById(userId)
    );
    if (!users) {
      throw new BadRequestException(
        `No Users exist for Company at id: ${+request.params.id}.`
      );
    }
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'user',
      `viewed USERS at COMPANY id: ${company.id}`
    );
    return users;
  }
}
