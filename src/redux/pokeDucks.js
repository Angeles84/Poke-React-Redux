import axios from 'axios'

// constantes
const dataInicial = {
  count: 0,
  next: null, 
  previous: null,
  results: []
}

// types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_POKE_NEXT_SUCCESS = 'GET_POKE_NEXT_SUCCESS'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'

// reducer
export default function reducer(state = dataInicial, action){
  switch(action.type) {
    case GET_POKE_SUCCESS:
      return {...state, ...action.payload}
    case GET_POKE_NEXT_SUCCESS:
      return {...state, ...action.payload}
    case POKE_INFO_EXITO:
      return {...state, unPokemon: action.payload}
    default:
      return state
  }
}

// actions
export const obtenerPokemonsAction = () => async (dispatch, getState) => {

  if(localStorage.getItem('offset=0')){
    console.log('existe')
    dispatch({
        type: GET_POKE_NEXT_SUCCESS,
        payload: JSON.parse(localStorage.getItem('offset=0'))
    })
} else {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
      dispatch({
        type: GET_POKE_SUCCESS,
        payload: res.data
      })
      localStorage.setItem('offset=0', JSON.stringify(res.data))
  } catch (error) {
     console.log(error)
  }
 }
}

export const siguientePokeAction = () => async(dispatch, getState) => {

  const next = getState().pokemones.next

  if(localStorage.getItem(next)){
    dispatch({
        type: GET_POKE_NEXT_SUCCESS,
        payload: JSON.parse(localStorage.getItem(next))
    })
} else {
  try {
    const res = await axios.get(next)
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: res.data
    })
    localStorage.setItem(next, JSON.stringify(res.data))

  } catch (error) {
    console.log(error)
  }
 }
 
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {

  const {previous} = getState().pokemones

  if(localStorage.getItem(previous)){
    dispatch({
        type: GET_POKE_NEXT_SUCCESS,
        payload: JSON.parse(localStorage.getItem(previous))
    })
} else {
  try {
    const res = await axios.get(previous)
    dispatch({
        type: GET_POKE_NEXT_SUCCESS,
        payload: res.data
    })
    localStorage.setItem(previous, JSON.stringify(res.data))

  } catch (error) {
    console.log(error)
  }
 }  
}

export const unPokeDetalleAccion = (url) => async (dispatch, getState) => {
  if(url === undefined){
      url = 'https://pokeapi.co/api/v2/pokemon/1/'
  }
  if(localStorage.getItem(url)){
      dispatch({
          type: POKE_INFO_EXITO,
          payload: JSON.parse(localStorage.getItem(url))
      })
      return
  }
  try {
      const res = await axios.get(url)
      // console.log(res.data)
      dispatch({
          type: POKE_INFO_EXITO,
          payload: {
              nombre: res.data.name,
              foto: res.data.sprites.front_default,
              alto: res.data.height,
              ancho: res.data.weight
          }
      })
      localStorage.setItem(url, JSON.stringify({
          nombre: res.data.name,
          foto: res.data.sprites.front_default,
          alto: res.data.height,
          ancho: res.data.weight
      }))

  } catch (error) {
      console.log(error.response)
  }
}