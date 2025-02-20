import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment'
const Profile = () => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: "5px solid white"
        }}
      />
      <ProfileCard heading={'Bio'} text={'This is a bio'} />
      <ProfileCard heading={'UserName'} text={'This is a bio'} Icon={<AlternateEmailIcon />} />
      <ProfileCard heading={'Name'} text={'This is a bio'} Icon={<EmojiEmotionsIcon />} />
      <ProfileCard heading={'Joined'} text={moment().format('DD-MM-YYYY')} Icon={<CalendarMonthIcon />} />
    </Stack>
  )
}

const ProfileCard = ({ heading, text, Icon }) => (
  <Stack
    direction={'row'}
    alignItems={'center'}
    spacing={'1rem'}
    color={'white'}
    textAlign={'center'}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant='body1'>{text}</Typography>
      <Typography color={'gray'} variant='caption'>{heading}</Typography>
    </Stack>
  </Stack>
)

export default Profile