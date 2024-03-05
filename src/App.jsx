
import './App.css'
import { Canvas } from '@react-three/fiber'
import EquirectangularPanoramaViewer from './EquirectangularPanoramaViewer'
import Toolbar from './Toolbar.jsx'

export default function App() {
  return (
    <>
      <Toolbar></Toolbar>

      <Canvas>
        <EquirectangularPanoramaViewer fileName="./R0010121.jpg"></EquirectangularPanoramaViewer>
      </Canvas>
    </>
  )
}