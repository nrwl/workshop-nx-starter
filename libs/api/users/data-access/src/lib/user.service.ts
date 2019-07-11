import { Injectable } from '@nestjs/common';
import { User, USERS } from '@tuskdesk-suite/shared/user-utils';
import { Request } from 'express';

@Injectable()
export class UserService {
  private users: User[] = [...USERS];

  findAll(): User[] {
    return this.users;
  }

  // TODO: better performance...
  findById(id: number) {
    return this.users.find(user => user.id === id);
  }

  findByPartialName(searchTerm: string) {
    return this.users.filter(user =>
      searchTerm
        ? user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
  }

  findByFullName(fullName: string) {
    return this.users.find(user => user.fullName === fullName);
  }

  currentUserForRequest(request: Request) {
    return this.users.find(user => user.id === +request.header('userid'));
  }
}
