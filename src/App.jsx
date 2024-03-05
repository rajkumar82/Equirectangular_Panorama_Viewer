
import './App.css'
import { Canvas } from '@react-three/fiber'
import EquirectangularPanoramaViewer from './EquirectangularPanoramaViewer'
import Toolbar from './Toolbar.jsx'
import { useState } from 'react'

export default function App() {

  const [currentState,setCurrentState] = useState('none');

  const changeState = (newState=>{
    setCurrentState(newState);
  })

  return (
    <>
      <Toolbar currentState={currentState} changeState={changeState}></Toolbar>

      <Canvas>
        <EquirectangularPanoramaViewer fileName="./R0010121.jpg"  currentState={currentState}></EquirectangularPanoramaViewer>
      </Canvas>
    </>
  )
}