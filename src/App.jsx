import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from '../helpers'                  /* Preciso llaves por que no es export default */
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  
  const [gastos, setGastos] = useState([])

  const [gastoEditar, setGastoEditar] = useState({})

  useEffect( () => {
    if (Object.keys(gastoEditar).length != 0) {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);


    }
  }, [gastoEditar])

  const guardarGasto = gasto => {
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])               //...gastos es una copia del arreglo gastos

    setAnimarModal(false)
    
    setTimeout(() => {
      setModal(false)
    }, 500);

  }

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  return (
    <div className={modal ? "fijar" : ""}>        {/* Equivale a modal && "fijar" (? */}
      <Header 
        gastos={gastos}
        presupuesto={presupuesto} 
        setPresupuesto={setPresupuesto} 
        isValidPresupuesto={isValidPresupuesto} 
        setIsValidPresupuesto={setIsValidPresupuesto}
        guardarGasto={guardarGasto}/>

        { isValidPresupuesto && (
          <>
            <main>
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}/>
            </main>
            <div className='nuevo-gasto'>
              <img 
                src={IconoNuevoGasto} 
                alt="Icono nuevo gasto" 
                onClick={handleNuevoGasto}
                />
            </div>
          </>
        )}
        {/* {isValidPresupuesto ? (

        ) : null} */}               {/* null para no poner html innecesario. (Forma alternativa al &&) */}

        {modal && 
          <Modal 
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
          />}
    </div>
  )
}

export default App
