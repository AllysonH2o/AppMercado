import React from "react"
import { Link } from "react-router-dom"
import './index.css'

const Login = () => {
    return(
        <><div>
            <h1>Login</h1>
        </div>
        <div>
            <Link to="/gerente">Gerente</Link><br/>
            <Link to="/estoque">Estoque</Link><br/>
            <Link to="/caixa">Caixa</Link>
        </div></>
    )
}

export default Login