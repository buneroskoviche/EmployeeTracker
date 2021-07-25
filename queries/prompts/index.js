const {listChoice} = require('./listChoice');
const {confirmDelete} = require('./confirmDelete');
const {departmentPrompt, rolePrompt, employeePrompt} = require('./newPrompts');

module.exports = {
    listChoice,
    departmentPrompt,
    rolePrompt,
    employeePrompt,
    confirmDelete,
}