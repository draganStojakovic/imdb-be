const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const URL = 'mongodb://127.0.0.1:27017';

let genresData = fs.readFileSync('genres.json');
const genres = JSON.parse(genresData);

let moviesData = fs.readFileSync('movies.json');
const movies = JSON.parse(moviesData);

async function seed() {
  const client = await MongoClient.connect(URL, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db('imdb');
    db.dropDatabase('imdb');

    let genresCol = db.collection('genres');
    genresCol.insertMany(genres);
    let moviesCol = db.collection('movies');
    moviesCol.insertMany(movies);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

seed();
