const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities')
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');
const seedImg = require('img')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log('DATABASE CONNECTED')
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
     const random1000 = Math.floor(Math.random() * 1000);
     const price = Math.floor(Math.random() * 20) + 10;
     const camp = new Campground({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image: await seedImg(),
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur debitis in omnis, vero eligendi velit eveniet soluta voluptas eius quasi. Facere, cupiditate at. Dolorem ea esse aut ducimus, inventore sit?',
        price
     })
     await camp.save()   
    }
}

seedDB().then(()=> {
    mongoose.connection.close()
})