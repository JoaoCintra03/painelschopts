import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar"
import Login from "./pages/Login"
import GerenciarClientes from "./pages/Clientes/Gerenciar"
import { Clientes } from "./pages/Clientes"

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/categorias/:id"
                    element={<Categorias />}
                />
                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />
                <Route
                    path="/usuarios/:id"
                    element={<GerenciarUsuarios />}
                />

                <Route 
                path="/clientes" 
                element={<Clientes />} />

                <Route 
                path="/clientes/cadastrar" 
                element={<GerenciarClientes />} />

                <Route 
                path="/clientes/:id"
                element={<GerenciarClientes />} />
                <Route
                    path="*"
                    element={<h1>404</h1>}
                />
            </Routes>
        </BrowserRouter>
    )
}