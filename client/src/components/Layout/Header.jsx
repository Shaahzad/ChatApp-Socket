import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { orange } from '../../Constants/Color'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()

  const HandleMobile = () => {
    console.log('clicked')
  }
  const OpensearchDialog = () => {

  }
  const openNewGroup = () => {

  }
const navigateToGroup = () => {
  navigate('/groups')
}
const logoutHandler = () => {
  
}
  return (
    <Box sx={{
      flexGrow: 1
    }}
      height={'4rem'}
    >
      <AppBar position='static'
        sx={{
          backgroundColor: orange,
        }}
      >
      <Toolbar>
        <Typography
          variant='h6'
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Chat App
        </Typography>
        <Box sx={{
          display: {xs: 'block', sm: 'none'},
        }}>
         <IconButton color='inherit' onClick={HandleMobile}>
          {/* <MenuIcon /> */}
          <MenuIcon />
         </IconButton>
        </Box>
        <Box sx={{flexGrow: 1}}/>
        <Box>
       <Tooltip title='Search'> 
       <IconButton color='inherit' size='large' onClick={OpensearchDialog}>
          {/* <MenuIcon /> */}
          <SearchIcon  />
         </IconButton>
       </Tooltip>
        <Tooltip title='New Group'>
        <IconButton color='inherit' size='large' onClick={openNewGroup}>
          {/* <MenuIcon /> */}
          <AddIcon  />
         </IconButton>
        </Tooltip>
        <Tooltip title='Manage Group'>
        <IconButton color='inherit' size='large' onClick={navigateToGroup}>
          <GroupIcon />
         </IconButton>
        </Tooltip>       
         <Tooltip title='Logout'>
        <IconButton color='inherit' size='large' onClick={logoutHandler}>
          <LogoutIcon />
         </IconButton>
        </Tooltip>
        </Box>
      </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header