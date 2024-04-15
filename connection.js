import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: '****',
    password: '******',
    database: 'pontaj'
});

connection.connect((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Connected to the database');      
    }
});

export default connection
