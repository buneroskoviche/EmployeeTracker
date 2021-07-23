const {Department, Role, Employee} = require('../models');

module.exports = {
    // The listAll func will retreive all data from the data base in a certain category and log it
    listAll: async (category) => {
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
    }
}