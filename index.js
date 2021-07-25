// Call dependencies
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const {listAll, addNew, deleteExisting, editExisting} = require('./queries');

// Define the main menu function
const mainMenu = async () => {
    // Prompt the user to make a menu selection
    const {selection} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: [
                'Show All',
                'Manage departments',
                'Manage roles',
                'Manage employees',
                'Exit',
            ]
        }
    ]);
    // Based on the menu selection, run a function
    switch(selection) {
        case 'Show All':
            await listAll();
            mainMenu();
            break;
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
            console.log('Bye!');
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
            message: `Manage ${category}s:`,
            choices: [
                `Display all ${category}s`,
                `Add new`,
                `Edit existing`,
                `Delete existing`,
                `Back to the main menu`,
                `Exit`
            ]
        }
    ]);
    // Use a switch to determine the category
    switch(selection) {
        case `Display all ${category}s`:
            await listAll(category);
            break;
        case `Add new`:
            await addNew(category);
            break;
        case `Edit existing`:
            await editExisting(category);
            break;
        case `Delete existing`:
            await deleteExisting(category);
            break;
        case `Back to the main menu`:
            mainMenu();
            return;
        default: 
            console.log('Bye!');
            sequelize.close();
            return;
    }
    // Reset the subMenu
    subMenu(category);
}

// Connect to the database and start the main menu
console.log('=====================================',
'\n| Welcome to the employee database! |',
'\n=====================================');
sequelize.sync({force: false}).then(async() =>{
    mainMenu();
});