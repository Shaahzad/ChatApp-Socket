import { Box, Drawer, Grid, Grid2, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { graycolor } from '../../Constants/Color'
import MenuIcon from '@mui/icons-material/Menu';
import CLoseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
const Sidebar = ({w='100%'}) => {
const location = useLocation()
    return <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
  <Typography variant='h3' textTransform={'uppercase'} >
    Chat App
  </Typography>
    </Stack>
}
const Adminlayout = ({children}) => {
const [mobile, setIsmobile] = useState(false)
const HandleMobile = () => {
    setIsmobile(!mobile)
}

const HandleClose = () => {
    setIsmobile(false)
}
  return (
  <Grid container minHeight={'100vh'}>
    <Box
    sx={{
        display:{
            xs: 'block',
            md: 'none'
        },
        position: 'fixed',
        right: '1rem',
        top: '1rem'
    }}
    >
        <IconButton onClick={HandleMobile}>
        {
            mobile ? <CLoseIcon/> : <MenuIcon/>
        }
        </IconButton>
    </Box>
<Grid
item
md={4}
lg={3}
sx={{
    display:{
        xs: 'none',
        md: 'block'
    }
}}
>
<Sidebar/>
</Grid>

<Grid
item
xs={12}
md={8}
lg={9}
sx={{
    bgcolor: graycolor
}}
>
{children}
</Grid>
<Drawer open={mobile} onClose={HandleClose}>
<Sidebar/>
</Drawer>

  </Grid>
  )
}

export default Adminlayout