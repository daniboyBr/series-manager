import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import FormGenero from "./FormGenero";

const EditarGenero = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [name, setName] = useState('')

    const submit = async (generoNome) => {
        const response =  await axios.put(`/api/genres/${params.id}`, { name: generoNome })
        if (response.status === 200) {
           cancelar()
        }
    }

    const cancelar = () => {
        navigate('/generos')
    }

    const getDados = async () => {
        if (!params?.id) {
            return
        }

        const response = await axios.get(`/api/genres/${params.id}`)
        if(response.data?.status && response.data?.status.includes('not found')){
            cancelar()
        }
        setName(response.data.name)
    }

    useEffect(() => {
        getDados()
    }, [params?.id])


    return (
        <div className="container">
            <h1>Editar Gênero</h1>
            <FormGenero generoName={name} onSend={(param) => submit(param.name)} cancel={cancelar} />
        </div>
    )
}

export default EditarGenero;