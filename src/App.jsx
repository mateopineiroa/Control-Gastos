import { useState } from 'react'
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

  
  const guardarGasto = gasto => {
    gasto.id = generarId()
    setGastos([...gastos, gasto])               //...gastos es una copia del arreglo gastos

    setAnimarModal(false)
    
    setTimeout(() => {
      setModal(false)
    }, 500);

  }

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  return (
    <div>
      <Header 
        presupuesto={presupuesto} 
        setPresupuesto={setPresupuesto} 
        isValidPresupuesto={isValidPresupuesto} 
        setIsValidPresupuesto={setIsValidPresupuesto}
        guardarGasto={guardarGasto}/>

        { isValidPresupuesto && (
          <>
            <main>
              <ListadoGastos 
                gastos={gastos}/>
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
          />}
    </div>
  )
}

export default App
