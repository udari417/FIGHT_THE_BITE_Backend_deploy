import mongoose from "mongoose";

async function connect() {
    const mongodbURL = "mongodb+srv://test:test123@cluster0.bkoov80.mongodb.net/?retryWrites=true&w=majority";

    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(mongodbURL);
    console.log("Database Connected");
    return db;
}

export default connect;