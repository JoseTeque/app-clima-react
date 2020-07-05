import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({setbusqueda, busqueda, setconsultar}) => {

    const [error, seterror] = useState(false)

    const {ciudad, pais} = busqueda;

    const handleChange = e => {
        e.preventDefault();
        setbusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if(ciudad.trim() === '' || pais === ''){
            
            setTimeout(() => {
                seterror(true);
                setTimeout(() => {
                    seterror(false);
                },4000)
            },50)
            
            return;
        }

        setconsultar(true);

    }

    return ( 
        <form 
            onSubmit={handleSubmit}
        >
        {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                    value={ciudad}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select 
                    name="pais" 
                    id="pais"  
                    onChange={handleChange}
                    value={pais}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="CL">Chile</option>
                    <option value="VZ">Venezuela</option>
                </select>
                <label htmlFor="pais">Pais: </label>
            </div>
            <div className="input-field col 12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                >
                    Buscar Clima
                </button> 

            </div>
        </form>
     );
}
 
Formulario.propTypes = {
    setbusqueda: PropTypes.func.isRequired,
    busqueda:PropTypes.object.isRequired,
    setconsultar: PropTypes.func.isRequired
    
}
export default Formulario;