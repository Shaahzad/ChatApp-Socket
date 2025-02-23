import { Box, Drawer, Grid, Grid2, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { graycolor, matBlack } from '../../Constants/Color'
import MenuIcon from '@mui/icons-material/Menu';
import CLoseIcon from '@mui/icons-material/Close';
import { Navigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import { Link as LinkComponent } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const Link = styled(LinkComponent)`
text-decoration: none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover{
    color: rgba(0,0,0,0.54)
}
`;
const AdminTabs = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: <DashboardIcon />
    },
    {
        name: 'Users',
        path: '/admin/users',
        icon: <ManageAccountIcon />
    },
    {
        name: 'Chats',
        path: '/admin/chats',
        icon: <GroupsIcon />
    },
    {
        name: 'Messages',
        path: '/admin/message',
        icon: <MessageIcon />
    },
]

const isAdmin = true
const Sidebar = ({ w = '100%' }) => {
    const location = useLocation()
    const logoutHandler = () => {
        console.log('logout')
    }
    return <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
        <Typography variant='h3' textTransform={'uppercase'} >
            Chat App
        </Typography>
        <Stack spacing={'1rem'}>
            {
                AdminTabs.map((tab) => (
                    <Link key={tab.path} to={tab.path}
                        sx={
                            location.pathname === tab.path && {
                                bgcolor: matBlack,
                                color: 'white',
                                "&:hover":
                                    { color: 'white' }
                            }
                        }
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                            {tab.icon}
                            <Typography>{tab.name}</Typography>
                        </Stack>
                    </Link>
                ))
            }
            <Link onClick={logoutHandler}>
                <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                    <ExitToAppIcon />
                    <Typography>Logout</Typography>
                </Stack>
            </Link>
        </Stack>
    </Stack>
}
const Adminlayout = ({ children }) => {
    const [mobile, setIsmobile] = useState(false)
    const HandleMobile = () => {
        setIsmobile(!mobile)
    }

    const HandleClose = () => {
        setIsmobile(false)
    }
    if(!isAdmin) return <Navigate to={'/admin/dashboard'}/>
    return (
        <Grid container minHeight={'100vh'}>
            <Box
                sx={{
                    display: {
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
                        mobile ? <CLoseIcon /> : <MenuIcon />
                    }
                </IconButton>
            </Box>
            <Grid
                item
                md={4}
                lg={3}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}
            >
                <Sidebar />
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
                <Sidebar />
            </Drawer>

        </Grid>
    )
}

export default Adminlayout