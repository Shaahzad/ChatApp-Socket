import React, { Fragment, useRef } from 'react'
import Applayout from '../components/Layout/Applayout'
import { IconButton, Stack } from '@mui/material'
import { graycolor } from '../Constants/Color'
import { AttachFile } from '@mui/icons-material'

const Chat = () => {
  const containerRef = useRef(null)
  return <Fragment>
  <Stack 
  ref={containerRef}
  boxSizing={'border-box'}
  padding={'1rem'}
  spacing={'1rem'}
  bgcolor={graycolor}
  height={'90%'}
  sx={{
    overflowX: 'hidden',
    overflowY: 'auto'
  }}
  >
   
</Stack>
<form style={{
  height: '10%',
}}>
<Stack>
  <IconButton>
    <AttachFile/>
  </IconButton>
</Stack>
</form>
  </Fragment>
}

export default Applayout()(Chat)