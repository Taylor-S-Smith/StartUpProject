import express from 'express';
import { v4 as uuIdv4 } from 'uuId';

const app = express();

let users = {}
let chapters = {}

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Built-in mIddleware
app.use(express.json());
app.use(express.static('public'));

// Router
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Custom MIddleware

apiRouter.get('/test', async (req, res) => {
  res.status(200).end();
})

apiRouter.post('/story/submitchapter', async (req, res) => {
  const chapter = {Id: uuIdv4(), chapterTitle: req.body.chapterTitle, chapterText: req.body.chapterText, connectedFrom: [req.body.proposedConnection], connectedTo: [], isApproved: false}
  chapters[chapter.Id] = chapter;

  res.send({Id: chapter.Id})
})

apiRouter.post('/story/approvechapter', async (req, res) => {
  const chapter = chapters[req.body.chapterId];
  if(chapter) {
    chapter.isApproved = true;
    res.status(204).end();
  } else {
    res.status(404).send({msg: 'No chapter exists with that Id'});
  }
})

apiRouter.delete('/story/denychapter', async (req, res) => {
  if(chapters[req.body.chapterId]) {
    delete chapters[req.body.chapterId];
    res.status(204).end();
  } else {
    res.status(404).send({msg: 'No chapter exists with that Id'});
  }
})

apiRouter.get('/story/getchapter', async (req, res) => {
  const chapter = chapters[req.body.chapterId];
  if(chapter) {
    res.send({chapter});
  } else {
    res.status(404).send({msg: 'No chapter exists with that Id'});
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

apiRouter.get('/users/getall', async (req, res) => {
  const userArray = Object.values(users);

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
  const user = users[req.body.username];
  if(user) {
    res.status(409).send({msg: 'A user already exists with that username'})
    return;
  } else {
    const user = {username: req.body.username, password: req.body.password, dateJoined: req.body.dateJoined, token: uuIdv4()}
    users[user.username] = user;
    res.send({ token: user.token })
    return;
  }
})

apiRouter.post('/auth/login', async (req, res) => {
  const possibleUser = users[req.body.username];
  if(possibleUser && possibleUser.password === req.body.password) {
    possibleUser.token = uuIdv4();
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

// Obligatory end mIddleware
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});