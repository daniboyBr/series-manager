import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormSerie from "./FormSerie";

const EditarSerie = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [name, setName] = useState('')

    const submit = async (generoNome) => {
        const response = await axios.put(`/api/series/${params.id}`, { name: generoNome })
        if (response.status === 200) {
            cancelar()
        }
    }

    const cancelar = () => {
        navigate('/series')
    }

    const getDados = async () => {
        if (!params?.id) {
            return
        }

        const response = await axios.get(`/api/series/${params.id}`)
        if (response.data?.status && response.data?.status.includes('not found')) {
            cancelar()
        }
        setName(response.data.name)
    }

    useEffect(() => {
        getDados()
    }, [params?.id])


    return (
        <div className="container">
            <h1>Editar Série</h1>
            <FormSerie generoName={name} onSend={(param) => submit(param.name)} cancel={cancelar} />
        </div>
    )
}

export default EditarSerie;