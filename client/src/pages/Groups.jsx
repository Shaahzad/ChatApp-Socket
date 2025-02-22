import React, { Suspense, memo, useEffect, useState } from 'react'
import { Backdrop, Box, Button, Drawer, Grid, Icon, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { matBlack, orange } from '../Constants/Color' 
import { useNavigate, useSearchParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from "@mui/icons-material/Menu";
import {AvatarCard, Link} from '../components/styled/Styledcomponent'
import {SampleChats} from '../Constants/Sampledata'
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const ConfirmDeleteDialog = React.lazy(() => import('../components/Dialog/ConfirmDeleteDialog'))
const AddMemberDialog = React.lazy(() => import('../components/Dialog/AddMemberDialog'))
const isAddMember = true
const Groups = () => {
  const [ismobilemenuopen, setismobilemenuopen] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupNameupdatedvalue, setGroupNameupdatedvalue] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()
  const chatId = useSearchParams()[0].get('group')
  // console.log(chatId)

  const CloseconfirmDeleteHandler = () => {
    setConfirmDelete(false)
  }
  const deleteGroupHandler = () => {
    setConfirmDelete(true)
    console.log('delete group')
  }

  const openAddMemberHandler = () => {
    console.log('open add member')
  }
  const navigateBack = () => {
    navigate('/')
  }
  const HandleMobile = () => {
    setismobilemenuopen(prev => !prev)
  }
  const HandleMobileClose = () => {
    setismobilemenuopen(false)
  }

const updateGroupName = () => {
  setisEdit(false)
  console.log('update group name')
}

const DeleteHanler = () => {
  CloseconfirmDeleteHandler()
}

useEffect(() => {
  setGroupName(`Group Name ${chatId}`)
  setGroupNameupdatedvalue(`Group Name ${chatId}`)

  return () => {
    setGroupName('')
    setGroupNameupdatedvalue('')
    setisEdit(false)
  }
},[chatId])

  const IconBtn = (
    <>
    <Box
        sx={{
          display:{
            sm: 'none',
            xs: 'block',
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          }
        }}    
    >
      <Tooltip title='Menu'>
    <IconButton onClick={HandleMobile}>
    <MenuIcon/>
    </IconButton>
      </Tooltip>
    </Box>
    <Tooltip title='Back'>
     <IconButton 
     sx={{
      position: 'absolute',
      top: '2rem',
      left: '2rem',
      bgcolor: matBlack,
      color: 'white',
      '&:hover':{
        bgcolor: 'rgba(0,0,0,0.7)'
      }
     }}
     onClick={navigateBack}
     >
      <KeyboardBackspaceIcon/>
     </IconButton>
    </Tooltip>
    </>
  )

const GroupName = <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}
spacing={'1rem'} padding={'3rem'}
>
  {
    isEdit ? <>
    <TextField value={groupNameupdatedvalue} onChange={(e) => setGroupNameupdatedvalue(e.target.value)}/>
    <IconButton onClick={updateGroupName}>
      <DoneIcon/>
    </IconButton>
    </> : <>
    <Typography variant='h4'>{groupName}</Typography>
    <IconButton onClick={() => setisEdit(true)}>
      <EditIcon/>
    </IconButton>
    </>
  }
</Stack>


const ButtonGroup = <Stack direction={{
  xs: 'column-reverse',
  sm: 'row'
}} 
spacing={'1rem'}
p={{
  sm: '1rem',
  xs: '0',
  md: '1rem 4rem'
}}
>
<Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon/>}
onClick={deleteGroupHandler}
>Delete Group</Button>
<Button size='large' variant='contained' startIcon={<AddIcon/>}
onClick={openAddMemberHandler}
>Add Member</Button>
</Stack>

  return <Grid container height={'100vh'}>
<Grid 
item
sx={{
  display:{
    xs: 'none',
    sm: 'block'
  }
}}
sm={4}
bgcolor={orange}
>
<GroupsList myGroups={SampleChats} chatId={chatId}/>
</Grid>
<Grid
item 
xs={12}
sm={8}
sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  padding: '1rem 3rem'
}}
>
{IconBtn}

{
 groupName && <>
 {GroupName}
 <Typography
 margin={'2rem'}
 alignSelf={'flex-start'}
 variant='body1'
 >
  Members
  </Typography>

  <Stack
  maxWidth={'45rem'}
  width={'100%'}
  boxSizing={'border-box'}
  padding={{
    sm: '1rem',
    xs: '0',
    md: '1rem 4rem'
  }}
  spacing={'2rem'}
  bgcolor={'bisque'}
  height={'50vh'}
  overflow={'auto'}
  >
{/*       members */}
  </Stack>
  {
    ButtonGroup
  }
 </>
}
</Grid>
 {
  isAddMember && <Suspense fallback={<Backdrop open/>}>
    <AddMemberDialog />
    </Suspense>
 }

{
  confirmDelete && <Suspense fallback={<Backdrop open/>}>
  <ConfirmDeleteDialog open={confirmDelete} handleClose={CloseconfirmDeleteHandler} handleDelete={DeleteHanler}/>
  </Suspense>
}



<Drawer
sx={{
  display: {
    xs: 'block',
    sm: 'none'
  }
}}
open={ismobilemenuopen} onClose={HandleMobileClose}>
<GroupsList myGroups={SampleChats} chatId={chatId} w={'50vw'}/>
</Drawer>
  </Grid>
}


const GroupsList = ({w='100%', myGroups=[], chatId}) => (
<Stack width={w}>
  {
    myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId}/>
      )) 
    )
    : (
      <Typography textAlign={'center'} padding='1rem'>No Groups</Typography>
    )
  }
</Stack>
)

const GroupListItem = memo(({group, chatId}) => {
  const {name, avatar, _id} = group

  return <Link to={`?group=${_id}`} onClick={(e)=> {
    if(chatId === _id) e.preventDefault()
  }}>
  <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
    <AvatarCard avatar={avatar}/>
    <Typography >{name}</Typography>
  </Stack>
  </Link>
})

export default Groups