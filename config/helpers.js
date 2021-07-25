module.exports = {
    // This function combines the first_name and last_name parameters of an object
    nameCombine: (object) => {
        if(object.first_name && object.last_name){
            return `${object.first_name} ${object.last_name}`;
        } else {
            return 'Something went wrong...';
        }
    },
    // This function returns a default value for the prompts if editing
    retainExisting: (object, param) => {
        if(object) {
            return object[param];
        }
    }
}