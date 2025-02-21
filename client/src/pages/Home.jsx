import React from 'react'
import Applayout from '../components/Layout/Applayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box bgcolor={'gray'} height={'100%'}>
   <Typography p={'2rem'} variant='h5' textAlign={'center'}>Select A friend To Chat</Typography>
    </Box>
  )
}

export default Applayout()(Home)