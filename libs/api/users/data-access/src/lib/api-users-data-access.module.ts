import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService],
  exports: [UserService]
})
export class ApiUsersDataAccessModule {}
