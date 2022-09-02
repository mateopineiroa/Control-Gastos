import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
  const [mensaje, setMensaje] = useState("")

  const handlePresupuesto = (e) => {
    e.preventDefault()
    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      console.log("No es un numero bro")
      setMensaje("No es un presupuesto valido")
      // setPresupuesto(0)
    } else {
      console.log("Presupuesto agregado...")
      setIsValidPresupuesto(true)
      setMensaje("")
    }
  }
  

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className="campo">
          <label >Definir Presupuesto</label>
          <input 
            type="text"                                                   //Este campo puede ser number
            // value={presupuesto} 
            onChange={(e) => setPresupuesto(e.target.value)}
            className='nuevo-presupuesto' 
            placeholder='Añade tu presupuesto' />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
