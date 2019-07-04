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

export const EXPECTED_ALL_EVENT_LOGS = [
  {
    id: 1,
    message: 'viewed open TICKETS',
    userId: 1,
    resourceType: 'ticket',
    resourceId: null
  },
  {
    id: 2,
    message: 'created ticket',
    userId: 1,
    resourceType: 'ticket',
    resourceId: 1
  },
  {
    id: 3,
    message: 'viewed COMPANIES',
    userId: 9,
    resourceType: 'company',
    resourceId: null
  },
  {
    id: 4,
    message: 'viewed company details',
    userId: 9,
    resourceType: 'company',
    resourceId: 2
  },
  {
    id: 5,
    message: 'viewed ticket details',
    userId: 1,
    resourceType: 'ticket',
    resourceId: 1
  }
];

export const EXPECTED_ALL_COMMENTS = [
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

export const EXPECTED_ALL_COMPANIES = [
  {
    id: 1,
    name: 'Lake Farms',
    userIds: [1, 2, 3]
  },
  {
    id: 2,
    name: 'UWear',
    userIds: [4]
  },
  {
    id: 3,
    name: 'Time Travel Inc',
    userIds: [5]
  },
  {
    id: 4,
    name: 'Range Solutions',
    userIds: [6]
  },
  {
    id: 5,
    name: 'Metric Acoustics',
    userIds: [7]
  }
];

export const EXPECTED_SINGLE_COMPANY = {
  id: 1,
  name: 'Lake Farms',
  userIds: [1, 2, 3]
};

export const EXPECTED_SINGLE_COMPANY_USERS = [
  { id: 1, username: 'cmoss', fullName: 'Carter Moss', isAgent: false },
  { id: 2, username: 'francis', fullName: 'Frank Smith', isAgent: false },
  { id: 3, username: 'yardling', fullName: 'Kim Rush', isAgent: false }
];

export const EXPECTED_USERS = [
  { id: 1, username: 'cmoss', fullName: 'Carter Moss', isAgent: false },
  { id: 2, username: 'francis', fullName: 'Frank Smith', isAgent: false },
  { id: 3, username: 'yardling', fullName: 'Kim Rush', isAgent: false },
  { id: 4, username: 'mr90s', fullName: 'Peter Jones', isAgent: false },
  { id: 5, username: 'msantana', fullName: 'Margo Santana', isAgent: false },
  { id: 6, username: 'optin88', fullName: 'Mark Press', isAgent: false },
  { id: 7, username: 'tinycap', fullName: 'Terry Cruz', isAgent: false },
  { id: 8, username: 'jeffnrwl', fullName: 'Jeff Nrwl', isAgent: true },
  { id: 9, username: 'justinnrwl', fullName: 'Justin Nrwl', isAgent: true },
  { id: 10, username: 'zacknrwl', fullName: 'Zack Nrwl', isAgent: true }
];

export const EXPECTED_USERS_WITH_SEARCH_TERM = [
  { id: 10, username: 'zacknrwl', fullName: 'Zack Nrwl', isAgent: true }
];

export const EXPECTED_SINGLE_USER = {
  id: 10,
  username: 'zacknrwl',
  fullName: 'Zack Nrwl',
  isAgent: true
};

export const EXPECTED_CREATE_TICKET = [
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
  },
  {
    id: 8,
    message: 'test',
    status: 'open',
    companyId: 1,
    submittedByUserId: 1,
    assignedToUserId: null,
    assignedToUserFullName: null
  }
];

export const EXPECTED_UPDATED_TICKETS = [
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
    status: 'closed',
    companyId: 1,
    submittedByUserId: 1,
    assignedToUserId: 10,
    assignedToUserFullName: 'Zack Nrwl'
  }
];
