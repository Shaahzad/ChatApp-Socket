import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/user.js";
import {faker, simpleFaker} from '@faker-js/faker'

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

const createSingleChats = async(numChats) => {
try {
const users = await User.find().select("_id")

const chatsPromise = []

for (let i = 0; i < users.length; i++) {
for (let j = 0; j < users.length; j++) {
     chatsPromise.push(
         Chat.create({
             name: faker.lorem.word(2),
             members: [users[i], users[j]]
         })
     )    
}
}

await Promise.all(chatsPromise)
console.log("chats created")
process.exit()


} catch (error) {
    console.log(error)
    process.exit(1)
}
}

const createGroupChats = async(numChats) => {
try {
const users = await User.find().select("_id")

const chatsPromise = []

for (let i = 0; i < numChats; i++) {
    const numMembers = simpleFaker.number.int({min: 3, max: users.length})
    const members = [];

    for (let i = 0; i < numMembers; i++) {
        const randomIndex = Math.floor(Math.random() * users.length)
        const randomUser = users[randomIndex];


        if(!members.includes(randomUser)) {
            members.push(randomUser)
        }
    }
    const chat = await Chat.create({
        groupChat: true,
        name: faker.lorem.word(1),
        members,
        creator: members[0]
    })
    chatsPromise.push(chat)
}

await Promise.all(chatsPromise)
console.log("chats created")
process.exit()
} catch (error) {
    console.error(error)
    process.exit(1)
}
}


const createMessages = async(numMessages) =>{
try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id")

    const messagesPromise = []


    for (let i = 0; i < numMessages.length; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomChats = chats[Math.floor(Math.random() * chats.length)]


        messagesPromise.push(
            Message.create({
                chat: randomChats,
                sender: randomUser,
                content: faker.lorem.sentence()
            })
        )
    }

    await Promise.all(messagesPromise)
    console.log("messages created")
    process.exit()
} catch (error) {
    console.error(error)
    process.exit(1)
}
}


const createMessagesInAChat = async(chatId, numMessages) => {
try {
    const users = await User.find().select("_id")

    const messagesPromise = []

    for (let i = 0; i < numMessages; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]


        messagesPromise.push(
            Message.create({
                chat: chatId,
                sender: randomUser,
                content: faker.lorem.sentence()
            })
        )
    }

    await Promise.all(messagesPromise)
    console.log("messages created")
    process.exit()
} catch (error) {
    console.error(error)
    process.exit(1)
}
}

export {
    createUser,
    createSingleChats,
    createGroupChats,
    createMessages,
    createMessagesInAChat
}