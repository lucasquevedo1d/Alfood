import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BaseUrl } from '../../constants/BaseUrl';
import { goToAdminPagina } from '../../coordinator';
import { useNavigate, useParams } from 'react-router-dom';
import IRestaurante from '../../interfaces/IRestaurante';
import { Box, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';



const FormRestaurante = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [nomeRestaurante, setNomeRestaurante] = useState("")

    const updateRestaurante = () => {
        if (params.id) {
            axios.get<IRestaurante>(`${BaseUrl}v2/restaurantes/${params.id}/`)
                .then((res) => {
                    setNomeRestaurante(res.data.nome)
                })

        }
    }

    useEffect(() => {
        updateRestaurante()
    }, [params])
    const onchangeName = (event: any) => {
        setNomeRestaurante(event.target.value)
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault()

        const body = {
            nome: nomeRestaurante
        }

        if (params.id) {

            axios.put(`${BaseUrl}v2/restaurantes/${params.id}/`, body)
                .then((res) => {
                    alert("Restaurante atualizado com sucesso!")
                    console.log(res)
                })

                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios.post(`${BaseUrl}v2/restaurantes/`, body)
                .then((res) => {
                    alert("Restaurante cadastraddo com sucesso!")
                    console.log(res)
                })

                .catch((err) => {
                    console.log(err)
                })
        }
    }


    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: '50px' }}>
                    <Typography component='h1' variant='h4' sx={{ padding: "10px" }}>Nome do restaurante</Typography>
                    <Box component={'form'} onSubmit={onSubmitForm}>
                        <TextField
                            id="standard-basic"
                            label="Nome do restaurante"
                            variant="standard"
                            value={nomeRestaurante}
                            onChange={onchangeName}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{ marginTop: "10px" }}
                        >
                            salvar
                        </Button>

                        <Button
                            sx={{ marginTop: "10px", marginBottom:"20px" }}
                            variant="outlined"
                            type="submit"
                            onClick={() => goToAdminPagina(navigate)}
                            fullWidth
                        >
                            Voltar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default FormRestaurante