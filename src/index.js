import express from 'express';
import exceptionHandler from 'express-exception-handler';
import register from './routes/register.js';
import login from './routes/login.js';
import settings from './settings.js';

exceptionHandler.handle({ nextOnce: false });
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/error', async (req, res) => {
  throw new Error('test');
  res.send('?');
})

app.post('/register', register);
app.post('/login', login);

app.listen(settings.port, () => console.log(`App listening on port ${settings.port}`));