import { Injectable } from '@nestjs/common';
import { User, USERS } from '@tuskdesk-suite/user-utils';

@Injectable()
export class UserService {
  private users: User[] = [...USERS];

  findAll(): User[] {
    return this.users;
  }
}
