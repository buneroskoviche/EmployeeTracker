// Call dependencies
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const {Department, Role, Employee} = require('./models');

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
const subMenu = async (category) => {
    // Prompt the user for another answer
    const {selection} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: `In ${category}s:`,
            choices: [
                `List all`,
                `Add new`,
                `Edit existing`,
                `Delete existing`,
                `Go Back`,
                `Exit`
            ]
        }
    ]);
    // Use a switch to determine the category
    switch(selection) {
        case `List all`:
            listAll(category);
            break;
        case `Add new`:
            addNew(category);
            break;
        case `Edit existing`:
            editExisting(category);
            break;
        case `Delete existing`:
            deleteExisting(category);
        case `Go Back`:
            mainMenu();
            return;
        default: 
            console.log('Bye');
            sequelize.close();
            return;
    }
}

// The listAll func will retreive all data from the data base in a certain category and log it
const listAll = async (category) => {
    // Use a switch to determine the category
    switch (category) {
        case 'department':
            // Find all data in a category
            const dptData = await Department.findAll();
            // Console log the data values
            dptData.forEach(entry => {
                console.log(entry.dataValues);
            });
            // Go back to the sub menu
            subMenu(category);
            break;
        case 'role':
            const roleData = await Role.findAll();
            roleData.forEach(entry => {
                console.log(entry.dataValues);
            });
            subMenu(category);
            break;
        case 'employee':
            const empData = await Employee.findAll();
            empData.forEach(entry => {
                console.log(entry.dataValues);
            });
            subMenu(category);
            break;
    }
}

// Connect to the database and start the main menu
console.log('Welcome to the employee database!');
sequelize.sync({force: false}).then(() =>{
    mainMenu();
});