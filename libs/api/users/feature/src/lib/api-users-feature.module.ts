import { Module } from '@nestjs/common';
import { UserService } from '@tuskdesk-suite/api/users/data-access';

@Module({
  imports: [UserService],
  controllers: [],
  providers: [],
  exports: []
})
export class ApiUsersFeatureModule {}
