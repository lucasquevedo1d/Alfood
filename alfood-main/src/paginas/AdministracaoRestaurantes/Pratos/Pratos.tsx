import { Button, TableContainer } from '@mui/material'
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
import styles from "../Styles.module.scss"
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
    )
}

export default Pratos