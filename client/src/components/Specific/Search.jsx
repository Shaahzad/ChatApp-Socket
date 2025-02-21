import React, { useState } from 'react'
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import {useInputValidation} from '6pp'
import SearchIcon from '@mui/icons-material/Search';
import UserItem from '../Shared/UserItem';
import { Sampleuser } from '../../Constants/Sampledata';


const Search = () => {
  const [users, setUsers] = useState(Sampleuser)
  const search = useInputValidation("")
  let isloadingsendfriendrequest = false
  const addfriendHandler = (id) => {
   console.log(id)
  }
  return <Dialog open>
   <Stack p={'2rem'} direction={'column'} width={'25rem'}>
    <DialogTitle textAlign={'center'}>
     Find People
    </DialogTitle>
    <TextField label='' value={search.value} onChange={search.onChange}
    variant='outlined'
    size='small'
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
        <SearchIcon/>
        </InputAdornment>
      )
    }}
    />
    <List>
      {
        users.map((user) => (
          <UserItem user={user} key={user._id} handler={addfriendHandler} handlerIsloading={isloadingsendfriendrequest}/>
        )
        )
      }
    </List>
   </Stack>
  </Dialog>
}

export default Search