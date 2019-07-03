import { Injectable } from '@nestjs/common';
import { User, USERS } from '@tuskdesk-suite/user-utils';

@Injectable()
export class UserService {
  private users: User[] = [...USERS];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number) {
    return this.users.find(user => user.id === id);
  }

  findByFullName(fullName: string) {
    return this.users.find(user => user.fullName === fullName);
  }
}
