
const { v4: uuIdv4 } = require('uuid');
const config = require('./dbConfig.json');
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const userCollection = db.collection('User');
const chapterCollection = db.collection('chapter');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


// USERS

async function getUser(username) {
  return await userCollection.findOne({username: username});
}

async function getUserById(userId) {
  return await userCollection.findOne({_id: userId});
}

async function getAllUsers() {
  const cursor = userCollection.find();
  return await cursor.toArray();
}

async function createUser(username, passwordHash, salt, dateJoined) {

  const user = {
    username: username,
    passwordHash: passwordHash,
    salt: salt,
    dateJoined: dateJoined,
    admin: false,
  };

  await userCollection.insertOne(user);

  return user;
}

// CHAPTERS

async function getChapter(Id) {
  return await chapterCollection.findOne({_id: Id});
}

async function getAllChapters() {
  const cursor = chapterCollection.find();
  return await cursor.toArray();
}

async function createChapter(title, choiceText, text, connectedFrom, connectedTo, creator, isApproved) {
  const chapter = {_id: uuIdv4(), Title: title, ChoiceText: choiceText, Text: text, connectedFrom: connectedFrom, connectedTo: connectedTo, Creator: creator, isApproved: isApproved}

  await chapterCollection.insertOne(chapter);

  return chapter;
}

async function updateChapterApproval(id, approvalStatus) {
  const chapter = await chapterCollection.findOne({_id: id});
  chapter.isApproved = approvalStatus;

  if (approvalStatus === true) {
    chapter.connectedFrom.forEach((connection) => addToConnection(connection, chapter._id));
  }

  const result = await chapterCollection.updateOne({ _id: id }, { $set: chapter });

  console.log(`${result.matchedCount} records were updated`);
  return result.matchedCount;
}

async function addToConnection(id, connection) {
  const chapter = await chapterCollection.findOne({_id: id});
  chapter.connectedTo.push(connection);

  const result = await chapterCollection.updateOne({ _id: id }, { $set: chapter });

  console.log(`${result.matchedCount} records were updated`);
  return result.matchedCount;
}

async function deleteChapter(id) {
  const result = await chapterCollection.deleteOne({_id: id});

  return result.deletedCount;
}

module.exports = {
  getUser,
  getUserById,
  getAllUsers,
  createUser,
  getChapter,
  getAllChapters,
  createChapter,
  updateChapterApproval,
  deleteChapter,
  client
};