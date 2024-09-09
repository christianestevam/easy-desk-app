import '../styles/Sidebar.css';
import logo_verde from "../assets/Logotipo_verde.svg";
import sb1 from "../assets/sb-1.svg";
import sb2 from "../assets/sb-2.svg";
import sb3 from "../assets/sb-3.svg";
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Obtém a localização atual

  return (
    <nav className="sidebar">
      <img src={logo_verde} alt="logo" className="sidebar-logo" />

      <ul>
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <img src={sb1} alt="dashboard-icon" className="sidebar-icon" />
            Pedidos
          </Link>
        </li>
        <li className={location.pathname === '/menu' ? 'active' : ''}>
          <Link to="/menu">
            <img src={sb2} alt="menu-icon" className="sidebar-icon" />
            Cardápio
          </Link>
        </li>
        <li className={location.pathname === '/config' ? 'active' : ''}>
          <Link to="/config">
            <img src={sb3} alt="config-icon" className="sidebar-icon" />
            Configurações
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
