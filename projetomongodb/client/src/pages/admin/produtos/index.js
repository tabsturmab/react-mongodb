import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../../services/api';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function ProdutosListagem() {
  const classes = useStyles();

  const [produtos, setProdutos] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    async function loadProdutos(){
      const response = await api.get("/api/produtos");
      setProdutos(response.data)
      setLoading(false);
    }
    loadProdutos();
  },[]);

    async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este produto")){
      var result = await api.delete('/api/produtos/'+id);
      if(result.status===200){
        window.location.href = '/admin/produtos';
      }else{
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/produtos/cadastrar'}>
              <AddIcon />
              Cadastrar
            </Button>
            <Paper className={classes.paper}>
        <h1>Listagem de Produtos</h1>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>
                {loading?(<LinearProgress style={{width:'50%', margin:'20px auto'}}/>):(
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Part Number</TableCell>
                          <TableCell align="center">Descri????o</TableCell>
                          <TableCell align="center">Pre??o</TableCell>
                          <TableCell align="center">Qtd Produto</TableCell>
                          <TableCell align="right">Op????es</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {produtos.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">{row.partnumber_produto}</TableCell>
                            <TableCell align="center">{row.descricao_produto}</TableCell>
                            <TableCell align="center">{row.preco_produto}</TableCell>
                            <TableCell align="center">{row.qtd_produto}</TableCell>
                            <TableCell align="right">
                            <ButtonGroup aria-label="outlined primary button group">
                              <Button variant="contained" color="primary" href={'/admin/produtos/editar/'+row._id}><AutorenewIcon /> Atualizar</Button>
                              <Button variant="contained" color="secondary" onClick={() => handleDelete(row._id)}><ClearIcon /></Button>
                            </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>)}
                  </TableContainer>
                </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}