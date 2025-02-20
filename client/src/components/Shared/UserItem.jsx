import { Avatar, IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import AddIcon from '@mui/icons-material/Add';

const UserItem = ({user, handler, handlerIsloading}) => {
    const {name, _id, avatar} = user
  return (
    <ListItem>
    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'}>
        <Avatar/>
        <Typography variant='body1'
        sx={{
            flexGlow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }}
        >{name}</Typography>
        <IconButton
        size='small'
        sx={{
            bgcolor: 'primary.main',
            color: 'white',
            "&:hover":{
                bgcolor: 'primary.dark'
            }
        }}
        onClick={()=> handler(_id)} disabled={handlerIsloading}>
            <AddIcon/>
        </IconButton>
    </Stack>
  </ListItem>
)
}

export default memo(UserItem)