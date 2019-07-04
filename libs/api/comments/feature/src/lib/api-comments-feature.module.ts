import { Module } from '@nestjs/common';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';
import { CommentsController } from './comments.controller';

@Module({
  imports: [ApiCommentsDataAccessModule],
  controllers: [CommentsController]
})
export class ApiCommentsFeatureModule {}
