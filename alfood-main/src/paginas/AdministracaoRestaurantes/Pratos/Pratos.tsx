import { Button, TableContainer } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BaseUrl } from '../../../constants/BaseUrl'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import { goToEdit, goToEditarPrato, goToNovoPrato, goToRestaurant } from '../../../coordinator'
import styles from "../Styles.module.scss"
import IPrato from '../../../interfaces/IPrato'
const Pratos = () => {
    const navigate = useNavigate()
    const [pratos, setPratos] = useState<IPrato[]>([])

    const tabelaPratos = () => {
        axios.get<IPrato[]>(`${BaseUrl}v2/pratos/`)
            .then((res) => {
                setPratos(res.data)
            })

            .catch((err) => {
                console.log(err)
            })
    }

    const deletar = (restaurantes:IPrato) =>{
        axios.delete(`${BaseUrl}v2/pratos/${restaurantes.id}/`)
        .then((res) =>{
            const listaPratos = pratos.filter(res => res.id !== restaurantes.id)
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
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                           <h2>Nome</h2> 
                        </TableCell>
                        <TableCell>
                           <h2>Tag</h2> 
                        </TableCell>
                        <TableCell>
                           <h2>Imagem</h2> 
                        </TableCell>
                        <TableCell>
                            <Button  color="info" variant='contained' onClick={() => goToNovoPrato(navigate) }>Adicionar</Button>
                        </TableCell>
                        <TableCell>
                            <Button  color="info" variant='contained' onClick={() => goToRestaurant(navigate) }>Voltar</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                           <h2>{prato.nome}</h2> 
                        </TableCell>
                        <TableCell>
                           <h2>{prato.tag}</h2> 
                        </TableCell>
                        <TableCell>
                           <a href={prato.imagem} target="_blank">Ver imagem</a> 
                        </TableCell>
                        <TableCell className={styles.editar} >
                            {<EditIcon onClick={() => goToEditarPrato(navigate,prato.id)}></EditIcon>}
                        </TableCell>
                        <TableCell className={styles.excluir} >
                            {<Button variant='contained' color='error' onClick={() => deletar(prato)}>Deletar</Button>}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Pratos