import mongoose from "mongoose";

type ConnectionObject = {
 isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Alredy connected to database!!")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '', {});

        connection.isConnected = db.connections[0].readyState;

        console.log("DB connnected Successfully!!")

        
    } catch (error) {
        console.log(error)
        process.exit(1);
    }

}

export default dbConnect