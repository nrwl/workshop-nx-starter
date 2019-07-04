import { Injectable } from '@nestjs/common';
import { User, USERS } from '@tuskdesk-suite/user-utils';
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

  findByFullName(fullName: string) {
    return this.users.find(user => user.fullName === fullName);
  }

  currentUserForRequest(request: Request) {
    return this.users.find(user => user.id === +request.header('userid'));
  }
}
