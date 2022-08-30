const mongodb = require('mongodb')
const assert = require('assert')
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

mongodb.MongoClient.connect(
  url,
  { useUnifiedTopology: true },
  (err, client) => {
    assert.equal(err, null)
    console.log('Connected correctly')
    const db = client.db(dbname)
    /* const collection = db.collection('dishes')
  collection.insertOne(
    { name: 'test', description: 'This is another test' },
    (err, result) => {
      assert.equal(err, null)
      console.log(result.ops)
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null)
        console.log('Found: \n')
        console.log(docs)
        db.dropCollection('dishes', (err, result) => {
          assert.equal(err, null)
          client.close()
        })
      })
    }
  ) */

    dboper.insertDocument(
      db,
      { name: 'Vadonut', description: 'Testing the operations' },
      'dishes',
      (result) => {
        console.log('Insert document: \n', result.ops)
        dboper.findDocuments(db, 'dishes', (docs) => {
          console.log('Found documents:\n', docs)
          dboper.updateDocument(
            db,
            { name: 'Vadonut' },
            { description: 'Updating test' },
            'dishes',
            (result) => {
              console.log('Updated document:\n', result.result)
              dboper.findDocuments(db, 'dishes', (docs) => {
                console.log('Found documents:\n', docs)
                db.dropCollection('dishes', (result) => {
                  console.log('Dropped collection: ', result)
                  client.close()
                })
              })
            }
          )
        })
      }
    )
  }
)
