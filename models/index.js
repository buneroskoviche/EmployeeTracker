const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

Employee.hasOne(Role, {
    foreignKey: 'role_id',
});

Employee.hasOne(Employee, {
    foreignKey: 'manager_id',
});

Department.hasMany(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE',
});

Role.belongsTo(Department, {
    foreignKey: 'department_id',
});

module.exports = {Department, Role, Employee};