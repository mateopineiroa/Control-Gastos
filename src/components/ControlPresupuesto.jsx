import React from 'react'
import { useEffect, useState } from 'react'


const ControlPresupuesto = ({presupuesto, gastos}) => {
  
  const [disponible, setDisponible] = useState(presupuesto)
  const [gastado, setGastado] = useState(0)

  useEffect( () => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)         /* total reference var. iniciate in 0 */

    const totalDisponible = presupuesto - totalGastado

    setGastado(totalGastado)
    setDisponible(totalDisponible)
  }, [gastos])

  const formatearCantidad = ( cantidad ) => {
    return Number(cantidad).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })
  }
  
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <p>Grafica aqui</p>
      </div>
      <div className="contenido-presupuesto">
        <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
        <p><span>Disponible: </span>{formatearCantidad(disponible)}</p>
        <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
