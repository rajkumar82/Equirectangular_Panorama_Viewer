
import './App.css'
import { Canvas } from '@react-three/fiber'
import EquirectangularPanoramaViewer from './EquirectangularPanoramaViewer'

function App() {


  return (
    <>
      <Canvas>
        <EquirectangularPanoramaViewer></EquirectangularPanoramaViewer>
      </Canvas>
    </>
  )
}

export default App
