import connection from '../connection.js';
import { checkTheAPIkey } from './users.js';


export const getProjects = function(_request, response){
    connection.query('SELECT * FROM projects', (error, data) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error retrieving projects');
        } else {
          response.send(data);
        }
      });
}


export const getProjectsByUser = function(request, response){
  const { iduser } = request.params; 
  connection.query('SELECT * FROM projects WHERE idusers=?', [iduser], (error, data) => {
      if (error) {
        console.error(error);
        response.status(500).send('Error retrieving this project');
      } else {
        response.send(data);
      }
    });
}


export const getProject = function(request, response){
    const { idproject } = request.params; 
    connection.query('SELECT * FROM projects WHERE idprojects=?', [idproject], (error, data) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error retrieving this project');
        } else {
          response.send(data);
        }
      });
}


export const postProject = function(request, response){  
  const { projectname, clientname, details, invoice_address, email, contact_person, cap } = request.body;
  const pontaj_api_key  = request.headers.pontaj_api_key;
  
  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false){ // The user can be modified only by itself; This is temporary
      //because, the user can add a new project only for himself      
      connection.query('INSERT INTO projects (projectname, clientname, details, invoice_address, email, contact_person, cap, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [projectname, clientname, details, invoice_address, email, contact_person, cap, usernamefromapikey], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error creating new project!');
        } else {
          console.log("The new project created succesfully!");
          response.send('The new project created successfully!');
        }
      });

    } else {
      console.log("Problems here! Cannot create a new project.");
      response.status(401).send('Error');
    }
  })
}


export const putProject = function(request, response){
  const { idproject } = request.params;
  const { projectname, clientname, details, invoice_address, email, contact_person, cap } = request.body;
  const pontaj_api_key  = request.headers.pontaj_api_key;

  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false){ // The user can modify only his own project; For the administrator I will create a new API for the administrator to edit a project
      //because, the user can edit only his own project
      connection.query('UPDATE projects SET projectname=?, clientname=?, details=?, invoice_address=?, email=?, contact_person=?, cap=? WHERE idprojects=? AND username=?', [projectname, clientname, details, invoice_address, email, contact_person, cap, idproject, usernamefromapikey], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error editing this project!');
        } else {
          console.log("The project has been edited succesfully!");
          response.send('The project has been edited successfully!');
        }
      });

    } else {
      console.log("Problems here! We cannot edit the project " + idproject + ".");
      response.status(401).send('Error! We cannot edit this project.');
    }
  })

}


export const deleteProject = function(request, response){
  const { idproject } = request.params;
  const pontaj_api_key  = request.headers.pontaj_api_key;

  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false){ // The user can delete only his own project
      //because, the user can edit only his own project
      connection.query('DELETE FROM projects WHERE idprojects = ? AND username=?', [idproject, usernamefromapikey], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error deleting this project!');
        } else {
          console.log("The project has been deleted");
          response.send('The project has been deleted!');
        }
      });

    } else {
      console.log("Problems here! We cannot delete the project " + idproject + ".");
      response.status(401).send('Error! We cannot delete this project.');
    }
  })
  
  
}



export const getConnected = function(_req, res){
    res.json([{"mesaj": "Hiii, buey, tata, mai!"}]);
}