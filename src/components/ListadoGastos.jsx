import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto}) => {
  return (
    <div className='contenedor listado-gastos'>
      <h2>{ gastos.length ? "Gastos" : "No hay gastos xd"}</h2>

      {gastos.map( gasto =>                         /* Si no pongo el {}, el return queda implícito. Si pongo {} tengo que poner return <Gasto /> */
          (<Gasto 
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}/>
        )
      )}

    </div>
  )
}

export default ListadoGastos
