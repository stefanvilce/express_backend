import connection from '../connection.js';
import { checkTheAPIkey } from './users.js';


export const getAllHours = function(_request, response){
    connection.query('SELECT * FROM hours', (error, data) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error retrieving hours');
        } else {
          response.send(data);
        }
      });
}


export const getHoursByUser = function(request, response){
  const { iduser } = request.params; 
  connection.query('SELECT * FROM hours WHERE iduser=?', [iduser], (error, data) => {
      if (error) {
        console.error(error);
        response.status(500).send('Error retrieving hours for this user');
      } else {
        response.send(data);
      }
    });
}


export const getHoursForProject = function(request, response){
  const { idproject } = request.params; 
  connection.query('SELECT * FROM hours WHERE idproject=?', [idproject], (error, data) => {
      if (error) {
        console.error(error);
        response.status(500).send('Error retrieving hours for this project');
      } else {
        response.send(data);
      }
    });
}


// De aici mai am de facut interogari GET pentru a scoate orele pe zile, pe saptamana, pe luna; si pe proiect sau la gramada pentru acelasi utilizator



export const postHours = function(request, response){  
  const { idproject, projectname, short_description, date, no_hours, iduser, username } = request.body;
  const pontaj_api_key  = request.headers.pontaj_api_key;
  
  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false && usernamefromapikey == username){ // The user can add hours only for himself
      connection.query('INSERT INTO hours (idproject, projectname, short_description, date, no_hours, iduser, username) VALUES (?, ?, ?, ?, ?, ?, ?)', [idproject, projectname, short_description, date, no_hours, iduser, username], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error adding new hours!');
        } else {
          console.log("The hours were added succesfully for " + username + " on the project " + projectname + "!");
          response.send('The hours were added succesfully on ' + projectname);
        }
      });

    } else {
      console.log("Problems here! Cannot add new hours.");
      response.status(401).send('Error');
    }
  })
}




export const putHours = function(request, response){ 
  const { idhour } = request.params; 
  const { idproject, projectname, short_description, date, no_hours, iduser, username } = request.body;
  const pontaj_api_key  = request.headers.pontaj_api_key;
  
  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false && usernamefromapikey == username){ // The user can add hours only for himself
      connection.query('UPDATE hours SET idproject=?, projectname=?, short_description=?, date=?, no_hours=?, iduser=?, username=? WHERE idhours=?', [idproject, projectname, short_description, date, no_hours, iduser, username, idhour], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error editing hours!');
        } else {
          console.log("The hours have been succesfully modified for " + username + " on the project " + projectname + "!");
          response.send('The hours have been succesfully modified on ' + projectname);
        }
      });
    } else {
      console.log("Problems here! Cannot edit the hours on the project.");
      response.status(401).send('Error');
    }
  })
}



export const deleteHours = function(request, response){
  const { idhour } = request.params;
  const pontaj_api_key  = request.headers.pontaj_api_key;

  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false){ // The user can delete only his own project
      //because, the user can edit only his own project
      connection.query('DELETE FROM hours WHERE idhours = ? AND username=?', [idhour, usernamefromapikey], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error deleting this row!');
        } else {
          console.log("The row has been deleted");
          response.send('The row has been deleted!');
        }
      });

    } else {
      console.log("Problems here! We cannot delete the row with id " + idhour + ".");
      response.status(401).send('Error! We cannot delete this row.');
    }
  })
}


//TODO: Mai trebuie facute APIurile pentru editarea si stergerea orelor de catre administrator. (ca poate trebuie sa corecteze uneori)