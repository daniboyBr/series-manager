import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(resp => {
                const result = resp.data || { data: [] }
                setData(result.data)
            })
    }, [])

    const excluir = (generoId) => {
        axios.delete(`/api/genres/${generoId}`).then(resp => {
            if (resp.status === 200) {
                setData(data.filter(current => {
                    return current.id !== generoId
                }))
            }
        })
    }

    const renderLine = (record, index) => {
        return (
            <tr key={'genre_' + index} >
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link className="btn btn-sm btn-warning" title="Editar" to={`/generos/${record.id}`}>Editar</Link>
                    <span>&nbsp;</span>
                    <button className="btn btn-sm btn-danger" onClick={() => { excluir(record.id) }} title="Excluir">-</button>
                </td>
            </tr>
        )
    }

    const header = () => {
        return (
            <>
                <h1>Gêneros</h1>
                <Link className="btn btn-primary mb-1" to="/generos/novo">Novo Gênero</Link>
            </>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                {header()}
                <div className="alert alert-warning" role="alert">
                    Você não possui gêneros criados!
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            {header()}
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((current, index) => {
                        return renderLine(current, index)
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default Generos;
