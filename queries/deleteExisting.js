const {Department, Role, Employee} = require('../models');
const {listChoice} = require('./prompts/listChoice');

module.exports = {
    // The listAll func will retreive all data from the data base in a certain category and log it
    deleteExisting: async (category) => {
        // Use a switch to determine the category
        switch (category) {
            case 'department':
                try {
                    // Get all departments
                    const departments = await Department.findAll({raw: true});
                    // Prompt the user to choose which to delete
                    const toDelete = await listChoice(departments, "name");
                    // Delete the data
                    await Department.destroy({where: {id: toDelete.id}});
                    console.log(`${toDelete.answer} has been deleted.`);
                } catch (e) {
                    console.log(e)
                }
                break;
            case 'role':
                try {
                    // Get all roles
                    const roles = await Role.findAll({raw: true});
                    // Prompt the user to choose which to delete
                    const toDelete = await listChoice(roles, "title");
                    // Delete the data
                    await Role.destroy({where: {id: toDelete.id}});
                    console.log(`${toDelete.answer} has been deleted.`);
                } catch (e) {
                    console.log(e)
                }
                break;
            case 'employee':
                try {
                    // Get all employees
                    const employees = await Employee.findAll({raw: true});
                    // Prompt the user to choose which to delete
                    const toDelete = await listChoice(employees, "first_name", "last_name");
                    // Delete the data
                    await Employee.destroy({where: {id: toDelete.id}});
                    console.log(`${toDelete.answer} has been deleted.`);
                } catch (e) {
                    console.log(e)
                }
                break;
            default:
                return;
        }
        return;
    }
}