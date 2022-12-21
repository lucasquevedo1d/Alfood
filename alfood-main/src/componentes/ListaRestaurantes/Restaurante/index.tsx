import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import axios from "axios"

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [prato, setPratos] = useState<IPrato[]>()
  const [prato2, setPrato2]= useState<IPrato[]>()
  const listaPratos = () =>{
    axios.get(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
    .then((res) =>{
      setPratos(res.data)
      console.log(res)
    })

    .catch((err) =>{
      console.log(err)
    })
  }

  useEffect(() =>{
    listaPratos()
  },[restaurante.id])
  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {prato?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante