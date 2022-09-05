import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, eliminarGasto}) => {

  const [mensaje, setMensaje] = useState("")
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState(0)
  const [categoria, setCategoria] = useState("")
  const [fecha, setFecha] = useState("")
  const [id, setId] = useState("")

  useEffect( () => {
    if ( Object.keys(gastoEditar).length != 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios")
      console.log("Hay algun campo vacio")
      
      setTimeout(() => {
        setMensaje("")
      }, 500);
    }
    guardarGasto({nombre, cantidad, categoria, id, fecha })
  }

  const ocultarModal = () => {
    setAnimarModal(false)
    
    setTimeout(() => {
      setModal(false)
    }, 500);
  }


  return (
    <div className='modal'>
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>
      <form 
        className={`formulario ${ animarModal ? "animar": 'cerrar'}`}
        onSubmit={handleSubmit}
        >
        <legend>{gastoEditar.nombre? "Editar gasto":"Nuevo gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label 
            htmlFor="nombre"
            >Nombre Gasto</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre}
            onChange={ e => setNombre(e.target.value) }
            placeholder="Añade el nombre del gasto" />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input 
            type="number" 
            id="cantidad" 
            value={cantidad}
            onChange={ e => setCantidad(Number(e.target.value)) }     /* Si pongo Number() despues funciona el includes("")??? */
            placeholder="Añade la cantidad del gasto" />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select 
            id="categoria"
            value={categoria}
            onChange={ e => setCategoria(e.target.value)}
            >
              <option value="">-- Seleccione --</option>
              <option value="Ahorro">Ahorro</option>
              <option value="Comida">Comida</option>
              <option value="Casa">Casa</option>
              <option value="Gastos">Gastos Varios</option>
              <option value="Ocio">Ocio</option>
              <option value="Salud">Salud</option>
              <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.nombre? "Guardar cambios":"Añadir gasto"} />
      </form>
    </div>
  )
}

export default Modal
