import { useEffect, useState } from "react";

const FormSerie = ({
    generoName = '',
    cancel = () => { },
    onSend = (param) => { return param }
}) => {
    const [name, setName] = useState('')
    const [isValid, setIsValid] = useState(true)
    const isInvalidField = isValid ? '' : 'is-invalid'

    useEffect(() => {
        setName(generoName)
    }, [generoName])

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const submit = () => {
        if (name.trim().length === 0) {
            setIsValid(false)
            return
        }
        setIsValid(true)

        onSend({name})
    }

    const showValidationMessage = () => {
        if (isValid) {
            return ''
        }

        return (
            <div className="invalid-feedback">
                Campo nome é obrigatório
            </div>
        )
    }

    
    return (
        <form>
            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" value={name} onChange={handleChange} required className={"form-control " + isInvalidField} id="name" placeholder="Nome da Série" />
                {showValidationMessage()}
            </div>
            <button type="button" className="btn btn-primary mt-2" onClick={submit}>Salvar</button>
            <span>&nbsp;</span>
            <button className="btn btn-danger mt-2" onClick={cancel}>Cancelar</button>
        </form>
    )
}
export default FormSerie;