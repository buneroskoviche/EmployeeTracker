// Call dependencies
const inquirer = require('inquirer');
const {Department, Role, Employee} = require('../models');

// The listAll func will retreive all data from the data base in a certain category and log it
const listAll = async (category) => {
    // Use a switch to determine the category
    switch (category) {
        case 'department':
            // Find all data in a category
            const dptData = await Department.findAll({raw: true});
            // Console log the data values
            dptData.forEach(entry => {
                console.log(entry);
            });
            break;
        case 'role':
            const roleData = await Role.findAll({raw: true});
            roleData.forEach(entry => {
                console.log(entry);
            });
            break;
        case 'employee':
            const empData = await Employee.findAll({raw: true});
            empData.forEach(entry => {
                console.log(entry);
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
            const dptData = await Department.findAll({raw: true});
            // Prompt user for answers
            const newRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: `What do you want to call the new ${category}?`
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'How much does this position make a year? (numbers only)',
                    validate: (salary) => {
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
                    choices: dptData.map(dpt => dpt.name)
                }
            ]);
            // Change salary into a number
            newRole.salary = Number(newRole.salary)
            // Find the department with the same name
            const chosenDpt = dptData.find(dpt => dpt.name === newRole.department_id);
            // Change the department_id param to the number value instead
            newRole.department_id = chosenDpt.id;
            // Add the new role to the database
            await Role.create(newRole);
            break;

        case 'employee':
            // Get role data for later use
            const roleData = await Role.findAll({raw: true});
            const empData = await Employee.findAll({raw: true});
            // Prompt questions
            const newEmployee = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: `What is the employee's first name?`
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: `What is the employee's last name?`
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What role does this employee fill?',
                    choices: roleData.map(role => role.title)
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who manages this employee?',
                    choices: empData.map(employee => `${employee.first_name} ${employee.last_name}`)
                 }
            ]);
            // Find the role with the same title
            const chosenRole = roleData.find(role => role.title === newEmployee.role_id);
            // Change the role_id param to the id number instead
            newEmployee.role_id = chosenRole.id;
            await Employee.create(newEmployee);
            break;
    }
};


module.exports = {listAll, addNew};