// Call dependencies
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const {Department, Role, Employee} = require

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
            // The subMenu function will prompt the user again for a more specific answer
            subMenu('department');
            break;
        case 'Manage roles':
            subMenu('role');
            break;
        case 'Manage employees':
            subMenu('employee');
            break;
        case 'Exit':
            console.log('Bye');
            sequelize.close();
            break;
    }
}
// Define the submenu function
const subMenu = async (string) => {
    // Prompt the user for another answer
    const {selection} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: `What would to do to the ${string}s?`,
            choices: [
                `List all ${string}s`,
                `Add a new ${string}`,
                `Edit an existing ${string}`,
                `Delete a ${string}`,
                `Go Back`
            ]
        }
    ]);
    // Run a function based on the selection
    switch(selection) {
        case `List all ${string}s`:
            listAll(string);
            break;
        case `Add a new ${string}`:
            addNew(string);
            break;
        case `Edit an existing ${string}`:
            editExisting(string);
            break;
        case `Delete a ${string}`:
            deleteExisting(string);
        case `Go Back`:
            mainMenu();
            return;
    }
}

// The listAll func will retreive all data from the data base in a certain category
const listAll = async (string) => {
    switch (string) {
        case 'department':
            const dptData = await Department
            break;
        case 'role':
            break;
        case 'employee':
            break;
    }
}

// Connect to the database and start the main menu
console.log('Welcome to the employee database!');
sequelize.sync({force: false}).then(() =>{
    mainMenu();
});