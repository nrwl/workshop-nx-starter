import { Injectable } from '@nestjs/common';
import { Company, COMPANIES } from '@tuskdesk-suite/company-utils';

@Injectable()
export class CompanyService {
  private companies: Company[] = [...COMPANIES];
}
