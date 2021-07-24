const {Department, Role, Employee} = require('../models');

module.exports = {
    // The listAll func will retreive all data from the data base in a certain category and log it
    listAll: async (category) => {
        // Use a switch to determine the category
        switch (category) {
            case 'department':
                try {
                    // Find all data in a category
                    const dptData = await Department.findAll();
                    // Remove extra fluff from the instances
                    const departments = dptData.map(entry => entry.get({plain: true}));
                    // Console log the data values
                    departments.forEach(entry => console.log(entry));
                } catch (e) {
                    console.log(e);
                }    
                break;
            case 'role':
                try {
                    const roleData = await Role.findAll();
                    const roles = roleData.map(entry => entry.get({plain: true}));
                    roles.forEach(entry => console.log(entry));
                } catch (e) {
                    console.log(e);
                } 
                break;
            case 'employee':
                try {
                    const empData = await Employee.findAll();
                    const employees = empData.map(entry => entry.get({plain: true}));
                    employees.forEach(entry => console.log(entry));
                } catch (e) {
                    console.log(e);
                } 
                break;
            default:
                
        }
    }
}