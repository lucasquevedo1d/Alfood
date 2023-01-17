import { Box, Button, Container, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BaseUrl } from '../../../constants/BaseUrl'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom'
import { goToEditarPrato, goToNovoPrato, goToRestaurant } from '../../../coordinator'
import styles from "./Styles.module.scss"
import IPrato from '../../../interfaces/IPrato'
const Pratos = () => {
    const navigate = useNavigate()
    const [pratos, setPratos] = useState<IPrato[]>([])

    const params = useParams()
    const tabelaPratos = () => {
        axios.get<IPrato[]>(`${BaseUrl}v2/pratos/`)
            .then((res) => {
                setPratos(res.data)
            })

            .catch((err) => {
                console.log(err)
            })
    }

    const deletar = (prato:IPrato) =>{
        axios.delete(`${BaseUrl}v2/pratos/${prato.id}/`)
        .then((res) =>{
            const listaPratos = pratos.filter(res => res.id !== prato.id)
            setPratos([...listaPratos])
            console.log(res)
        })

        .catch((err) =>{
            console.log(err)
        })
    }


    useEffect(() => {
        tabelaPratos()

    }, [])
    return (
        <Container maxWidth="lg"  sx={{ mt: 3 }}>
        <Paper sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: '50px',  }}>
            <Typography component='h1' variant='h2' sx={{ padding: "10px", marginLeft:"-40px", backgroundColor:"primary" }}>Pratos</Typography>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                           <h4>Nome</h4> 
                        </TableCell>
                        <TableCell>
                           <h4>Tag</h4> 
                        </TableCell>
                        <TableCell>
                           <h4>Imagem</h4> 
                        </TableCell>
                        <TableCell>
                            <button className={styles.botao} onClick={() => goToNovoPrato(navigate) }>Adicionar</button>    
                        </TableCell>
                        <TableCell>
                            <button className={styles.botao} onClick={() => goToRestaurant(navigate) }>Voltar</button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                           <p>{prato.nome}</p> 
                        </TableCell>
                        <TableCell>
                           <p>{prato.tag}</p> 
                        </TableCell>
                        <TableCell>
                           <a href={prato.imagem} target="_blank">Ver imagem</a> 
                        </TableCell>
                        <TableCell className={styles.editar} >
                            {<EditIcon onClick={() => goToEditarPrato(navigate,prato.id)}></EditIcon>}
                        </TableCell>
                        <TableCell className={styles.excluir} >
                            {<DeleteIcon onClick={() => deletar(prato)}/>}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        </Paper>
        </Container>
    )
}

export default Pratos