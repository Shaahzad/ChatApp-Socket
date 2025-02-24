import React from 'react'
import Adminlayout from '../../components/Layout/Adminlayout'
import { Box, Container, Input, Paper, Stack, Typography } from '@mui/material'
import AdminPanelSettingIcon from '@mui/icons-material/AdminPanelSettings';
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styled/Styledcomponent';
import NotificationIcon from '@mui/icons-material/NotificationsNone';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import { matBlack } from '../../Constants/Color';
import { DoughnutChart, LineChart } from '../../components/Specific/Charts';
const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettingIcon sx={{ fontSize: '3rem' }} />
        <SearchField placeholder='Search...' />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: 'none',
            lg: 'block'
          }}
          color={'rgba(0,0,0,0.7)'}
          textAlign={'center'}
        >
          {moment().format('MMMM Do YYYY')}
        </Typography>
        <NotificationIcon />
      </Stack>
    </Paper>
  )

  const Widget = (
    <Stack direction={{
      xs: 'column',
      sm: 'row'
    }}
    spacing={'2rem'}
    justifyContent={'space-between'}
    alignItems={'center'}
    margin={'2rem 0'}
    >
    <Widgets title={'Users'} value={123} Icon={<PersonIcon/>}/>
    <Widgets title={'Chats'} value={123} Icon={<GroupIcon/>}/>
    <Widgets title={'Messages'} value={123} Icon={<MessageIcon/>}/>
    </Stack>
  )

  return (
    <Adminlayout>
      <Container component={'main'}>
        {Appbar}
        <Stack
         direction={{
          xs: 'column',
          lg: 'row',
         }}
          // flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={{
            xs: 'center',
            lg: 'stretch'
          }}
          sx={{gap: '2rem'}}
          >
          <Paper
          elevation={3}
          sx={{
            padding: '2rem 3.5rem',
            borderRadius: '1rem',
            width: '100%',
            maxWidth: '45rem',
          }}
          >
            <Typography
            margin={'2rem 0'}
            variant='h4'
            >
            Last Message
            </Typography>
            <LineChart value={[55,12,155]}/>
          </Paper>
          <Paper
          elevation={3}

          sx={{
            padding: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: {xs: '100%', sm: '50%'},
            position: 'relative',
            width: '100%',
            maxWidth: '25rem',
            // height: '25rem'
          }}
          >
           <DoughnutChart labels={['Single Chat', 'Group Chat']} value={[90, 10]}/>
           <Stack
           position={'absolute'}
           direction={'row'}
           justifyContent={'center'}
           alignItems={'center'}
           spacing={'0.5rem'}
           width={'100%'}
           height={'100%'}
           >
        <GroupIcon/>
        <Typography>
          Vs
        </Typography>
        <PersonIcon/>
           </Stack>
          </Paper>
        </Stack>
        {Widget}
      </Container>
    </Adminlayout>
  )
}

const Widgets = ({title,value,Icon})  =>
 <Paper
 elevation={3}
 sx={{
  padding: '2rem',
  margin: '2rem 0',
  borderRadius: '1.5rem',
  width: '20rem'
 }}
 >
  <Stack alignItems={'center'} spacing={'1rem'}>
  <Typography
  sx={{
    color: 'rgba(0,0,0,0.7)',
    borderRadius: '50%',
    border: `5px solid ${matBlack}`,
    width: '5rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >{value}
  </Typography>
  <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
    {Icon}
    <Typography>{title}</Typography>
  </Stack>
  </Stack>
</Paper>


export default Dashboard