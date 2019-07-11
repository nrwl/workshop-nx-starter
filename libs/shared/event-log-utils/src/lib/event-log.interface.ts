import { ResourceType } from './resource-type.type';

export interface EventLog {
  id: number;
  message: string;
  userId: number;
  resourceType: ResourceType;
  resourceId: number;
}
