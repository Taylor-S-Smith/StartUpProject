
const { v4: uuIdv4 } = require('uuid');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const userCollection = db.collection('user');
const chapterCollection = db.collection('chapter');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


async function getUser(username) {
  return await userCollection.findOne({username: username});
}

async function getAllUsers() {
  const cursor = userCollection.find();
  return await cursor.toArray();
}

async function createUser(username, password, dateJoined) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    dateJoined: dateJoined,
    token: uuIdv4(),
  };

  await userCollection.insertOne(user);

  return user;
}

async function getChapter(Id) {
  return await chapterCollection.findOne({Id: Id});
}

async function getAllChapters() {
  const cursor = chapterCollection.find();
  return await cursor.toArray();
}

async function createChapter(chapterTitle, chapterText, connectedFrom, connectedTo, isApproved) {
  const chapter = {Id: uuIdv4(), chapterTitle: chapterTitle, chapterText: chapterText, connectedFrom: connectedFrom, connectedTo: connectedTo, isApproved: isApproved}

  await chapterCollection.insertOne(chapter);

  return chapter;
}

async function updateChapterApproval(id, approvalStatus) {
  const chapter = await chapterCollection.findOne({Id: id});
  chapter.isApproved = approvalStatus;

  const result = await chapterCollection.updateOne({ Id: id }, { $set: chapter });

  console.log(`${result.matchedCount} records were updated`);
  return result.matchedCount;
}

async function deleteChapter(id) {
  const result = await chapterCollection.deleteOne({Id: id});

  return result.deletedCount;
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  getChapter,
  getAllChapters,
  createChapter,
  updateChapterApproval,
  deleteChapter
};