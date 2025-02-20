import React from 'react'
import Header from './Header'
import Title from '../Shared/Title'
import { Grid } from '@mui/material'
import Chatlist from '../Specific/Chatlist'
import { SampleChats } from '../../Constants/Sampledata'
import { useParams } from 'react-router-dom'
import Profile from '../Specific/Profile'

const Applayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams()
    const chatId = params.chatId
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault()
      console.log("delete chat", _id, groupChat)
    }

    return (
      <div>
        <Title />
        <Header />
        <Grid container height={'calc(100vh - 4rem)'}>
          <Grid item sm={4} md={3} sx={{
            display: { xs: 'none', sm: 'block' }
          }} height={'100%'}>
          <Chatlist chats={SampleChats} chatId={chatId} handleDeleteChat={handleDeleteChat} />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid item md={4} lg={3} height={'100%'}
         sx={{
          display: { xs: 'none', md: 'block' },
          padding: '1rem',
          bgcolor: 'rgba(0,0,0,85)'
         }} 
          >
            <Profile/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Applayout