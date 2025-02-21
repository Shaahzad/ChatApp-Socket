import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Sampleuser } from '../../Constants/Sampledata'
import UserItem from '../Shared/UserItem'
import { useInputValidation } from '6pp'

const NewGroup = () => {
  const groupName =   useInputValidation('')
  const [members, setMembers] = useState(Sampleuser)
  const [selectmember, setSelectmember] = useState([])
  const selectmemberHandler = (id) => {
    setSelectmember((prev) => prev.includes(id) ? prev.filter((member) => member !== id) : [...prev, id])
  }
  console.log(selectmember)
  const SubmitHandler = () => {
    
  }

  const closeHandler = () => {

  }
  return <Dialog open onClose={closeHandler}>
    <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'}>
      <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
      <TextField label='Group Name' value={groupName.value} onChange={groupName.onChange}/>
      <Typography variant='body1'>Members</Typography>
      <Stack>
        {
          members.map((user) => (
            <UserItem user={user} key={user._id} handler={selectmemberHandler} isAdded={selectmember.includes(user._id)}/>
          )
          )
        }
      </Stack>

      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Button variant='outlined' color='error' size='large'>Cancel</Button>
        <Button variant='contained' size='large' onClick={SubmitHandler}>Create</Button>
      </Stack>
    </Stack>
  </Dialog>
}

export default NewGroup