// Call dependencies
const {listAll} = require('./listAll');
const {addNew} = require('./addNew');
const {deleteExisting} = require('./deleteExisting');
const {editExisting} = require('./editExisting');

module.exports = {
    listAll, 
    addNew, 
    deleteExisting,
    editExisting
};