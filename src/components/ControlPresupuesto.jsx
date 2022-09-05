import React from 'react'
import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({presupuesto, gastos}) => {
  
  const [disponible, setDisponible] = useState(presupuesto)
  const [gastado, setGastado] = useState(0)
  const [ porcentaje, setPorcentaje ] = useState(0)
  const [color, setColor] = useState("#3B82F6")
  

  useEffect( () => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)         /* total reference var. iniciate in 0 */

    const totalDisponible = presupuesto - totalGastado

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setTimeout( () => {
      setPorcentaje((totalDisponible*100/presupuesto).toFixed(1))
    }, 1500)
    console.log(totalDisponible*100/presupuesto)
  }, [gastos])

  const formatearCantidad = ( cantidad ) => {
    return Number(cantidad).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })
  }
  
  useEffect( () => {
    if (gastado > presupuesto) setColor("red")
    else setColor("#3B82F6")
  }, [gastado])


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar 
        styles={buildStyles({
          pathColor: `${color}`,
          trailColor: "#F5F5F5",
          textColor: "#3B82F6",
        })}
          value={porcentaje}
          text={`${porcentaje}% Restante`}
        />
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
