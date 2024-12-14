const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuIdv4 } = require('uuid');
const DB = require('./database.js');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Router
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Custom Middleware

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
  const user = await DB.getUser(req.body.username);
  if(user) {
    res.status(409).send({msg: 'A user already exists with that username'})
    return;
  } else if(!req.body.username || !req.body.password) {
    res.status(409).send({msg: 'Please fill both fields'})
    return;
  } else {
    const newUser = await DB.createUser(req.body.username, req.body.password, req.body.dateJoined);
    res.send({ token: newUser.token })
    return;
  }
})

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if(user) {
    if(await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuIdv4();
      res.send({ token: user.token })
      return;
    }
  }
  

  res.status(401).send({ msg: 'No user exists with that combination of username and password' });
})

/* Not currently being used, but may be useful in the future
apiRouter.delete('/auth/logout', (req, res) => {
  const user = users[req.body.username];

  if(user) {
    delete user.token;
  }

  res.status(204).end();
});
*/

// Obligatory end middleware
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});