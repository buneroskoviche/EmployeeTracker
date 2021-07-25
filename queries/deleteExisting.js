const { nameCombine } = require('../config/helpers');
const {Department, Role, Employee} = require('../models');
const {listChoice, confirmDelete} = require('./prompts');

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
                    // Prompt the user to confirm the deletion
                    if(!await confirmDelete(toDelete)) {
                        break;
                    }
                    // Delete the data
                    await Department.destroy({where: {id: toDelete.id}});
                    console.log(`\n${toDelete.name} has been deleted.\n `);
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
                    if(!await confirmDelete(toDelete)) {
                        break;
                    }
                    // Delete the data
                    await Role.destroy({where: {id: toDelete.id}});
                    console.log(`\n${toDelete.title} has been deleted.\n `);
                } catch (e) {
                    console.log(e)
                }
                break;
            case 'employee':
                try {
                    const employees = await Employee.findAll({raw: true});
                    const toDelete = await listChoice(employees, "first_name", "last_name");
                    if(!await confirmDelete(toDelete)) {
                        break;
                    }
                    await Employee.destroy({where: {id: toDelete.id}});
                    console.log(`\n${nameCombine(toDelete)} has been deleted.\n `);
                    // Find all employees with the deleted record as a manager
                    const managersToRemove = await Employee.findAll({
                        raw: true,
                        where: {manager: nameCombine(toDelete)}
                    });
                    // Update the records to show no manager
                    managersToRemove.forEach(async (record) => {
                        await Employee.update({
                            manager: null
                        },
                        {
                            where: {
                                id: record.id
                            }
                        });
                    });
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