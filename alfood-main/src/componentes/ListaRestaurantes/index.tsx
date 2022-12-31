import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl } from '../../constants/BaseUrl';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputLabel, TextField } from '@mui/material';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
const [verMais, setVerMais] = useState("")
const [verMenos, setVerMenos] = useState("")
const [busca, setBusca] = useState("")
console.log(busca)

  const lista = (index:string, opcoes:AxiosRequestConfig = {}) =>{
    axios.get<IPaginacao<IRestaurante>>(index, opcoes)
    .then((res) =>{
      setRestaurantes(res.data.results)
      setVerMais(res.data.next)
      setVerMenos(res.data.previous)
    })

    .catch((err) =>{
      console.log(err)
    })
  }

  const buscarRestaurantes = (buscar:React.FormEvent<HTMLFormElement>) =>{
    buscar.preventDefault()
   const opcoes={
    params:{

    } as IParametrosBusca
   }

   if(busca){
    opcoes.params.search = busca
   lista(`http://localhost:8000/api/v1/restaurantes/`, opcoes)
  }
  }
  useEffect(() =>{
    lista(`${BaseUrl}v1/restaurantes/`)
  },[])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais bacanas!</h1>
    <form onSubmit={buscarRestaurantes}>
    <TextField variant='standard' value={busca}
     onChange={(event) => {setBusca(event.target.value)}} 
     placeholder="Buscar restaurante"/>
    <Button type='submit' fullWidth>Buscar</Button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {verMais? <button className={style.botaoVer} onClick={() => lista(verMais)} disabled={!verMais}>
      Próxima página
      </button>: <button className={style.botaoVer} onClick={() => lista(verMenos) }disabled={!verMenos}>
        Página anterior
        </button>}
  </section>)
}

export default ListaRestaurantes