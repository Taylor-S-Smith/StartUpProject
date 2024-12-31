const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB = require('./database.js');
const passport = require('passport');
const { hashPassword } = require('./lib/passwordUtils.js');// Gives access to .env file via process.env.VARIABLE_NAME
require('./passport.js');
require('dotenv').config();

const app = express();

// Database store for sessions
const sessionStore = MongoStore.create({
  clientPromise: DB.client.connect(),
  dbName: 'startup',
  collectionName: 'session'
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Use our passport.js configurations
app.use(passport.initialize());
app.use(passport.session());

// Logging for authentication/session debugging
app.use((req, res, next) => {
  //console.log(req.session);
  //console.log(req.user)
  next();
})

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

//NOT USING express.urlencoded({extended:true})), review this if errors happen

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World!</h1>')
})

// Router
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/test', async (req, res) => {
  res.status(200).end();
})

apiRouter.post('/story/submitchapter', async (req, res) => {
  const chapter = await DB.createChapter(req.body.chapterTitle, req.body.choiceText, req.body.chapterText, [req.body.proposedConnection], [], false);

  res.send({Id: chapter.Id})
})

apiRouter.post('/story/approvechapter', async (req, res) => {
  const numUpdated = await DB.updateChapterApproval(req.body.chapterId, true)
  if(numUpdated > 0) {
    res.status(204).end();
  } else {
    res.status(404).send({msg: 'No chapter exists with that Id'});
  }
})

apiRouter.delete('/story/denychapter', async (req, res) => {
  const numDeleted = await DB.deleteChapter(req.body.chapterId);

  if(numDeleted > 0) {
    res.status(204).end();
  } else {
    res.status(404).send({msg: 'No chapter exists with that Id'});
  }
})

apiRouter.get('/story/getchapter/:chapterId', async (req, res) => {
  const chapter = await DB.getChapter(req.params.chapterId);
  if(chapter) {
    res.send({chapter});
  } else {
    res.status(404).send({msg: 'No chapter exists with that Id'});
  }
})

apiRouter.get('/story/getawaitingapproval', async (req, res) => {
  const unapprovedChapters = Object.values(await DB.getAllChapters()).filter(chapter => !chapter.isApproved)

  res.send(unapprovedChapters);
})

apiRouter.get('/story/getapproved', async (req, res) => {
  const approvedChapters = Object.values(await DB.getAllChapters()).filter(chapter => chapter.isApproved)

  res.send(approvedChapters);
})

apiRouter.get('/users/getall', async (req, res) => {
  const userArray = Object.values(await DB.getAllUsers());

  res.send(userArray);
})

apiRouter.get('/joke', async (req, res) => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    },
  });
  const data = await response.json();
  res.send(data);
})

//NOTE TO GRADER: This login logic was copied from simon with some changes to reflect my applications usage of user data
//I am not sure how similar we were allowed to make it, since we were given the code. If is too similar I would be happy to remove it.

apiRouter.post('/auth/signup', async (req, res) => {

  const { username, password, dateJoined } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide both username and password' });
  }

  const existingUser = await DB.getUser(username);
  if (existingUser) {
    return res.status(409).json({ msg: 'A user already exists with that username' });
  }

  const {salt, hash} = hashPassword(password);
  const newUser = await DB.createUser(username, hash, salt, dateJoined);

  req.login(newUser, (err) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ 
      msg: 'User created successfully', 
      isAuthenticated: true,
      user: req.user 
    });
  });
})

// The second function will only be called if authenticate succeeds, but this is not optimal.
// We don't have control over errors. and Perplexity doesn't like it
// Alternatively, you can replace the second function with { failureRedirect: '', successRedirect: ''}

apiRouter.post('/auth/login', passport.authenticate('local'), async (req, res) => {
    res.status(200).json({
      isAuthenticated: true,
      user: req.user
    });
});


apiRouter.post('/auth/logout', (req, res, next) => {
  req.logout((err) => {
      if (err) { return next(err); }
      
      if (req.session) {
          req.session.destroy((err) => {
              if (err) {
                  res.status(400).json({ message: 'Unable to logout' });
              } else {
                  res.status(204).end();
              }
          });
      } else {
          res.status(204).end();
      }
  });
});

// Authentication middleware
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      isAuthenticated: false,
      user: null
    });
  }
  next();
};

// Admin authentication middleware
const adminAuthMiddleware = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.admin) {
    return res.status(403).json({
      isAuthenticated: false,
      user: null
    });
  }
  next();
};

apiRouter.get('/auth/check', authMiddleware, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user
  });
});

apiRouter.get('/auth/admin', adminAuthMiddleware, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user
  });
});

// Obligatory end middleware

apiRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

