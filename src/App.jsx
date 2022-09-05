import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from '../helpers'                  /* Preciso llaves por que no es export default */
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Filtros from './components/Filtros'

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto")) ?? 0)            /* Si hay un presupuesto en local, lo inicializa con ese. Si no, con cero */
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  
  const [gastos, setGastos] = useState( localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [] )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0
    const gastosLS = localStorage.getItem("gastos")
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)       /* app starts when presupuesto is valid */
    }
    console.log("Los elementos son  ",gastosLS)

  }, [])
  
  useEffect( () => {
    localStorage.setItem("presupuesto", presupuesto)                 // Si no esta el presupuesto, se pone cero
  }, [presupuesto])

  useEffect( () => {
    localStorage.setItem("gastos", JSON.stringify(gastos))            /* stringify por que no se pueden guardar arrays, solo strings */
  }, [gastos])

  useEffect( () => {
    if (filtro) {

      const gastosA = gastos.filter( gasto => gasto.categoria === filtro)
      
      setGastosFiltrados(gastosA)
    }
  }, [filtro])


  useEffect( () => {
    if (Object.keys(gastoEditar).length != 0) {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    }
  }, [gastoEditar])

  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])               //...gastos es una copia del arreglo gastos

    }

    
    setAnimarModal(false)
    
    setTimeout(() => {
      setModal(false)
    }, 500);
    
  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
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
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ListadoGastos 
                gastos={filtro ? gastosFiltrados : gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}/>
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
