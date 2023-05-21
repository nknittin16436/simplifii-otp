import * as  mongoose from 'mongoose';
import 'dotenv/config';

export default async function connectToDb() {
    try {
        const data = await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log(`Connected to database succesfully with ${data.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}
