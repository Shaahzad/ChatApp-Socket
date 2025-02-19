import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Login = () => {
    const [islogin, setIslogin] = useState(true)
    const togglelogin = () => {
        setIslogin(false)
    }
    return (
        <Container component={'main'} maxWidth={'xs'}>
            <Paper elevation={3}
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {islogin ? (
                    <>
                        <Typography>Login</Typography>
                        <form>
                            <TextField
                                required
                                fullWidth
                                label='Username'
                                margin='normal'
                                variant='outlined'
                            />
                            <TextField
                                required
                                fullWidth
                                label='Password'
                                type='password'
                                margin='normal'
                                variant='outlined'
                            />
                     <Button sx={{ 
                        marginTop: '1rem'
                      }} variant='contained' color='primary' type='submit' fullWidth>
                         Login
                     </Button>
                     <Typography textAlign={'center'} m={"1rem"}>OR</Typography>
                     <Button onClick={togglelogin} sx={{ marginTop: '1rem' }} variant='text' fullWidth>
                         Sign Up Instead
                     </Button>
                        </form>
                    </>
                ) : <h1>Register</h1>}
            </Paper>
        </Container>
    )
}

export default Login