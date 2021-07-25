const {Department, Role, Employee} = require('../models');
const Table = require('cli-table');
const { nameCombine } = require('../config/helpers');

module.exports = {
    // The listAll func will retreive all data from the data base in a certain category and log it
    listAll: async (category) => {
        // Use a switch to determine the category
        switch (category) {
            case 'department':
                // Will display detailed department information
                try {
                    // Find all data in a category
                    const dptData = await Department.findAll();
                    // Remove extra fluff from the instances
                    const departments = dptData.map(entry => entry.get({plain: true}));
                    // Create a table class
                    const table = new Table({
                        head: ['ID', 'Name']
                    });
                    // Insert data into the new table
                    departments.forEach(dpt => table.push([dpt.id, dpt.name]));
                    console.log(table.toString());
                } catch (e) {
                    console.log(e);
                }    
                break;
            case 'role':
                // Will display detailed role informaiton
                try {
                    const roleData = await Role.findAll({
                        include: [{model: Department}]
                    });
                    const roles = roleData.map(entry => entry.get({plain: true}));
                    const table = new Table({
                        head: ['ID', 'Title', 'Salary', 'Department']
                    });
                    roles.forEach(role => table.push([
                        role.id, 
                        role.title, 
                        '$' + role.salary, 
                        role.department.name
                    ]));
                    console.log(table.toString());
                } catch (e) {
                    console.log(e);
                } 
                break;
            case 'employee':
                // Will display detailed employee information
                try {
                    const empData = await Employee.findAll({
                        include: [{model: Role}]
                    });
                    const employees = empData.map(entry => entry.get({plain: true}));
                    const table = new Table({
                        head: ['ID', 'First Name', 'Last Name', 'Role', 'Manager']
                    });
                    employees.forEach(employee => table.push([
                        employee.id, 
                        employee.first_name,
                        employee.last_name,
                        employee.role.title || 'Unassigned',
                        employee.manager || 'None'
                    ]));
                    console.log(table.toString());
                } catch (e) {
                    console.log(e);
                } 
                break;
            default:
                // Default will display all information
                try {
                    const roughData = await Employee.findAll( {
                        include: [{model: Role, include: [{model: Department}]}]
                    });
                    const ezData = roughData.map(entry => entry.get({plain: true}));
                    const table = new Table({
                        head: ['Name', 'Role', 'Department', 'Salary', 'Manager']
                    });
                    ezData.forEach(entry => table.push([
                        nameCombine(entry),
                        entry.role.title || 'Unassigned',
                        entry.role.department.name,
                        '$' + entry.role.salary,
                        entry.manager || 'None',
                    ]));
                    console.log(table.toString());
                } catch (e) {
                    console.log(e);
                } 
                break;
                
        }
        return;
    }
}