require('dotenv').config();
const mongoose = require('mongoose');
const Bike = require('../models/Bike')

// Place the array you want to seed
const bikes = [
  {  
    name: " ",
    image:" ",
    url: " ",
    description: " ",
    terrain: " ",
    biketype: " ",
    material: " ",
    price: " "
  },
]


mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Bike.create(bikes)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

// Run npm run seed 