import * as express from 'express';
import * as bodyParser from 'body-parser';

const args = process.argv.slice(2);
const throttle = args.indexOf('--throttle') >= 0;
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const users: User[] = [
  {id: 1, username: 'cmoss', fullName: 'Carter Moss', isAgent: false},
  {id: 2, username: 'francis', fullName: 'Frank Smith', isAgent: false},
  {id: 3, username: 'yardling', fullName: 'Kim Rush', isAgent: false},
  {id: 4, username: 'mr90s', fullName: 'Peter Jones', isAgent: false},
  {id: 5, username: 'msantana', fullName: 'Margo Santana', isAgent: false},
  {id: 6, username: 'optin88', fullName: 'Mark Press', isAgent: false},
  {id: 7, username: 'tinycap', fullName: 'Terry Cruz', isAgent: false},
  {id: 8, username: 'jeffnrwl', fullName: 'Jeff Nrwl', isAgent: true},
  {id: 9, username: 'justinnrwl', fullName: 'Justin Nrwl', isAgent: true}
];


const tickets: Ticket[] = [
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

const comments: Comment[] = [
  {
    id: 1,
    message: 'Booted into safe mode but not sure what to do from there',
    ticketId: 1,
    userId: 1,
    userFullName: 'Carter Moss'
  },
  {
    id: 2, message: 'Log in as an admin and manage users, enable root', ticketId: 5,
    userId: 8,
    userFullName: 'Jeff Nrwl'
  },
  {
    id: 3, message: 'Choose rollback - last good known config', ticketId: 2,
    userId: 9,
    userFullName: 'Justin Nrwl'
  }
];

const companies: Company[] = [
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

const eventLogs: EventLog[] = [
  {id: 1, message: 'viewed open tickets', userId: 1, resourceType: 'ticket', resourceId: null},
  {id: 2, message: 'created ticket', userId: 1, resourceType: 'ticket', resourceId: 1},
  {id: 3, message: 'viewed companies', userId: 9, resourceType: 'company', resourceId: null},
  {id: 4, message: 'viewed company details', userId: 9, resourceType: 'company', resourceId: 2},
  {id: 5, message: 'viewed ticket details', userId: 1, resourceType: 'ticket', resourceId: 1}
];

let lastCommentId = comments.length;
let lastEventLogId = eventLogs.length;

app.get('/api/tickets', (req, res) => {
  const currentUser = getCurrentUser(req);
  const status = req.query['status'] !== 'undefined' ? req.query['status'] : null;
  const searchTerm = req.query['searchTerm'] !== 'undefined' ? req.query['searchTerm'] : null;
  const assignedToUser = req.query['assignedToUser'] !== 'undefined' ? req.query['assignedToUser'] : null;
  setTimeout(() => {
    if (currentUser) {
      let ticketsToReturn = currentUser.isAgent
        ? tickets
        : tickets.filter(ticket => ticket.submittedByUserId === currentUser.id);
      if (assignedToUser) {
        const user = users
          .find(u => u.fullName.toLowerCase() === assignedToUser.toLowerCase());
        if (user) {
          ticketsToReturn = ticketsToReturn.filter(ticket => ticket.assignedToUserId === user.id);
        } else {
          res.send([]);
          addEventLog(currentUser.id, 'viewed tickets', 'tickets');
          return;
        }
      }
      if (searchTerm) {
        ticketsToReturn = ticketsToReturn.filter(ticket => ticket.message.indexOf(searchTerm) >= 0);
      }
      if (status) {
        ticketsToReturn = ticketsToReturn.filter(ticket => ticket.status === status);
      }
      res.send(ticketsToReturn);
      addEventLog(currentUser.id, 'viewed tickets', 'tickets');
    } else {
      res.status(401).send({error: `not authorized`});
    }
  }, randomDelay(throttle));
});

app.get('/api/comments', (req, res) => {
  setTimeout(() => {
    res.send(comments);
  }, randomDelay(throttle));
});

app.get('/api/users', (req, res) => {
  const searchTerm = req.query['searchTerm'] !== 'undefined' ? req.query['searchTerm'] : null;
  setTimeout(() => {
    let usersToReturn = users;
    if (searchTerm) {
      usersToReturn = users
        .filter(user => user.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
    res.send(usersToReturn);
  }, randomDelay(throttle));
});

app.get('/api/eventlogs', (req, res) => {
  setTimeout(() => {
    res.send(eventLogs);
  }, randomDelay(throttle));
});

app.get('/api/companies', (req, res) => {
  const currentUser = getCurrentUser(req);
  setTimeout(() => {
    if (currentUser && currentUser.isAgent) {
      res.send(companies);
      addEventLog(currentUser.id, 'viewed companies', 'companies');
    } else {
      res.status(401).send({error: `not authorized`});
    }
  }, randomDelay(throttle));
});

app.get('/api/companies/:id', (req, res) => {
  const currentUser = getCurrentUser(req);
  setTimeout(() => {
    if (currentUser && currentUser.isAgent) {
      const id = +req.params.id;
      const matching = companies.filter(t => t.id === id)[0];
      if (matching) {
        res.send(matching);
        addEventLog(currentUser.id, 'viewed company details', 'companies', id);
      } else {
        res.status(404).send({error: `Cannot find company ${+req.params.id}`});
      }
    } else {
      res.status(401).send({error: `not authorized`});
    }
  }, randomDelay(throttle));
});

app.get('/api/companies/:id/users', (req, res) => {
  setTimeout(() => {
    const matching = companies.filter(t => t.id === +req.params.id)[0];
    if (matching) {
      res.send(matching.userIds.map(userId => users.find(user => user.id === userId)));
    } else {
      res.status(404).send({error: `Cannot find company ${+req.params.id}`});
    }
  }, randomDelay(throttle));
});

app.get('/api/tickets/:id', (req, res) => {
  const currentUser = getCurrentUser(req);
  setTimeout(() => {
    if (currentUser) {
      const id = +req.params.id;
      const matching = currentUser.isAgent
        ? tickets.filter(t => t.id === id)[0]
        : tickets.filter(t => t.id === id && t.submittedByUserId === currentUser.id)[0];
      if (matching) {
        res.send(matching);
        addEventLog(currentUser.id, 'viewed ticket details', 'tickets', id);
      } else {
        res.status(404).send({error: `Cannot find ticket ${+req.params.id}`});
      }
    } else {
      res.status(401).send({error: `not authorized`});
    }
  }, randomDelay(throttle));
});

app.get('/api/tickets/:id/comments', (req, res) => {
  setTimeout(() => {
    const matching = comments.filter(t => t.ticketId === +req.params.id);
    if (matching) {
      res.send(matching);
    } else {
      res.status(404).send({error: `Cannot find comments for ticket id ${+req.params.id}`});
    }
  }, randomDelay(throttle));
});

app.get('/api/users/:id', (req, res) => {
  setTimeout(() => {
    const matching = users.filter(t => t.id === +req.params.id)[0];
    if (matching) {
      res.send(matching);
    } else {
      res.status(404).send({error: `Cannot find user ${+req.params.id}`});
    }
  }, randomDelay(throttle));
});

app.put('/api/tickets', (req, res) => {
  const currentUser = getCurrentUser(req);
  setTimeout(() => {
    if (currentUser) {
      const t = req.body;
      if (!t.message) {
        res.status(500).send({error: `Message is a required field`});
      } else {
        const existingTicket = tickets.find(ticket => ticket.id === t.id);
        existingTicket.message = t.message;
        res.send(existingTicket);
      }
    } else {
      res.status(401).send({error: `not authorized`});
    }
  }, randomDelay(throttle));
});


app.post('/api/comments', (req, res) => {
  const currentUser = getCurrentUser(req);
  setTimeout(() => {
    if (currentUser) {
      const t = req.body;
      if (!t.message) {
        res.status(500).send({error: `Message is a required field`});
      } else {
        const newComment: Comment = {
          id: ++lastCommentId,
          message: t.message,
          ticketId: t.ticketId,
          userId: currentUser.id,
          userFullName: currentUser.fullName
        };
        comments.push(newComment);
        res.send(newComment);
      }
    } else {
      res.status(401).send({error: `not authorized`});
    }
  }, randomDelay(throttle));
});

app.post('/api/assign', (req, res) => {
  setTimeout(() => {
    const ticketId = req.body.ticketId;
    const assignToUserId = req.body.assignToUserId;

    const matchingTicket = tickets.filter(t => t.id === ticketId)[0];
    const matchingUser = users.filter(u => u.id === assignToUserId)[0];

    if (!matchingTicket) {
      res.status(404).send({error: `Cannot find ticket ${ticketId}`});
    } else if (!matchingUser) {
      res.status(404).send({error: `Cannot find user ${assignToUserId}`});
    } else {
      matchingTicket.assignedToUserId = assignToUserId;
      res.send(matchingTicket);
    }
  }, randomDelay(throttle));
});

app.post('/api/complete', (req, res) => {
  setTimeout(() => {
    const ticketId = req.body.ticketId;
    const matchingTicket = tickets.filter(t => t.id === ticketId)[0];
    if (!matchingTicket) {
      res.status(404).send({error: `Cannot find ticket ${ticketId}`});
    } else {
      matchingTicket.status = 'completed';
      res.send(matchingTicket);
    }
  }, randomDelay(throttle));
});

app.listen(3000, () => console.log('Backend service listening on port 3000!'));


function randomDelay(throttleEnabled: boolean = false) {
  return throttleEnabled ? Math.random() * 4000 : 1;
}

function getCurrentUser(req) {
  const userId = +req.header('userid');
  return users.find(user => user.id === userId);
}

function addEventLog(userId, message, resourceType, resourceId = null) {
  eventLogs.push({
    id: ++lastEventLogId,
    message,
    resourceType,
    userId,
    resourceId
  });
}


interface Ticket {
  id: number;
  message: string;
  status: string;
  companyId: number;
  submittedByUserId: number;
  assignedToUserId: number;
  assignedToUserFullName: string;
}

interface Comment {
  id: number;
  message: string;
  ticketId: number;
  userId: number;
  userFullName: string;
}

interface Company {
  id: number;
  name: string;
  userIds: number[];
}

interface User {
  id: number;
  username: string;
  fullName: string;
  isAgent: boolean;
}

interface EventLog {
  id: number;
  message: string;
  userId: number;
  resourceType: string;
  resourceId: number;
}
