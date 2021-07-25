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
    },
    // This function will check to see if to object's values match
    checkMatch: (obj1, obj2) => {
        const message = 'Looks like nothing changed...';
        // If statement determines the category based on an existing parameter
        if(obj1.name) {
            // if statements compare all object values
            if(obj1.name === obj2.name) {
                console.log(message);
                return true;
            }
            return false;
        } else if(obj1.title) {
            if(obj1.title === obj2.title
                && obj1.salary === obj2.salary
                && obj1.department_id === obj2.department_id) {
                    console.log(message);
                    return true;
                }
            return false;
        } else if(obj1.first_name) {
            if(obj1.first_name === obj2.first_name
                && obj1.last_name === obj2.last_name
                && obj1.role_id === obj2.role_id
                && obj1.manager === obj2.manager) {
                    console.log(message);
                    return true;
                }
            return false;
        } else {
            return false;
        }
    }
}