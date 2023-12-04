import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { getInfo, addInfo, updateInfo, deleteInfo } from './controllers/controller.js';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

ViteExpress.config({printViteDevServerHost: true});

// Routes:
app.get('/api/info', getInfo);
app.post('/api/info', addInfo);
app.put('/api/info/:id', updateInfo);
app.delete('/api/info/:id', deleteInfo);

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`))