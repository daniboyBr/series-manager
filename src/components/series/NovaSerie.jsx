import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormSerie from "./FormSerie";

const NovaSerie = () => {
    const navigate = useNavigate()

    const submit = async (generoNome) => {
        const response = await axios.post('/api/series', { name: generoNome })
        if (response.status === 200) {
            cancelar()
        }
    }

    const cancelar = () => {
        navigate('/series')
    }

    return (
        <div className="container">
            <h1>Nova Série</h1>
            <FormSerie onSend={(param) => submit(param.name)} cancel={cancelar} />
        </div>
    )
}

export default NovaSerie;