import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Sampleuser } from '../../Constants/Sampledata'
import UserItem from '../Shared/UserItem'

const AddMemberDialog = ({addMember, isLoadingAddMember, chatId}) => {
  const [members, setMembers] = useState(Sampleuser)
  const [selectmember, setSelectmember] = useState([])
  const selectmemberHandler = (id) => {
    setSelectmember((prev) => prev.includes(id) ? prev.filter((member) => member !== id) : [...prev, id])
  }


  const addMemberSubmitHandler = () => {
    
  }

  const closeHandler = () => {
    setSelectmember([])
    setMembers([])
  }
  return (
    <Dialog open onClose={closeHandler}>
    <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
   <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
   <Stack spacing={'1rem'}>
    {
      members.length > 0 ? members.map((i)=> (
        <UserItem 
        key={i._id}
        user={i}
        handler={selectmemberHandler}
        isAdded={selectmember.includes(i._id)}
        />
      ))
      :
      <Typography textAlign={'center'}>No User</Typography>
    }
   </Stack>
   <Stack
   direction={'row'}
   justifyContent={'space-evenly'}
   alignItems={'center'}
   >
   <Button color='error' onClick={closeHandler}>Cancel</Button>
   <Button onClick={addMemberSubmitHandler} disabled={isLoadingAddMember} variant='contained'>Submit Changes</Button>
   </Stack>
    </Stack>
    </Dialog>
  )
}

export default AddMemberDialog