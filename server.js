import express from 'express';
//import mysql from 'mysql';
import bodyParser from 'body-parser';

import projectRouter from './routes/projects.js';
import userRouter from './routes/users.js';
import hoursRouter from './routes/hours.js';

const app = express();
const port = 3100;
 
/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fane123',
    database: 'pontaj'
  });
   
  connection.connect((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Connected to the database');      
    }
  });
  */

  const rootLink4APIs = "/";

  app.use(bodyParser.json());

  app.use(rootLink4APIs, projectRouter);
  app.use(rootLink4APIs, userRouter);
  app.use(rootLink4APIs, hoursRouter);


	/*
  app.get('/projects', (_request, response) => {
    connection.query('SELECT * FROM projects', (error, data) => {
      if (error) {
        console.error(error);
        response.status(500).send('Error retrieving projects');
      } else {
        response.send(data);
      }
    });
  });
  */


  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

