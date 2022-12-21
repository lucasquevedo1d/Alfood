import estilos from './Rodape.module.scss';

const NavBar = () => {
  return (<footer className={estilos.Rodape}>
    <div>
      <p>Copyright &copy; {new Date().getFullYear()} Alfood</p>
    </div>
    <div>
      <ul className="social-icons">
        <li><i className="fa fa-facebook"></i></li>
        <li><i className="fa fa-twitter"></i></li>
        <li><i className="fa fa-linkedin"></i></li>
        <li><i className="fa fa-rss"></i></li>
        <li><i className="fa fa-dribbble"></i></li>
      </ul>
    </div>
    <div>
      <p>Uma alegria a cada prato</p>
    </div>
  </footer>)
}

export default NavBar