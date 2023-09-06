import mongoose from "mongoose";

async function connect() {

    // const mongodbURL = "mongodb+srv://fightthebite:@cluster0.hi9lwsl.mongodb.net/?retryWrites=true&w=majority";
    const mongodbURL = "mongodb+srv://test:test123@cluster0.bkoov80.mongodb.net/?retryWrites=true&w=majority";
    // const mongodbURL =
    //   "mongodb+srv://fightthebite:927516Aabde@cluster0.fq39ng3.mongodb.net/?retryWrites=true&w=majority";

    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(mongodbURL);
    console.log("Database Connected");
    return db;
}

export default connect;