import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from '../components/styled/Styledcomponent';
import { useFileHandler, useInputValidation } from '6pp';
import Usernamevalidator from '../utils/Validator';
import { bgGradient } from '../Constants/Color';
const Login = () => {
    const [islogin, setIslogin] = useState(true)
    const togglelogin = () => {
        setIslogin(prev => !prev)
    }
    const name = useInputValidation('')
    const Bio = useInputValidation('')
    const username = useInputValidation('', Usernamevalidator)
    const password = useInputValidation('')
    const avatar = useFileHandler('single')
    const handlelogin = (e) => {
        e.preventDefault()
    }
    const handlesignup = (e) => {
        e.preventDefault()
    }

    return (
        <div style={{backgroundImage: bgGradient}}>
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
                {islogin ? (
                    <>
                        <Typography>Login</Typography>
                        <form
                            style={{
                                width: '100%',
                                marginTop: '1rem',
                            }}
                            onSubmit={handlelogin}
                        >
                            <TextField
                                required
                                fullWidth
                                label='Username'
                                margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
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
                ) : (
                    <>
                        <Typography>Sign Up</Typography>
                        <form
                            style={{
                                width: '100%',
                                marginTop: '1rem',
                            }}
                            onSubmit={handlesignup}
                        >
                            <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                                <Avatar sx={{
                                    width: '10rem',
                                    height: '10rem',
                                    objectFit: 'contain'
                                }} 
                                src={avatar.preview}
                                />
                                {
                                    avatar.error && (
                                        <Typography color='error' variant='caption'
                                        m={'1rem auto'}
                                        width={'fit-content'}
                                        display={'block'}
                                        >{avatar.error}</Typography>
                                    )
                                }
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        "color": 'white',
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        ":hover": {
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                        }
                                    }}
                                    component="label"
                                >
                                    <>
                                        <CameraAltIcon fontSize='small'/>
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                                    </>
                                </IconButton>
                            </Stack>
                            <TextField
                                required
                                fullWidth
                                label='Name'
                                margin='normal'
                                variant='outlined'
                                value={name.value}
                                onChange={name.changeHandler}
                            />
                            <TextField
                                required
                                fullWidth
                                label='Bio'
                                margin='normal'
                                variant='outlined'
                                value={Bio.value}
                                onChange={Bio.changeHandler}
                            />
                            <TextField
                                required
                                fullWidth
                                label='Username'
                                margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
                            />
                            {
                                username.error && (
                                    <Typography color='error' variant='caption'>{username.error}</Typography>
                                )
                            }

                            <TextField
                                required
                                fullWidth
                                label='Password'
                                type='password'
                                margin='normal'
                                variant='outlined'
                                value={password.value}
                                onChange={password.changeHandler}
                            />
                                                        {
                                password.error && (
                                    <Typography color='error' variant='caption'>{password.error}</Typography>
                                )
                            }


                            <Button sx={{
                                marginTop: '1rem'
                            }} variant='contained' color='primary' type='submit' fullWidth>
                                Sign Up
                            </Button>
                            <Typography textAlign={'center'} m={"1rem"}>OR</Typography>
                            <Button onClick={togglelogin} sx={{ marginTop: '1rem' }} variant='text' fullWidth>
                                Login  Instead
                            </Button>
                        </form>
                    </>

                )}
            </Paper>
        </Container>
        </div>
    )
}

export default Login