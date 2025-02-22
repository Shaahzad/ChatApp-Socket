import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { VisuallyHiddenInput } from '../../components/styled/Styledcomponent'
import { bgGradient } from '../../Constants/Color'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';

const isAdmin =  true

const Adminlogin = () => {
  const secretkey = useInputValidation('')
  const SubmitHandler = (e) => {
    e.preventDefault()
    console.log(e)
  }
  if(isAdmin) return <Navigate to='/admin/dashboard'/>
  return (
    <div style={{ backgroundImage: bgGradient }}>
      <Container component={'main'} maxWidth={'xs'}
        sx={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }
        }
      >
        <Paper elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5'>Admin Login</Typography>
          <form
            style={{
              width: '100%',
              marginTop: '1rem',
            }}
            onSubmit={SubmitHandler}
          >
            <TextField
              required
              fullWidth
              label='Secret Key'
              type='password'
              margin='normal'
              variant='outlined'
              value={secretkey.value}
              onChange={secretkey.changeHandler}
            />
            <Button sx={{
              marginTop: '1rem'
            }} variant='contained' color='primary' type='submit' fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default Adminlogin