import React, { memo } from 'react'
import { Link } from '../styled/Styledcomponent'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index= 0,
  handleDeleteChat
}) => {
  return (
    <Link sx={{
      padding: '0'
    }} to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
    <div 
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: sameSender ? 'black' : 'white',
      color: sameSender ? 'white' : 'black',
      position: 'relative'
    }}
    >
      <AvatarCard avatar={avatar} />
<Stack>
  <Typography>{name}</Typography>
  {
    newMessageAlert && (
      <Typography>{newMessageAlert.count}</Typography>
    )
  }
  {
    isOnline && (
      <Box
      sx={{
        width: '10px',
        height: '10px',
      borderRadius: '50%',
      backgroundColor: 'green',
      position: 'absolute',
      top: '50%',
      right: '1rem',
      transform: 'translateY(-50%)'
      }}
      >

      </Box>
    )
  }
</Stack>
    </div>
    </Link>
  )
}

export default memo(Chatitem)