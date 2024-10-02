import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import Login from './pages/Login/index.jsx'
import Gerente from './pages/Gerente/index.jsx'
import Caixa from './pages/Caixa/index.jsx'
import Estoque from './pages/Estoque/index.jsx'
import Produto from './pages/Produto/produto.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "gerente",
    element: <Gerente />,
  },
  {
    path: "Caixa",
    element: <Caixa />,
  },
  {
    path: "Estoque",
    element: <Estoque />,
  },
  {
    path: "Produto",
    element: <Produto />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
