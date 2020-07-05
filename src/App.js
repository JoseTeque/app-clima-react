import React, {Fragment, useState, useEffect} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima.js';
import Error from './componentes/Error.js';


function App() {

    const [busqueda, setbusqueda] = useState({
        ciudad:'',
        pais:''
    });

    const [consultar, setconsultar] = useState(false);
    const [resultado, setresultado] = useState({});
    const [error, seterror] = useState(false);

    const {ciudad, pais}  = busqueda;

    useEffect(() => {
     
        const ConsultaApi = async() => {
          if(consultar){
            const ApiId = '42f1314e4d820ef8abf402b554c98687'
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${ApiId}`
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            
            setresultado(resultado);
            setconsultar(false);

            if(error){
              seterror(true);
            }else{
              seterror(false);
            }
          }
        }
        ConsultaApi();
      
    }, [consultar, ciudad, pais, error])

    let componente;

    if(resultado.cod === "404"){

        componente = <Error mensaje = "No hay Resultados" />
      
    }else {
      componente = <Clima resultado={resultado}  />
    }

  return (
   <Fragment>
      <Header
        titulo = "Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                setbusqueda= {setbusqueda}
                busqueda = {busqueda}
                setconsultar = {setconsultar}
              /> 
            </div>
            <div className="col m6 s12">
              {componente}
            </div>

          </div>

        </div>

      </div>
   </Fragment>
  );
}

export default App;
