import React, { useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import clearJwt from "../../services/ClearJwt";
import logo from "../../assets/Logotipo.svg";
import figure from "../../assets/Coffee shop-bro 1.png";

function App() {

  useEffect(() => {
    clearJwt();
  }, []);

  return (
    <div className="landing-page">
      <div className="lp-left">
        <img src={figure} alt="figure" className="lp-figure" />
        <img src={logo} alt="logo" className="lp-logo" />
      </div>

      <div className="lp-right">
        <div className="lp-content-1">
          <h2 className="lp-title">
            Mude a maneira que você <br/> gerencia seus pedidos.
          </h2>
          <Link to="/register">
            <button className="lp-button-1">Crie sua conta</button>
          </Link>
        </div>

        <div className="lp-content-2">
          <h2 className="lp-title">Já possui cadastro?</h2>
          <Link to="/login">
            <button className="lp-button-2">Fazer login</button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default App;