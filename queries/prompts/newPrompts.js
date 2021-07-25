const inquirer = require('inquirer');
const {Department, Role, Employee} = require('../../models');
const {nameCombine, retainExisting} = require('../../config/helpers');

module.exports = {
    // departmentPrompt will define a Department and return it
    departmentPrompt: async () => {
        const department = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: `What do you want to call the department?`
            }
        ]);
        return department;
    },
    // rolePrompt will define a Role and return it
    rolePrompt: async (objToEdit) => {
        // Get all department data for later use
        const departments = await Department.findAll({raw: true});
        const role = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: `What do you want to call the role?`,
                default: retainExisting(objToEdit, 'title')
            },
            {
                type: 'input',
                name: 'salary',
                message: 'How much does this position make a year? (numbers only)',
                default: retainExisting(objToEdit, 'salary'),
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
                choices: departments.map(dpt => `${dpt.id}: ${dpt.name}`)
            }
        ]);
        // Change salary into a number
        role.salary = Number(role.salary)
        // Extract the id number from the answer
        role.department_id = Number(role.department_id.split(":")[0]);

        return role;
    },
    // employeePrompt will define an Employee and return it
    employeePrompt: async (objToEdit) => {
        // Get data for later use
        const roles = await Role.findAll({raw: true});
        const employees = await Employee.findAll({raw: true});
        const employeesMap = employees.map(employee => nameCombine(employee));
        // Prompt questions
        const employee = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: `What is the employee's first name?`,
                default: retainExisting(objToEdit, 'first_name')
            },
            {
                type: 'input',
                name: 'last_name',
                message: `What is the employee's last name?`,
                default: retainExisting(objToEdit, 'last_name')
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What role does this employee fill?',
                choices: roles.map(role => `${role.id}: ${role.title}`)
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who manages this employee?',
                choices: [...employeesMap, "None"]
             }
        ]);
        
        // Extract the id number from the answer
        employee.role_id = Number(employee.role_id.split(":")[0]);
        // If no manager was selected, change manager param to null
        if(employee.manager === "None") {
            employee.manager = null;
        }

        return employee;
    }
}