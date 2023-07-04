const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
           // // useCreateIndex:true,
           // // useFindAndModify:false,
           
           
       })
       console.log(`MongoDb connect to ${connecting.connection.host}`);
    } catch (err) {
        console.log(err);
    }
   
 
}

module.exports = connectDB