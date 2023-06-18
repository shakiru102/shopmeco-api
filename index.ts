import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv'
import cors, { CorsOptions } from 'cors';
import AuthRoutes from './routes/auth'
import ExtrasRoutes from './routes/extras'

env.config()
const options: CorsOptions = {
    origin: "*",
    credentials: true
}

mongoose.connect(process.env.MONGODB_URI as string)
.then(() => console.log('database connection established'))
.catch(err => console.log('database connection error: '+ err))

const app = express();
const Port = process.env.PORT || 4000

app.use(cors(options))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api', ExtrasRoutes);

app.listen(Port, () => console.log('listening on port: ' + Port));

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('server is running')
})
