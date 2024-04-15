import connection from '../connection.js';


export const getUsers = function(_request, response){
    connection.query('SELECT * FROM users', (error, data) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error retrieving the list of users.');
        } else {
          response.send(data);
        }
      });
}


export const getUser = function(request, response){
  const { iduser } = request.params;
  connection.query('SELECT * FROM users WHERE idusers=?', [iduser], (error, data) => {
      if (error) {
        console.error(error);
        response.status(500).send('Error retrieving this user.');
      } else {
        response.send(data);
      }
    });
}


export const postLogInUser = function(request, response){
  const { username, password } = request.body; 
  connection.query('SELECT * FROM users WHERE username=? AND password=?', [username, password], (error, data) => {
      if (error) {
        console.error(error);
        response.status(500).send('Error retrieving this user.');
      } else {
        console.log("Data is + " + Object.keys(data).length + " length.");        
        if(Object.keys(data).length == 1){ 
          let apikey = logInUserCreateAPIkey(username);
          console.log("Cheia este " + apikey);
          response.send({"data": data[0].password, "apikey": apikey});
        } else {
          console.log("The login process failed");
          response.status(401).send('LogIn failed!');
        }
      }
    });

    const logInUserCreateAPIkey = function(username){
      //checkTheAPIkey("rlzxnjf8n8ndazrdwv77z7sajloncc"); // Asta este doar pentru incercare. Va veni in alte interogari.
      var keyapi = genAPIKey();
      connection.query('INSERT INTO apikeytable(username, apikey, validtil) VALUES(?, ?, NOW() + INTERVAL 2 HOUR)', [username, keyapi], (error) => {
        if (error) {
          console.error(error);          
        } else {
          console.info("The API Key is generated");
        }
      });
      return keyapi;
    }

    const genAPIKey = () => {
      //create a base-36 string that contains 30 chars in a-z,0-9
      return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
    };
        
}


export const checkTheAPIkey = async function(apikey){
  const username = await new Promise((resolve) => {
    connection.query('SELECT * FROM apikeytable WHERE apikey=? AND validtil > NOW()', [apikey], (err, rows) => {
      if(err) throw err;

      const lengthOfQueryArray = Object.keys(rows).length;
      if(lengthOfQueryArray == 1){
        resolve(rows[0].username);
      } else {
        resolve(false);
      }      
    })
  });
  return username;
}


export const logOut = function(request, response){
  const pontaj_api_key  = request.headers.pontaj_api_key;
  
  checkTheAPIkey(pontaj_api_key).then((username) => {
    console.log("2. Username is: " + username + "\nAnd the API Key is: " + pontaj_api_key);
    if(username != false){
      connection.query('DELETE FROM apikeytable WHERE username=?', [username], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error logging out.');
        } else {
          console.log("The API keys for this user (" + username + ") have been deleted. Log out!");
          response.status(204).send('Logged out!');
        }
      });
    } else {
      response.status(204).send('The user is already logged out!');
    }
  })
}

// END AUTHENTICATION and checking the Key


export const postUser = function(request, response){
  // the creation of a new username can be done without being necessary to be logged in.
  const { username, password, administrator } = request.body;

  connection.query('INSERT INTO users (username, password, administrator, active) VALUES (?, ?, ?, \'y\')', [username, password, administrator], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error creating new user!');
    } else {
      console.log("The new user created succesfully!");
      response.send('The new user created successfully!');
    }
  });
}


export const putUser = function(request, response){
  const { iduser } = request.params;
  const { username, password, administrator } = request.body;
  const pontaj_api_key  = request.headers.pontaj_api_key;
  
  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false && usernamefromapikey == username){ // The user can be modified only by itself; This is temporary
      connection.query('UPDATE users SET username=?, password=?, administrator=? WHERE idusers=?', [username, password, administrator, iduser], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error editing this user!');
        } else {
          console.log("The user has been edited succesfully!");
          response.send('The user has been edited successfully!');
        }
      });
    } else {
      console.log("Problems here!");
      response.status(401).send('Error');
    }
  })
  
}


export const deleteUser = function(request, response){
  const { iduser } = request.params;  
  const { username } = request.body;
  const pontaj_api_key  = request.headers.pontaj_api_key;
  
  checkTheAPIkey(pontaj_api_key).then((usernamefromapikey) => {
    if(usernamefromapikey != false && usernamefromapikey == username){ // The user can be deleted only by itself, for the moment
                                                                        // In the future, the user can be deleted by one another user which is administrator
                                                                        // I have to work on this soon
      connection.query('DELETE FROM users WHERE idusers = ?', [iduser], (error) => {
        if (error) {
          console.error(error);
          response.status(500).send('Error deleting this user!');
        } else {
          console.log("The user has been deleted");
          response.send('The user has been deleted!');
        }
      });
    } else {
      response.status(401).send('Error');
    }
  })  
  
}
