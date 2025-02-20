import { Stack } from '@mui/material'
import React from 'react'
import Chatitem from '../Shared/Chatitem'

const Chatlist = ({ w = '100%', chats = [], chatId, onlineUsers = [], newmessageAlert = [{
    chatId: '',
    count: 0
}],
handleDeleteChat
}) => {
    return (
        <Stack width={w} direction={'column'}>
            {
                chats.map((data, index) => {
                    const { avatar, _id, name, groupChat, members } = data
                    const newMessageAlert = newmessageAlert.find((chatId) => chatId === _id)
                    const isOnline = members.some((member) => onlineUsers.includes(member))
                    return (
                        <Chatitem
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        groupChat={groupChat}
                        key={_id}
                        sameSender={chatId === _id}
                        handleDeleteChat={handleDeleteChat}
                        index={index}
                    />
                    )
                }
                )
            }
        </Stack>
    )
}

export default Chatlist