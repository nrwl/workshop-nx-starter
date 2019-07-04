import { CreateCommentRequestBody } from './create-comment-request-body.interface';

export function isCreateCommentRequestBody(
  arg: any
): arg is CreateCommentRequestBody {
  if (Object.entries(arg).length !== 2) {
    return false;
  }
  if (!arg.message || typeof arg.message !== 'string') {
    return false;
  }
  if (!arg.ticketId || typeof arg.ticketId !== 'number') {
    return false;
  }
  return true;
}
