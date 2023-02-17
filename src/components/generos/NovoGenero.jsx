import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormGenero from "./FormGenero";

const NovoGenero = () => {
    const navigate = useNavigate()

    const submit = async (generoNome) => {
        const response = await axios.post('/api/genres', { name: generoNome })
        if (response.status === 200) {
            cancelar()
        }
    }

    const cancelar = () => {
        navigate('/generos')
    }

    return (
        <div className="container">
            <h1>Novo Gênero</h1>
            <FormGenero onSend={(param) => submit(param.name)} cancel={cancelar} />
        </div>
    )
}

export default NovoGenero;