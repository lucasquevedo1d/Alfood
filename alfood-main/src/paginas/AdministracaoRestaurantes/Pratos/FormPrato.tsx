import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BaseUrl } from '../../../constants/BaseUrl';
import { goToAdminPagina } from '../../../coordinator';
import { useNavigate, useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ITag from '../../../interfaces/ITag';



const FormPrato = () => {
    const navigate = useNavigate()
    const [nomePrato, setNomePrato] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tag, setTag] = useState<ITag[]>([])
    const [tags, setTags] = useState("")
    const [restaurante, setRestaurante] = useState<IRestaurante[]>([])
    const [restaurantes, setRestaurantes] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const getTags = () =>{
        axios.get(`${BaseUrl}v2/tags/`)
        .then((res) =>{
            setTag(res.data.tags)
            console.log(res.data.tags)
        })
        .catch((err) =>{
            console.log(err)
        })
    }


    const getRestaurantes = () =>{
        axios.get(`${BaseUrl}v2/restaurantes/`)
        .then((res) =>{
            setRestaurante(res.data)
            console.log(res)
        })
        .catch((err) =>{
            console.log(err)
        })
    }


    const OnchangeFile = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files?.length){
            setFile(e.target.files[0])
        }else{
           setFile(null)
        }
    }

   useEffect(() =>{
   getTags()
   getRestaurantes()
   },[])
    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: '50px' }}>
                    <Typography component='h1' variant='h4' sx={{ padding: "10px" }}>Adicionar Prato</Typography>
                    <Box component={'form'} onSubmit={onSubmitForm}>
                        <TextField
                            id="standard-basic"
                            label="Nome do prato"
                            variant="standard"
                            value={nomePrato}
                            onChange={e => setNomePrato(e.target.value)}
                            fullWidth
                        />
                        <TextField 
                        id="standard-basic"
                        label="Descrição"
                        variant="standard"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        fullWidth
                        >
                            Descrição
                        </TextField>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel id='select-id'>Tag</InputLabel>
                            <Select id='select-id' variant="standard" value={tags} onChange={e => setTags(e.target.value)}>
                                {tag.map(index =>
                                    <MenuItem key={index.id} value={index.id}
                                    >
                                    {index.value}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin='dense'>
                            <InputLabel id='select-id'>Restaurante</InputLabel>
                            <Select id='select-id' variant="standard" value={restaurantes} onChange={e => setRestaurantes(e.target.value)}>
                                {restaurante.map(index =>
                                    <MenuItem key={index.id} value={index.id}
                                    >
                                    {index.nome}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                        <input type={'file'} onChange={OnchangeFile}/>
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

export default FormPrato