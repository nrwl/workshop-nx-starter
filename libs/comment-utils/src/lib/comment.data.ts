import { Comment } from './comment.interface';

export const COMMENTS: Comment[] = [
  {
    id: 1,
    message: 'Booted into safe mode but not sure what to do from there',
    ticketId: 1,
    userId: 1,
    userFullName: 'Carter Moss'
  },
  {
    id: 2,
    message: 'Log in as an admin and manage USERS, enable root',
    ticketId: 5,
    userId: 8,
    userFullName: 'Jeff Nrwl'
  },
  {
    id: 3,
    message: 'Choose rollback - last good known config',
    ticketId: 2,
    userId: 9,
    userFullName: 'Justin Nrwl'
  }
];
