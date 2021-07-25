const { nameCombine } = require('../config/helpers');
const {Department, Role, Employee} = require('../models');
const {departmentPrompt, rolePrompt, employeePrompt} = require('./prompts');

module.exports = {
    // The addNew func will insert a new entry into a certain category
    addNew: async (category) => {
        // Use a switch to determine the category
        switch (category) {
            case 'department':
                // Prompt the user to give a department name
                const newDpt = await departmentPrompt();
                // Create the new department record
                await Department.create(newDpt);
                console.log(`\n${newDpt.name} department created!\n `);
                break;

            case 'role':
                // Prompt user for answers
                const newRole = await rolePrompt();
                // Add the new role to the database
                await Role.create(newRole);
                console.log(`\n${newRole.title} position created!\n `)
                break;

            case 'employee':
                const newEmployee = await employeePrompt();
                await Employee.create(newEmployee);
                console.log(`\n${nameCombine(newEmployee)} added to the database!\n `)
                break;
        }
        return;
    }
}