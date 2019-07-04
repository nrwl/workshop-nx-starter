export const EXPECTED_ALL_TICKETS = [
  {
    id: 1,
    message: 'PC keeps rebooting after startup',
    status: 'open',
    companyId: 1,
    submittedByUserId: 1,
    assignedToUserId: null,
    assignedToUserFullName: null
  },
  {
    id: 2,
    message: 'My toaster keeps ping flooding my network',
    status: 'completed',
    companyId: 1,
    submittedByUserId: 1,
    assignedToUserId: 9,
    assignedToUserFullName: 'Justin Nrwl'
  },
  {
    id: 3,
    message: 'No issues, just wanted to say thank you through here!',
    status: 'open',
    companyId: 2,
    submittedByUserId: 4,
    assignedToUserId: null,
    assignedToUserFullName: null
  },
  {
    id: 4,
    message: 'How do I get docker running as host',
    status: 'open',
    companyId: 3,
    submittedByUserId: 5,
    assignedToUserId: null,
    assignedToUserFullName: null
  },
  {
    id: 5,
    message: 'Not able to get software installed as root user',
    status: 'completed',
    companyId: 4,
    submittedByUserId: 6,
    assignedToUserId: 8,
    assignedToUserFullName: 'Jeff Nrwl'
  },
  {
    id: 6,
    message: 'I cannot get my 28.8 modem to connect',
    status: 'completed',
    companyId: 4,
    submittedByUserId: 7,
    assignedToUserId: 8,
    assignedToUserFullName: 'Jeff Nrwl'
  },
  {
    id: 7,
    message: 'Cannot connect to WiFi at our office from my second laptop',
    status: 'open',
    companyId: 1,
    submittedByUserId: 1,
    assignedToUserId: 8,
    assignedToUserFullName: 'Jeff Nrwl'
  }
];

export const EXPECTED_SINGLE_TICKET = {
  id: 1,
  message: 'PC keeps rebooting after startup',
  status: 'open',
  companyId: 1,
  submittedByUserId: 1,
  assignedToUserId: null,
  assignedToUserFullName: null
};

export const EXPECTED_SINGLE_TICKET_COMMENTS = [
  {
    id: 1,
    message: 'Booted into safe mode but not sure what to do from there',
    ticketId: 1,
    userId: 1,
    userFullName: 'Carter Moss'
  }
];