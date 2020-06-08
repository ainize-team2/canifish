import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const server = new http.Server(app);

// Serve static files from the React app
app.use(express.static(path.join('client/build')));

app.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

const port = process.env.PORT || 80;
server.listen(port, () => console.log(`Crowdy app listening on port ${port}!`));
