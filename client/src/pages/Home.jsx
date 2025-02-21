import React from 'react'
import Applayout from '../components/Layout/Applayout'
import { Box, Typography } from '@mui/material'
import { graycolor } from '../Constants/Color'

const Home = () => {
  return (
    <Box bgcolor={graycolor} height={'100%'}>
   <Typography p={'2rem'} variant='h5' textAlign={'center'}>Select A friend To Chat</Typography>
    </Box>
  )
}

export default Applayout()(Home)