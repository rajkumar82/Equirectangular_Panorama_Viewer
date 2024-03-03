import './EquirectangularPanoramaViewer.css'
import { Canvas } from '@react-three/fiber'

export default function EquirectangularPanoramaViewer() {

    return (
        <>
            <Canvas>
                <mesh>
                    <sphereGeometry></sphereGeometry>
                    <meshNormalMaterial></meshNormalMaterial>
                </mesh>
            </Canvas>
        </>
    )
}