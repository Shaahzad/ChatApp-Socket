import { Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightblue } from '../../Constants/Color'
import moment from 'moment'
import { fileformat } from '../../lib/Features'
import Renderattachment from './Renderattachment'

const Messagecomponent = ({message, user}) => {
    const {sender, content, attachment = [], createdAt} = message
    const samesender = sender?._id === user?._id
  return (
    <div
    style={{
        alignSelf: samesender ? 'flex-end' : 'flex-start',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        padding: '0.5rem',
        width: 'fit-content'
    }}
    >
        {
            !samesender && <Typography color={lightblue} fontWeight={'600'}
            variant='caption'
            >{sender.name}</Typography>
        }
        {
            content && <Typography>{content}</Typography>
        }
        {
            attachment.length > 0 && (
                attachment.map((attachment, index)=> {
                    const url = attachment.url
                    const file = fileformat(url)
                    return <Box key={index}>
                     <a href=""
                     target='_blank'
                     download
                     style={{
                        color: 'black'
                     }} 
                     >
                        kaka
                        {Renderattachment(file, url)}
                     </a>
                    </Box>
                })
            )
        }
        <Typography variant='caption' color={'text.secondary'}>{moment(createdAt).fromNow()}</Typography>
    </div>
  )
}

export default memo(Messagecomponent)