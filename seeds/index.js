const mongoose=require('mongoose');
const cities=require('./cities');
const { places, descriptors }=require('./seedHelpers');
const Campground=require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample=array => array[Math.floor(Math.random()*array.length)];

const seedDB=async () => {
    await Campground.deleteMany({});
    for (let i=0; i<200; i++) {
        const random1000=Math.floor(Math.random()*1000);
        const camp=new Campground({
            author: '67fa6ae04936988dbb636adf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
            price: Math.floor(Math.random()*20)+10,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dogq01oib/image/upload/v1744783416/YelpCamp/wbrj2laixdwn5g1jxfmw.jpg',
                    filename: 'YelpCamp/wbrj2laixdwn5g1jxfmw',

                },
                {
                    url: 'https://res.cloudinary.com/dogq01oib/image/upload/v1744783416/YelpCamp/qrunpvm4wh6lqpw0igsj.jpg',
                    filename: 'YelpCamp/qrunpvm4wh6lqpw0igsj',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})