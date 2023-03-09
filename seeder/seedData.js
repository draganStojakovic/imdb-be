const MongoClient = require('mongodb').MongoClient;

(async () => {
  const url = 'mongodb://127.0.0.1:27017/imdb';
  const client = new MongoClient(url, {});
  try {
    await client.connect();
    const collection = client.db().collection('genres');
    const genres = [
      {
        name: 'Action',
      },
      {
        name: 'Documentory',
      },
      {
        name: 'Comedy',
      },
      {
        name: 'Fantacy',
      },
      {
        name: 'Superhero',
      },
      {
        name: 'Drama',
      },
      {
        name: 'Romance',
      },
      {
        name: 'Sci-Fi',
      },
    ];
    await collection.deleteMany();
    await collection.insertMany(genres);
    console.log(`${genres.length} genres seeded`);
    process.exit(0);
  } catch (error) {
    console.log(error.stack);
    process.exit(1);
  }
})();
