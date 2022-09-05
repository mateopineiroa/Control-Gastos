import React from 'react'
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from '../../helpers'

import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

const diccionario = {
  Ahorro:IconoAhorro,
  Comida: IconoComida,
  Casa: IconoCasa,
  Gastos: IconoGastos,
  Ocio: IconoOcio,
  Salud: IconoSalud,
  Suscripciones: IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
  
  const { categoria, nombre, cantidad, fecha, id } = gasto

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>       {/* onClick obligatorio (para la accion del swipe?) */}
        Editar
      </SwipeAction>
    </LeadingActions>  
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>  
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>


      <div className='gasto sombra'>
        <div className="contenido-gasto">
          <img src={diccionario[categoria]} alt="" />     {/* diccionario[categoria] ????? El [] era para arreglos xd */}
          <div className="descripcion-gasto">
            <p className="categoria">{categoria}</p>
            <p className="nombre-gasto">{nombre}</p>
            <p className="fecha-gasto">Agregado el: {formatearFecha(fecha)}</p>
          </div>
        </div>
        <p className="cantidad-gasto">${cantidad}</p>
      </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto
