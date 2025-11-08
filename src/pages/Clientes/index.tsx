import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { validaPermissao, verificaTokenExpirado } from '../../service/token';
import type { IToken } from '../../interfaces/token';

interface ICliente {
    id: number;
    nomeCompleto: string;
    email: string;
    cidade: string;
}

export const Clientes = () => {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState<ICliente[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [token, setToken] = useState<IToken>()

    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [corToast, setCorToast] = useState('')

    useEffect(() => {

        let lsToken = localStorage.getItem('chopts:token')
        let tokenLocal: IToken | null = null;

        if (typeof lsToken === 'string') {
            tokenLocal = JSON.parse(lsToken)
            setToken(tokenLocal!)
        }

        if (!tokenLocal || verificaTokenExpirado(tokenLocal.accessToken)) {
            navigate('/')
            return
        }

        setIsLoading(true)
        axios.get('http://localhost:3001/clientes')
            .then((resposta) => {
                setClientes(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    const excluirCliente = useCallback(async (id: number) => {

        try {

            await axios.delete(`http://localhost:3001/clientes/${id}`)

            const { data } = await axios.get('http://localhost:3001/clientes')

            setClientes(data)
            setShowToast(true)
            setMessageToast('Cliente deletado com sucesso')
            setCorToast('success')

        } catch (erro) {
            setShowToast(true)
            setMessageToast('Erro ao deletar cliente')
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
              onClose={() => { setShowToast(false) }}
            />

            <Loading visible={isLoading} />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}
            >
                <h1>Clientes</h1>

                {validaPermissao(token?.user.permissoes, ['admin']) && (
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            navigate('/clientes/cadastrar')
                        }}
                    >
                        Adicionar
                    </button>
                )}
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome Completo</th>
                        <th>Email</th>
                        <th>Cidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nomeCompleto}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.cidade}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ marginRight: 5 }}
                                    onClick={() => navigate(`/clientes/${cliente.id}`)}
                                >
                                    <FaPen />
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => excluirCliente(cliente.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
