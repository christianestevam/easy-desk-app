import "../styles/App.css";

import { Link } from "react-router-dom";

import logo from "../assets/Logotipo_verde.svg";
import figure from "../assets/Coffee shop-bro 1.png";
import bgfooter from "../assets/Vector.png";
import bgfooter2 from "../assets/Vector-1.png";

function App() {
  return (
    <div className="landing-page">
      <div className="lp-left">
        <img src={logo} alt="logo" className="lp-logo" />
        <img src={figure} alt="figure" className="lp-figure" />
        <img src={bgfooter} alt="bg-footer" className="lp-bgfooter" />
        <img src={bgfooter2} alt="bg-footer1" className="lp-bgfooter2" />
      </div>

      <div className="lp-right">
        <h2 className="lp-title">
          Mude a maneira que você gerencia seus pedidos.
        </h2>

        <div>
          <Link to="/register">
            <button className="lp-button">Quero me inscrever</button>
          </Link>
          <br />
          <span>Já é cliente? </span>
          <Link to="/login" className="lp-login">
            Entrar
          </Link>
        </div>

        <a className="lp-terms" href="/">
          Termos e condições
        </a>
      </div>
    </div>
  );
}

export default App;
