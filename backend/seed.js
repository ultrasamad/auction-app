/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs').promises;
const mongoose = require('mongoose');

const config = require('./src/config');

const { seedDir } = config.seeder;

mongoose.connect(config.db.connectionString, config.db.connectionOptions);

mongoose.connection.on('connected', async () => {
  // this list will be populated with the seed files.
  let files = [];

  try {
    // read the seed directory and load the file list
    files = await fs.readdir(require('path').join(__dirname, seedDir));
  } catch (err) {
    console.error(err);
  }

  // for each file inside the file list
  for (const file of files) {
    // requiring the file from the seed directory
    const seed = require(`./${seedDir}/${file}`);

    // extracting the list of data to be seeded from the seed file
    const { data } = seed;

    // creating an instance of the service used for seeding this model
    const service = new seed.Service(seed.Model);

    console.log(`Purging ${file} existing collection`);
    await service[seed.purgeMethod]();

    console.log(`seeding: ${file}`);
    // for each entry inside the list of data
    for (const [i, item]  of data.entries()) {
      console.log(`Seeding Item #${i+1}`);
      try {
        // calling the create method from inside the service
        await service[seed.createMethod](item);
      } catch (err) {
        console.error(err);
      }
    }
  }

  mongoose.connection.close(() => {
    console.log('seeding complete');
  });
});
