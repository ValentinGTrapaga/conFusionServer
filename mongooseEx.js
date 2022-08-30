const mongoose = require('mongoose')

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

connect.then((db) => {
  console.log('Connected correctly to the server')

  const newDish = Dishes({
    name: 'Uthappizza',
    description: 'test'
  })

  newDish
    .save()
    .then((dish) => {
      console.log(dish)
      return Dishes.findByIdAndUpdate(
        dish._id,
        { $set: { description: 'Updated test' } },
        {
          new: true
        }
      ).exec()
    })
    .then((dish) => {
      console.log(dish)
      dish.comments.push({
        rating: 5,
        comment: 'Wow this was such a great test',
        author: 'Valentin GT'
      })
      return dish.save()
    })
    .then((dish) => {
      console.log('this is a test ', dish)
      return Dishes.deleteMany({})
    })
    .then(() => {
      return mongoose.connection.close()
    })
    .catch((err) => {
      console.log(err)
      return mongoose.connection.close()
    })
})
