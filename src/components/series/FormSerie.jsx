import { useEffect, useState } from "react";
import axios from "axios";
import { StatusList } from "../../utils/constants"

const FormSerie = ({
    formData = {},
    cancel = () => { },
    onSend = (param) => { return param }
}) => {
    const [generos, setGeneros] = useState([])
    const [form, setForm] = useState({
        name: '',
        status: '',
        comments: '',
        poster: '',
        background: '',
        genre_id: '',
        genre_name: '',
    })

    const getGeneros = async () => {
        const response = await axios.get('/api/genres')

        if (response.status === 200) {
            const result = response.data || { data: [] }
            setGeneros(result.data)
        }
    }

    const handelChangeGenero = (event) => {
        const selected = generos.find(item => parseInt(item.id) === parseInt(event.target.value))

        if (!selected) {
            return
        }

        setForm({
            ...form,
            genre_name: selected.name,
            [event.target.name]: event.target.value
        })
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submit = () => {
        onSend({ ...form })
    }

    useEffect(() => {
        getGeneros()
    }, [])

    useEffect(() => {
        setForm({ ...form, ...formData })
    }, [formData])

    return (
        <form>
            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" value={form?.name} onChange={handleChange} required className="form-control " id="name" name="name" placeholder="Nome da Série" />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="genre_id">Genero</label>
                <select className="form-select" id="genre_id" name="genre_id" value={form.genre_id} onChange={handelChangeGenero} required>
                    <option value="" disabled>-- Selecione o Gênero --</option>
                    {
                        generos.map((current, index) => {
                            return <option key={'genero_' + index} value={current.id}>{current.name}</option>
                        })
                    }
                </select>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="comments">Comentários</label>
                <input type="text" maxLength="250" value={form?.comments} name="comments" onChange={handleChange} className="form-control " id="comments" placeholder="Adicione um comentário" />
            </div>
            <br />
            <div className="form-group">
                {
                    StatusList.map((current, index) => {
                        return (
                            <div className="form-check form-check-inline" key={'status_' + index}>
                                <input className="form-check-input" type="radio" name="status" id={current.value} value={current.value} checked={form.status === current.value} onChange={handleChange}/>
                                <label className="form-check-label" htmlFor={current.value}>{current.label}</label>
                            </div>
                        )
                    })
                }

            </div>
            <br />
            <button type="button" className="btn btn-primary mt-2" onClick={submit}>Salvar</button>
            <span>&nbsp;</span>
            <button className="btn btn-danger mt-2" onClick={cancel}>Cancelar</button>
        </form>
    )
}
export default FormSerie;