import { isValidUsername } from "6pp"

const Usernamevalidator = (username) => {
    if(!isValidUsername(username)) 
    return {isValid: false, errormessge: 'Username Is Invalid'}
}

export default Usernamevalidator