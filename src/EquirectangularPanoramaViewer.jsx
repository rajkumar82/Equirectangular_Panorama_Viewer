/* eslint-disable react/no-unknown-property */

import { useRef, Suspense } from 'react'
import { useLoader, extend, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import './EquirectangularPanoramaViewer.css'

extend({ OrbitControls })

function Controls(props) {
    const { camera, gl } = useThree()
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />
}

export default function EquirectangularPanoramaViewer() {
    
    const colorMap = useLoader(TextureLoader, './R0010121.jpg')
    colorMap.colorSpace = 'srgb'

    return (
        <>
            <Controls enableZoom={true} enablePan={false} />
            <Suspense fallback={null}>
                <mesh>
                    <sphereGeometry attach="geometry" args={[100, 32, 32]} />
                    <meshBasicMaterial attach="material" map={colorMap} side={THREE.BackSide} />
                </mesh>
            </Suspense>
        </>
    )
}