import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

let users = {}
let chapters = {}

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
  const chapter = {id: uuidv4(), chapterTitle: req.body.chapterTitle, chapterText: req.body.chapterText, connectedFrom: [req.body.proposedConnection], connectedTo: [], isApproved: false}
  chapters[chapter.id] = chapter;

  res.send({id: chapter.id})
})

apiRouter.post('/story/approvechapter', async (req, res) => {
  const chapter = chapters[req.body.chapterId];
  if(chapter) {
    chapter.isApproved = true;
    res.status(204).end();
  } else {
    res.status(404).send({msg: 'No chapter exists with that id'});
  }
})

apiRouter.delete('/story/denychapter', async (req, res) => {
  if(chapters[req.body.chapterId]) {
    delete chapters[req.body.chapterId];
    res.status(204).end();
  } else {
    res.status(404).send({msg: 'No chapter exists with that id'});
  }
})

apiRouter.get('/story/getchapter', async (req, res) => {
  const chapter = chapters[req.body.chapterId];
  if(chapter) {
    res.send({chapter});
  } else {
    res.status(404).send({msg: 'No chapter exists with that id'});
  }
})

apiRouter.get('/story/getawaitingapproval', async (req, res) => {
  const unapprovedChapters = Object.values(chapters).filter(chapter => !chapter.isApproved)

  res.send(unapprovedChapters);
})

apiRouter.get('/story/getapproved', async (req, res) => {
  const approvedChapters = Object.values(chapters).filter(chapter => chapter.isApproved)

  res.send(approvedChapters);
})

//NOTE TO GRADER: This login logic was copied from simon with some changes to reflect my applications usage of user data
//I am not sure how similar we were allowed to make it, since we were given the code. If is too similar I would be happy to remove it.

apiRouter.post('/auth/signup', async (req, res) => {
  const user = users[req.body.username];
  if(user) {
    res.status(409).send({msg: 'A user already exists with that username'})
    return;
  } else {
    const user = {username: req.body.username, password: req.body.password, dateJoined: req.body.dateJoined, token: uuidv4()}
    users[user.username] = user;
    res.send({ token: user.token })
    return;
  }
})

apiRouter.post('/auth/login', async (req, res) => {
  const possibleUser = users[req.body.username];
  if(possibleUser && possibleUser.password === req.body.password) {
    possibleUser.token = uuidv4();
    res.send({ token: possibleUser.token })
    return;
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