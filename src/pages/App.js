import "../styles/App.css";

//todo_ 

import { Link } from "react-router-dom";

function App(){
  return (
    <div>
      <button className="app-login-btn">
        <Link to="/login">Login</Link>
      </button>

      <button className="app-register-btn">
        <Link to="/register">Registrar-se</Link>
      </button>

      <button className="app-dashboard-btn">
        <Link to="/dashboard">Dashboard</Link>
      </button>
    </div>
  );
}

export default App;