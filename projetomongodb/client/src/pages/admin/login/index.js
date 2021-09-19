import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setNomeUsuario, login, setIdUsuario } from '../../../services/auth';
import api from '../../../services/api';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        NetParts
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
},
form: {
    width: '100%',
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3,0,2),
},
}));

export default function SignIn() {
  const classes = useStyles();

  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  async function handleSubmit(){
      await api.post('/api/usuarios/login', {email, senha})
      .then(res => {
        if(res.status===200){
          if(res.data.status===1){
            login(res.data.token);
            setIdUsuario(res.data.id_client);
            setNomeUsuario(res.data.user_name); 
            
            window.location.href='/admin'

        }else if(res.data.status===2){
          alert('Atenção: '+res.data.error);
        } 
        }else{
          alert('Erro no servidor!');
        }
      })
  }  

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>          
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Digite seu e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Digite sua senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
        </div> 
        <Box mt={8}>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
    </Container>
  );
}
