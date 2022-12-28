import axios from 'axios';
import { useEffect, useState } from 'react';
import { BaseUrl } from '../../constants/BaseUrl';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
const [verMais, setVerMais] = useState("")
const [verMenos, setVerMenos] = useState("")

  const lista = (index:string) =>{
    axios.get<IPaginacao<IRestaurante>>(index)
    .then((res) =>{
      setRestaurantes(res.data.results)
      setVerMais(res.data.next)
      setVerMenos(res.data.previous)
    })

    .catch((err) =>{
      console.log(err)
    })
  }

  // const ver = () =>{
  //   axios.get<IPaginacao<IRestaurante>>("") 
  //   .then((res) =>{
  //     setRestaurantes([...restaurantes, ...res.data.results])
  //     setVerMais(res.data.next)
  //     setVerMenos(res.data.previous)
  //   })

  //   .catch((err) =>{
  //     console.log(err)
  //   })
  // }

  useEffect(() =>{
    lista(`${BaseUrl}v1/restaurantes/`)
  },[])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais bacanas!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {verMais? <button className={style.botaoVer} onClick={() => lista(verMais)} disabled={!verMais}>
      Próxima página
      </button>: <button className={style.botaoVer} onClick={() => lista(verMenos) }disabled={!verMenos}>
        Página anterior
        </button>}
  </section>)
}

export default ListaRestaurantes