import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Categorias } from "./pages/Categorias";
import { Usuarios } from "./pages/Usuarios";
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar";
import Login from "./pages/Login";
import { Clientes } from "./pages/Clientes";
import GerenciarClientes from "./pages/Clientes/Gerenciar";

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
                   element={<Clientes />} 
                />

                <Route
                    path="/usuarios/:id"
                    element={<GerenciarClientes />}
                />

                <Route
                    path="*"
                    element={<h1>404</h1>}
                />
            </Routes>
        </BrowserRouter>
    );
};
