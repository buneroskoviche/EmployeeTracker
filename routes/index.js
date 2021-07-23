// Call dependencies
const inquirer = require('inquirer');
const {Department, Role, Employee} = require('../models');

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
            break;
        case 'role':
            const roleData = await Role.findAll();
            roleData.forEach(entry => {
                console.log(entry.dataValues);
            });
            break;
        case 'employee':
            const empData = await Employee.findAll();
            empData.forEach(entry => {
                console.log(entry.dataValues);
            });
            break;
    }
};

// The addNew func will insert a new entry into a certain category
const addNew = async (category) => {
    // Use a switch to determine the category
    switch (category) {
        case 'department':
            // Prompt the user to give a department name
            const newDpt = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: `What do you want to call the new ${category}?`
                }
            ]);
            // Create the new department record
            await Department.create(newDpt);
            console.log(newDpt);
            break;
        case 'role':
            // Get department data for later use
            const dptData = await Department.findAll();
            // Prompt user for answers
            const newRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: `What do you want to call the new ${category}?`
                },
                {
                    tyep: 'confirm',
                    name: 'is_manager',
                    message: 'Is this a management position? (y/n)',
                    validate: (confirm) => {
                        if (confirm === 'y' || confirm === 'n') {
                            return true;
                        } else {
                            return `Please enter y or n`;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'How much does this position make a year? (numbers only)',
                    validate: async (salary) => {
                        if(isNaN(salary)) {
                            return 'Please enter a number';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'In which department does this role work?',
                    choices: dptData.map(dpt => dpt.dataValues.name)
                }
            ]);
            // Change is_manager into a boolean
            if(newRole.is_manager === 'y') {
                newRole.is_manager = true;
            } else {
                newRole.is_manager = false;
            }
            // Change salary into a number
            newRole.salary = Number(newRole.salary)
            // Find the department with the same name
            dptData.forEach(dpt => {
                if(dpt.dataValues.name = newRole.department_id) {
                    // Change the department_id to the id instead of name
                    newRole.department_id = dpt.dataValues.id;
                }
            });
            console.log(newRole);
            break;
        case 'employee':
            const empData = await Employee.findAll();
            break;
    }
};


module.exports = {listAll, addNew};