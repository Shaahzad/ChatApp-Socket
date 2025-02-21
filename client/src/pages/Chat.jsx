import React, { Fragment, useRef } from 'react'
import Applayout from '../components/Layout/Applayout'
import { IconButton, Stack } from '@mui/material'
import { graycolor, orange } from '../Constants/Color'
import { AttachFile, Send } from '@mui/icons-material'
import { InputBox } from '../components/styled/Styledcomponent'
import FileMenu from '../components/Dialog/FileMenu'
import { SampleMessage } from '../Constants/Sampledata'
import Messagecomponent from '../components/Shared/Messagecomponent'

const user = {
  _id: 'abc',
  name: 'kaka'
}
const Chat = () => {
  const containerRef = useRef(null)
  return(
   <Fragment>
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
   {
    SampleMessage.map((item) => (
       <Messagecomponent message={item} user={user} key={item._id}/>
    ))
   }
</Stack>
<form style={{
  height: '10%',
}}>
<Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
  <IconButton
  sx={{
    position: 'absolute',
    left: '1.5rem',
    rotate: '30deg'
  }}
  >
    <AttachFile/>
  </IconButton>
  <InputBox placeholder='Type a message ...'/>
  <IconButton type='submit' sx={{
    rotate: '-30deg',
    backgroundColor: orange,
    color: 'white',
    marginLeft: '1rem',
    padding: '0.5rem',
    "&:hover": {
      bgcolor: 'error.dark'
    }
  }}>
    <Send/>
  </IconButton>
</Stack>
</form>
<FileMenu/>
</Fragment>
  )
}

export default Applayout()(Chat)