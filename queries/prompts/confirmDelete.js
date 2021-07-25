const inquirer = require('inquirer');
const {nameCombine} = require('../../config/helpers');

module.exports = {
    confirmDelete: async (object) => {
        let toDelete; 
        // Determine what type of object was inserted into the function with an if statement
        if(object.first_name) {
            // if it is an Employee, combine the first and last name
            toDelete = nameCombine(object);
        } else if(object.title) {
            // If it is a Role, use the title
            toDelete = object.title;
        } else {
            // If is is a Department, use the name
            toDelete = object.name;
        }
        const {confirm} = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure you want to delete ${toDelete}?`
            }
        ]);
        if(!confirm) {
            console.log(`\nLet's go back.\n `);
        }
        return confirm;
    }
}