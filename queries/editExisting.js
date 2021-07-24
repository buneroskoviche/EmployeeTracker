const {Department, Role, Employee} = require('../models');
const {listChoice, departmentPrompt, rolePrompt, employeePrompt} = require('./prompts');

module.exports = {
    // The editExisting func will determine which entry to edit, get new data, then overwrite data
    editExisting: async (category) => {
        // Use a switch to determine the category
        switch (category) {
            case 'department':
                const departments = await Department.findAll({raw: true});
                // Prompt the user to pick a department
                const dptToEdit = await listChoice(departments, "name");
                // Prompt the user to give a department name
                const newDptData = await departmentPrompt();
                // Update the department record
                await Department.update({name: newDptData.name}, {
                    where: {
                        id: dptToEdit.id,
                    }
                });
                console.log(`${dptToEdit.answer} updated to ${newDptData.name}!`);
                break;

            case 'role':
                // Get all Roles
                const roles = await Role.findAll({raw: true});
                // Prompt the user to pick a role
                const roleToEdit = await listChoice(roles, "title");
                // Prompt user for new data for the role
                const newRoleData = await rolePrompt();
                // Update the role based on matching id
                await Role.update({
                    title: newRoleData.title,
                    salary: newRoleData.salary,
                    department_id: newRoleData.department_id,
                }, 
                {
                    where: {
                        id: roleToEdit.id,
                    }
                });
                console.log(`${roleToEdit.answer} position updated!`);
                break;

            case 'employee':
                // Get all Employees
                const employees = await Employee.findAll({raw: true});
                // Prompt the user to pick an employee
                const empToEdit = await listChoice(employees, "first_name", "last_name");
                // Prompt user for new data for the role
                const newEmpData = await employeePrompt();
                console.log(empToEdit, newEmpData);
                // Update employee based on matching id
                await Employee.update({
                    first_name: newEmpData.first_name,
                    last_name: newEmpData.last_name,
                    role_id: newEmpData.role_id,
                    manager: newEmpData.manager,
                }, 
                {
                    where: {
                        id: empToEdit.id,
                    }
                });
                console.log(`${empToEdit.answer}'s record updated!`);
                break;
        }
    }
}