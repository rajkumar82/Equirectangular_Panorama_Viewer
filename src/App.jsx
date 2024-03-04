
import './App.css'
import { Canvas } from '@react-three/fiber'
import EquirectangularPanoramaViewer from './EquirectangularPanoramaViewer'

function App() {


  return (
    <>
      <Canvas>
        <EquirectangularPanoramaViewer fileName="./R0010121.jpg"></EquirectangularPanoramaViewer>
      </Canvas>
    </>
  )
}

export default App
