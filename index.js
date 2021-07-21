// Call dependencies
const mysql = require('mysql');
const config = require('./config');
const inquirer = require('inquirer');
const subMenus = require('./menus/sub')

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: config.username,
    password: config.password,
    database: 'employees_db',
});

// Connect to the db on startup
connection.connect(async (err) => {
    if (err) throw err;
    console.log('Welcome to the employee database!');
    // and load the main menu
    mainMenu();
});

// Define the main menu function
const mainMenu = async () => {
    // Prompt the user to make a menu selection
    const {selection} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: [
                'Manage departments',
                'Manage roles',
                'Manage employees',
                'Exit',
            ]
        }
    ]);
    // Based on the menu selection, run a function
    switch(selection) {
        case 'Manage departments':
            dptManager();
            break;
        case 'Manage roles':
            roleManager();
            break;
        case 'Manage employees':
            empManager();
            break;
        case 'Exit':
            console.log('Bye');
            connection.end();
            break;
    }
}

const dptManager