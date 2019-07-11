import { hasAllRequiredFields } from '@tuskdesk-suite/shared/utils';
import { UpdateTicketPostRequestBody } from './update-ticket-post-request-body.interface';

function allFieldsAreOfProperType(
  arg: any,
  allFields: (keyof UpdateTicketPostRequestBody)[]
): boolean {
  for (const [key, value] of Object.entries(arg)) {
    if (!(allFields as string[]).includes(key)) {
      return false;
    }
    switch (key) {
      case 'status':
      case 'message': {
        if (typeof value !== 'string') {
          return false;
        }
        break;
      }
      case 'id': {
        if (typeof value !== 'number') {
          return false;
        }
        break;
      }
      case 'assignedToUserId': {
        if (typeof value !== 'number' && value !== null) {
          return false;
        }
        break;
      }
    }
  }
  return true;
}

export function isUpdateTicketPostRequestBody(
  arg: any
): arg is UpdateTicketPostRequestBody {
  const requiredFields: (keyof UpdateTicketPostRequestBody)[] = ['id'];
  const optionalFields: (keyof UpdateTicketPostRequestBody)[] = [
    'message',
    'status',
    'assignedToUserId'
  ];
  if (!hasAllRequiredFields(arg, requiredFields)) {
    return false;
  }
  if (!allFieldsAreOfProperType(arg, [...requiredFields, ...optionalFields])) {
    return false;
  }
  return true;
}
