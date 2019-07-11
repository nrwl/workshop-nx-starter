import { CreateTicketPostRequestBody } from './create-ticket-post-request-body.interface';
import { hasAllRequiredFields } from '@tuskdesk-suite/shared/utils';

function allFieldsAreOfProperType(
  arg: any,
  allFields: (keyof CreateTicketPostRequestBody)[]
): boolean {
  for (const [key, value] of Object.entries(arg)) {
    if (!(allFields as string[]).includes(key)) {
      return false;
    }
    switch (key) {
      case 'message': {
        if (typeof value !== 'string') {
          return false;
        }
        break;
      }
      case 'submittedByUserId':
      case 'companyId': {
        if (typeof value !== 'number') {
          return false;
        }
        break;
      }
      case 'assignedToUserId': {
        if (typeof value !== 'number' && value != null) {
          console.log('buzzzzzzzzzz');
          return false;
        }
        break;
      }
    }
  }
  return true;
}

export function isCreateTicketPostRequestBody(
  arg: any
): arg is CreateTicketPostRequestBody {
  const requiredFields: (keyof CreateTicketPostRequestBody)[] = [
    'message',
    'companyId',
    'submittedByUserId'
  ];
  const optionalFields: (keyof CreateTicketPostRequestBody)[] = [
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
