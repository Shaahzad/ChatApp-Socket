export const SampleChats = [{
    avatar: ['https://www.w3school.com/howto/img_avatar.png'],
    name: 'User 1',
    _id: '1',
    groupChat: false,
    members: ['1', '2']
},
{
    avatar: ['https://www.w3school.com/howto/img_avatar.png'],
    name: 'User 2',
    _id: '2',
    groupChat: false,
    members: ['1', '2']
}

]

export const Sampleuser = [{
    avatar: ['https://www.w3school.com/howto/img_avatar.png'],
    name: 'User 1',
    _id: '1',
},
{
    avatar: ['https://www.w3school.com/howto/img_avatar.png'],
    name: 'User 2',
    _id: '2',
}
]

export const SampleNotification = [
   {
    sender: {
        avatar: 'https://www.w3school.com/howto/img_avatar.png',
        name: 'User 1',
    },
    _id: '1',
   },
   {
    sender: {
        avatar: 'https://www.w3school.com/howto/img_avatar.png',
        name: 'User 2',
    },
    _id: '2',
   }
]

export const SampleMessage = [
    {
     attachments: [
        {
            public_id: 'jhjhjh',
            url: 'https://www.w3school.com/howto/img_avatar.png'
        },
     ],
     content: 'hello',
     _id: '1',
     sender: {
        _id: 'user._id',
        name: 'kaka'
     },
     chat: 'chatId',
     createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
        attachments: [
           {
               public_id: '2',
               url: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?ga=GA1.1.1272054986.1732180061&semt=ais_hybrid'
           },
        ],
        content: 'hello 2',
        _id: 'jhhjhjjh',
        sender: {
           _id: 'abc',
           name: 'kaka 2'
        },
        chat: 'chatId',
        createdAt: '2023-01-01T00:00:00.000Z',
       }
]


export const dashboardData = {
    users: [
        {
            name: 'John Doe',
            avatar: 'https://',
            _id: '1',
            username: 'john_doe',
            friends: 20,
            groups: 5
        },
        {
            name: 'John Boi',
            avatar: 'https://',
            _id: '2',
            username: 'john_Boi',
            friends: 20,
            groups: 25
        }
    ],
    chats:[
        {
        name: 'Raees Ka Londa',
        avatar: ['https://'],
        _id: '1',
        groupChat: false,
        members: [{_id: "1", avatar: 'https://'}, {_id: "2", avatar: 'https://'}],
        totalMembers: 2,
        totalMessages: 10,
        creator:{
            name: 'John Doe',
            avatar: 'https://',
        },
    },
    {
        name: 'Kali Mata',
        avatar: ['https://'],
        _id: '2',
        groupChat: false,
        members: [{_id: "1", avatar: 'https://'}, {_id: "2", avatar: 'https://'}],
        totalMembers: 2,
        totalMessages: 10,
        creator:{
            name: 'John Doe',
            avatar: 'https://',
        }
    }
],
messages:[
    {
    attachments: [],
    content: 'hello',
    _id: 'ksdkdjshd',
    sender:{
        avatar: 'https://www.w3school.com/howto/img_avatar.png',
        name: 'John Doe'
    },
    chat: 'chatId',
    groupChat: false,
    createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
        attachments: [
            {
                public_id: '2',
                url: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?ga=GA1.1.1272054986.1732180061&semt=ais_hybrid'
            }
        ],
        content: 'hello 2',
        _id: 'jhhjhjjh',
        sender: {
           avatar: 'https://www.w3school.com/howto/img_avatar.png',
           name: 'John Doe'
        },
        chat: 'chatId',
        groupChat: false,
        createdAt: '2023-01-01T00:00:00.000Z',
    }
]
} 