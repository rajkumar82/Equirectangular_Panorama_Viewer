
import './App.css'
import { Canvas } from '@react-three/fiber'
import EquirectangularPanoramaViewer from './EquirectangularPanoramaViewer'

export default function App() {
  return (
    <Canvas>
      <EquirectangularPanoramaViewer fileName="./R0010121.jpg"></EquirectangularPanoramaViewer>
    </Canvas>
  )
}