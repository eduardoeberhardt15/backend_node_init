import mongoose, {Schema, Document} from "mongoose";

    mongoose.connect('mongodb://localhost:27017/isbrasil',{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }); 
    mongoose.Promise = global.Promise;

export {mongoose, Schema, Document};