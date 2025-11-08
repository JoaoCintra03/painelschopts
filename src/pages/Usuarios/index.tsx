import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { validaPermissao, verificaTokenExpirado } from '../../service/token';
import type { IToken } from '../../interfaces/token';

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
}

export const Usuarios = () => {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<IUsuarios[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [token, setToken] = useState<IToken>()

    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [corToast, setCorToast] = useState('')

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        let lsToken = localStorage.getItem('chopts:token')

        let token: IToken | null = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
            setToken(token!)
                 
        }
        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/') 
        }


        setIsLoading(true)
        axios.get('http://localhost:3001/users')
            .then((resposta) => {
                console.log(resposta.data)

                setUsuarios(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const excluirUsuarios = useCallback(async (id: number) => {

        try {

            await axios.delete(`http://localhost:3001/users/${id}`)

            const { data } = await axios.get('http://localhost:3001/users')

            setUsuarios(data)
            setShowToast(true)
            setMessageToast('Usuário deletado com sucesso')
            setCorToast('success')
        } catch (erro) {
            setShowToast(true)
            setMessageToast('Erro ao deletar usuário;(')
            setCorToast('danger')
            console.log(erro)
        }
    }, [])

    return (
        <>
            <Toast
              color={corToast}
              show={showToast}
              message={messageToast}
              onClose={() => {setShowToast(false)}}
            />
            <Loading visible={isLoading} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}
            >
                <h1>Usuarios</h1>
                {
                    validaPermissao(token?.user.permissoes,['admin']) && (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        navigate('/usuarios/cadastrar')
                    }}
                >
                    Adicionar
                </button>
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{ marginRight: 5 }}
                                            onClick={() => {
                                                // navigate('/usu..'+usuario.id)
                                                navigate(`/usuarios/${usuario.id}`)
                                            }}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirUsuarios(usuario.id)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}