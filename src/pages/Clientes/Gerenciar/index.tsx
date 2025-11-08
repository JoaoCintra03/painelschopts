import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarClientes() {

    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false)

    useEffect(() => {
        const idCliente = Number(id)

        if (!isNaN(idCliente)) {
            setIsEditar(true)

            axios.get(`http://localhost:3001/clientes/${idCliente}`)
                .then(({ data }) => {
                    Object.keys(data).forEach((campo) => {
                        if (refForm.current[campo] !== undefined) {
                            refForm.current[campo].value = data[campo]
                        }
                    })
                })
                .catch(console.log)
        }

    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const formData = new FormData(refForm.current);
            const objSalvar = Object.fromEntries(formData.entries());

            if (isEditar) {
                axios.put('http://localhost:3001/clientes/' + id, objSalvar)
                    .then(() => {
                        alert('Cliente editado com sucesso.')
                        navigate('/clientes')
                    })
            } else {
                axios.post('http://localhost:3001/clientes', objSalvar)
                    .then(() => {
                        alert('Cliente cadastrado com sucesso!')
                        navigate('/clientes')
                    })
                    .catch(() => alert('Erro ao salvar cliente'))
            }

        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [isEditar, id])

    return (
        <>
            <h1>Cliente</h1>

            <form
                noValidate
                className="needs-validation g-3 row"
                ref={refForm}
                onSubmit={submitForm}
            >
                <div className="col-md-12">
                    <label>Nome Completo</label>
                    <input id="nomeCompleto" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>CPF</label>
                    <input id="cpf" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Data de Nascimento</label>
                    <input type="date" id="dataNascimento" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Email</label>
                    <input type="email" id="email" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Telefone</label>
                    <input id="telefone" className="form-control" required />
                </div>

                <div className="col-md-12">
                    <label>Logradouro</label>
                    <input id="logradouro" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Número</label>
                    <input id="numero" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Bairro</label>
                    <input id="bairro" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Cidade</label>
                    <input id="cidade" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label>Estado</label>
                    <input maxLength={2} id="estado" className="form-control" required />
                </div>

                <div className="col-md-12">
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/clientes')}>
                        Voltar
                    </button>

                    <button className="btn btn-primary" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </>
    )
}
