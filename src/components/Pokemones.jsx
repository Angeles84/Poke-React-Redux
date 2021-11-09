import React from 'react'
// hooks react redux
import {useDispatch, useSelector} from 'react-redux'
// importamos la acción
import {obtenerPokemonsAction , siguientePokeAction , anteriorPokemonAccion,  unPokeDetalleAccion} from '../redux/pokeDucks'
import Detalle from './Detalle'

const Pokemones = () => {

    // declaramos dispach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)
  

    return (
        <div className="container">
            <h1 className="mt-3 mb-2">Lista de Pokemones!</h1>      
            <div className="row mb-5">
              <div className="col-12 col-md-6 pt-3">
                {
                  pokemones.length === 0 && 
                  <button className="btn btn-primary mt-2" onClick={() => dispatch(obtenerPokemonsAction())}>Obtener pokemones</button>
                }
                <ul className="list-group">
                  {
                    pokemones.map(item => (
                      <li key={item.name} className="list-group-item text-capitalize">
                        {item.name}
                        <button 
                          className="btn btn-sm btn-info float-right px-3"
                          onClick={ () => dispatch(unPokeDetalleAccion(item.url)) }
                        >
                            Info
                          </button>
                      </li>
                    ))
                  }
                </ul>
                {
                  previous &&
                  <button className="btn btn-outline-secondary btn-sm mt-2 mr-2" onClick={() => dispatch(anteriorPokemonAccion())}>Anterior</button>   
                }
                {
                  next && 
                  <button className="btn btn-secondary btn-sm mt-2" onClick={() => dispatch(siguientePokeAction())}>Siguiente</button>
                }    
              </div>

              <div className="col-12 col-md-6">
                <h4 className="text-center mt-2"><b>Info de un pokémon</b></h4>
                <Detalle />
              </div>
            </div>
        </div>
    )
}

export default Pokemones