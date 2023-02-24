import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";
import FormSerie from "./FormSerie";
import { Mode, Status } from "../../utils/constants"


const EditarSerie = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [data, setData] = useState({})
    const [mode, setMode] = useState(Mode.INFO)

    const submit = async (formData) => {
        const response = await axios.put(`/api/series/${params.id}`, formData)
        if (response.status === 200) {
            setMode(Mode.INFO)
            getDados()
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
        setData(response.data)
    }

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const satusBadge = () => {
        if(data.status === Status.WATCHED){
            return <Badge color="success">Assistido</Badge>
        }

        if(data.status === Status.WATCHING){
            return <Badge color="info">Assistindo</Badge>
        }

        return <Badge color="warning">Para Assistir</Badge>
    }

    useEffect(() => {
        getDados()
    }, [params?.id])


    return (
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{ background: 'rgb(0,0,0,0.7)' }}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3 text-center">
                                <img className="img-fluid img-thumbnail" src={data.poster} alt="serie-poster" />
                                <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => setMode(Mode.EDIT)}>Editar</button>
                            </div>
                            <div className="col-8">
                                <h1 className="font-weight-light text-white">{data.name}</h1>
                                <div className="lead text-light">
                                    {satusBadge()} <br/>
                                    <strong>Gênero:</strong> {data.genre_name} <br />
                                    <strong>Comentários:</strong><br />
                                    <p className="text-wrap">{data.comments}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {mode === Mode.EDIT &&
                <div className="container">
                    <h1>Editar Série</h1>
                    <FormSerie formData={data} onSend={(formData) => submit(formData)} cancel={() => setMode(Mode.INFO)} />
                </div>
            }
        </div>
    )
}

export default EditarSerie;