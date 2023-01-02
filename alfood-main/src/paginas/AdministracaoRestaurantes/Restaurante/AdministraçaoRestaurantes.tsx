import { Button, TableContainer } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BaseUrl } from '../../../constants/BaseUrl'
import IRestaurante from '../../../interfaces/IRestaurante'
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom'
import { goToEdit, goToNovoRestaurante, goToRestaurant } from '../../../coordinator'
import styles from "../Styles.module.scss"
const AdministraçaoRestaurantes = () => {
    const navigate = useNavigate()
    const [restaurante, setRestaurante] = useState<IRestaurante[]>([])

    const tabelaRestaurante = () => {
        axios.get<IRestaurante[]>(`${BaseUrl}v2/restaurantes/`)
            .then((res) => {
                setRestaurante(res.data)
            })

            .catch((err) => {
                console.log(err)
            })
    }

    const deletar = (restaurantes:IRestaurante) =>{
        axios.delete(`${BaseUrl}v2/restaurantes/${restaurantes.id}/`)
        .then((res) =>{
            const listaRestaurante = restaurante.filter(res => res.id !== restaurantes.id)
            setRestaurante([...listaRestaurante])
            console.log(res)
        })

        .catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() => {
        tabelaRestaurante()
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
                            <Button  color="info" variant='contained' onClick={() => goToNovoRestaurante(navigate) }>Adicionar</Button>
                        </TableCell>
                        <TableCell>
                            <Button  color="info" variant='contained' onClick={() => goToRestaurant(navigate) }>Voltar</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurante.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                           <h2>{restaurante.nome}</h2> 
                        </TableCell>
                        <TableCell className={styles.editar} >
                            {<EditIcon onClick={() => goToEdit(navigate,restaurante.id)}></EditIcon>}
                        </TableCell>
                        <TableCell className={styles.excluir} >
                            {<Button variant='contained' color='error' onClick={() => deletar(restaurante)}>Deletar</Button>}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministraçaoRestaurantes