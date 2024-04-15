import express from 'express';
//import mysql from 'mysql';
import bodyParser from 'body-parser';

import projectRouter from './routes/projects.js';
import userRouter from './routes/users.js';
import hoursRouter from './routes/hours.js';

const app = express();
const port = 3100;
 


  const rootLink4APIs = "/";

  app.use(bodyParser.json());

  app.use(rootLink4APIs, projectRouter);
  app.use(rootLink4APIs, userRouter);
  app.use(rootLink4APIs, hoursRouter);


  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

