const mongodb = require('mongodb')
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

mongodb.MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected correctly')
    const db = client.db(dbname)

    dboper
      .insertDocument(
        db,
        { name: 'Vadonut', description: 'Testing the operations' },
        'dishes'
      )
      .then((result) => {
        console.log('Insert document: \n', result.ops)
        return dboper.findDocuments(db, 'dishes')
      })
      .then((docs) => {
        console.log('Found documents:\n', docs)
        return dboper.updateDocument(
          db,
          { name: 'Vadonut' },
          { description: 'Updating test' },
          'dishes'
        )
      })
      .then((result) => {
        console.log('Updated document:\n', result.result)
        return dboper.findDocuments(db, 'dishes')
      })
      .then((docs) => {
        console.log('Found documents:\n', docs)
        return db.dropCollection('dishes')
      })
      .then((result) => {
        console.log('Dropped collection: ', result)
        client.close()
      })
  })
  .catch((err) => {
    console.log(err)
  })
