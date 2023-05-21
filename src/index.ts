import app from './app';
import 'dotenv/config';
import connectToDb from './db/connection';

connectToDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});
