import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
const [restaurantes2, setRestaurantes2] = useState("")
  const lista = () =>{
    axios.get<IPaginacao<IRestaurante>>("http://localhost:8000/api/v1/restaurantes/")
    .then((res) =>{
      setRestaurantes(res.data.results)
      setRestaurantes2(res.data.next)
    })

    .catch((err) =>{
      console.log(err)
    })
  }

  const verMais = () =>{
    axios.get<IPaginacao<IRestaurante>>(restaurantes2) 
    .then((res) =>{
      setRestaurantes([...restaurantes, ...res.data.results])
      setRestaurantes2(res.data.next)
    })

    .catch((err) =>{
      console.log(err)
    })
  }

  useEffect(() =>{
    lista()
  },[])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {restaurantes2? <button onClick={verMais}>
      Ver mais
      </button>: <button onClick={lista}>Ver menos</button>}
  </section>)
}

export default ListaRestaurantes