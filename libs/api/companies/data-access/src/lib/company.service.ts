import { Injectable } from '@nestjs/common';
import { Company, COMPANIES } from '@tuskdesk-suite/company-utils';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { User } from '@tuskdesk-suite/user-utils';
import { UserService } from '@tuskdesk-suite/api/users/data-access';

@Injectable()
export class CompanyService {
  private companies: Company[] = [...COMPANIES];

  constructor(private userService: UserService) {}

  findAll(): Company[] {
    return this.companies;
  }

  findById(id: number): Company {
    return this.companies.find(company => company.id === id);
  }

  findUsers(company: Company): User[] {
    return company.userIds.map(userId => this.userService.findById(userId));
  }
}
