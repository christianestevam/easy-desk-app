import './Sidebar.css';
import logo_verde from "../../assets/Logotipo_verde.svg";
import ico1green from "../../assets/ico1-green.svg";
import ico1gray from "../../assets/ico1-gray.svg";
import ico2green from "../../assets/ico2-green.svg";
import ico2gray from "../../assets/ico2-gray.svg";
import ico3green from "../../assets/ico3-green.svg";
import ico3gray from "../../assets/ico3-gray.svg";
import ico4green from "../../assets/ico4-green.svg";
import ico4gray from "../../assets/ico4-gray.svg";
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <img src={logo_verde} alt="logo" className="sidebar-logo" />

      <ul>
        <li className={location.pathname === '/orders' ? 'active' : ''}>
          <Link to="/orders">
            <img
              src={location.pathname === '/orders' ? ico1green : ico1gray}
              alt="dashboard-icon"
              className="sidebar-icon"
            />
            Pedidos
          </Link>
        </li>
        <li className={location.pathname === '/menu' ? 'active' : ''}>
          <Link to="/menu">
            <img
              src={location.pathname === '/menu' ? ico2green : ico2gray}
              alt="menu-icon"
              className="sidebar-icon"
            />
            Cardápio
          </Link>
        </li>


        <li className={location.pathname === '/tables' ? 'active' : ''}>
          <Link to="/tables">
            <img
              src={location.pathname === '/tables' ? ico4green : ico4gray}
              alt="table-icon"
              className="sidebar-icon"
            />
            Mesas
          </Link>
        </li>


        <li className={location.pathname === '/config' ? 'active' : ''}>
          <Link to="/config">
            <img
              src={location.pathname === '/config' ? ico3green : ico3gray}
              alt="config-icon"
              className="sidebar-icon"
            />
            Configurações
          </Link>
        </li>
      </ul>

      <Link to="/" className='sidebar-logout-button'>Sair da conta</Link>
    </nav>
  );
}

export default Sidebar;