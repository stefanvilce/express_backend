import connection from '../connection.js';


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

  connection.query('INSERT INTO projects (projectname, clientname, details, invoice_address, email, contact_person, cap) VALUES (?, ?, ?, ?, ?, ?, ?)', [projectname, clientname, details, invoice_address, email, contact_person, cap], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error creating new project!');
    } else {
      console.log("The new project created succesfully!");
      response.send('The new project created successfully!');
    }
  });

}


export const putProject = function(request, response){
  const { idproject } = request.params;
  const { projectname, clientname, details, invoice_address, email, contact_person, cap } = request.body;

  connection.query('UPDATE projects SET projectname=?, clientname=?, details=?, invoice_address=?, email=?, contact_person=?, cap=? WHERE idprojects=?', [projectname, clientname, details, invoice_address, email, contact_person, cap, idproject], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error editing this project!');
    } else {
      console.log("The project has been edited succesfully!");
      response.send('The project has been edited successfully!');
    }
  });
}


export const deleteProject = function(request, response){
  const { idproject } = request.params;
  
  connection.query('DELETE FROM projects WHERE idprojects = ?', [idproject], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error deleting this project!');
    } else {
      console.log("The project has been deleted");
      response.send('The project has been deleted!');
    }
  });
}



export const getConnected = function(_req, res){
    res.json([{"mesaj": "Hiii, buey, tata, mai!"}]);
}