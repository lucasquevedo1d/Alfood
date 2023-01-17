import { useNavigate } from 'react-router-dom'
import { goToAdminPagina, goToPratos, goToRestaurant } from '../../coordinator'
import styles from './Styles.module.scss'
import Banner from '../../componentes/Banner'
import NavBar from '../../componentes/NavBar';
const AdmPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <NavBar/>
      <Banner />
      <div className={styles.containerAdmPage}>
       
          <button className={styles.botao1} onClick={() => goToAdminPagina(navigate)}>Restaurantes</button>
          <button className={styles.botao2} onClick={() => goToPratos(navigate)}>Pratos</button>
      

      </div>
      
    </div>
  )
}

export default AdmPage