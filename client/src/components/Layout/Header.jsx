import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { orange } from '../../Constants/Color'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate } from 'react-router-dom';
// import Search from '../Specific/Search';
const SearchDialog = lazy(() => import('../Specific/Search'))
const NotificationDialog = lazy(() => import('../Specific/Notification'))
const NewGroupDialog = lazy(() => import('../Specific/NewGroup'))
const Header = () => {
  const navigate = useNavigate()
  const [ismobile, setismobile] = useState(false)
  const [isSearch, setisSearch] = useState(false)
  const [isNewGroup, setisNewGroup] = useState(false)
  const [isNotification, setisNotification] = useState(false)
  const HandleMobile = () => {
    setismobile(prev => !prev)
  }
  const Opensearch = () => {
    setisSearch(prev => !prev)
  }
  const openNewGroup = () => {
    setisNewGroup(prev => !prev)
  }
  const navigateToGroup = () => {
    navigate('/groups')
  }
  const logoutHandler = () => {

  }

  const openNotification = () => {
    setisNotification(prev => !prev)
  }
  return (
    <>
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
              display: { xs: 'block', sm: 'none' },
            }}>
              <IconButton color='inherit' onClick={HandleMobile}>
                {/* <MenuIcon /> */}
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Tooltip title='Search'>
                <IconButton color='inherit' size='large' onClick={Opensearch}>
                  {/* <MenuIcon /> */}
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='New Group'>
                <IconButton color='inherit' size='large' onClick={openNewGroup}>
                  {/* <MenuIcon /> */}
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Manage Group'>
                <IconButton color='inherit' size='large' onClick={navigateToGroup}>
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Notifications'>
                <IconButton color='inherit' size='large' onClick={openNotification}>
                  <NotificationsNoneIcon />
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


      {
        isSearch && (
          <Suspense fallback={<Backdrop open/>}>
            <SearchDialog/>
          </Suspense>
        )
      }

{
        isNotification && (
          <Suspense fallback={<Backdrop open/>}>
            <NotificationDialog/>
          </Suspense>
        )
      }

{
        isNewGroup && (
          <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialog/>
          </Suspense>
        )
      }

    </>
  )
}

export default Header