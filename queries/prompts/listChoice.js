const inquirer = require('inquirer');

module.exports = {
    // The listChoice func will prompt the user with a dynamically created list of answers and return an object
    listChoice: async (array, param1, param2) => {
        let choices;
        // Determine if param2 is present
        if(param2) {
            // If so, map the entry with 2 parameters
            choices = array.map(entry => `${entry.id}: ${entry[param1]} ${entry[param2]}`);
        } else {
            // If not, map with only 1 parameter
            choices = array.map(entry => `${entry.id}: ${entry[param1]}`)
        }
        // Prompt the user to choose one of the mapped values
        const {answer} = await inquirer.prompt([
            {
                type: 'list',
                name: 'answer',
                message: 'Which one?',
                choices: choices
            }
        ]);
    
        // Extract the id from the answer
        const id = answer.split(':')[0];

        // Find the object with the matching id in the array
        let objectToReturn = array.find(entry => entry.id === Number(id));

        // Return the id number and text in an obj
        return objectToReturn;
    }
}