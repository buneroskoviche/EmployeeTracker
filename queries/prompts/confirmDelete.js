const inquirer = require('inquirer');
const {nameCombine} = require('../../config/helpers');

module.exports = {
    confirmDelete: async (object) => {
        let toDelete; 
        // Determine what type of object was inserted into the function with an if statement
        if(object.first_name) {
            // assign the toDelete variable to whatever the name of the object is
            toDelete = nameCombine(object);
        } else if(object.title) {
            toDelete = object.title;
        } else {
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
            console.log(`Let's go back.`);
        }
        return confirm;
    }
}