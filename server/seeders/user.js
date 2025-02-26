import User from "../models/user.js";
import {faker} from '@faker-js/faker'

const createUser = async(numUser)=> {
    try {
        const usersPromise = [];
        for (let index = 0; index < numUser; index++) {
            const tempUser = User.create({
             name: faker.person.fullName(),
             username: faker.internet.userName(),
             bio: faker.lorem.sentence(10),
             password: "password",
             avatar: {
                url: faker.image.avatar(),
                public_id: faker.system.fileName()
             }
            })
            usersPromise.push(tempUser)
        }

       await Promise.all(usersPromise)
       console.log("users created", numUser)
       process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export {
    createUser
}