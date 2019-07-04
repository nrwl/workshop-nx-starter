import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { CompanyService } from '@tuskdesk-suite/api/companies/data-access/src';

@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getAllCompanies(@Req() request: Request) {
    const companies = this.companyService.findAll();
    this.companyService.trackEvent(request, 'company', 'viewed all COMPANIES');
    return companies;
  }

  @Get(':id')
  getCompany(@Req() request: Request) {
    const company = this.companyService.findById(+request.params.id);
    this.companyService.trackEvent(
      request,
      'company',
      `viewed COMPANY at id: ${company.id}`,
      company.id
    );
    return company;
  }
}
