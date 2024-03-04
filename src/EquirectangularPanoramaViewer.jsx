/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */


import { useLoader, } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import * as THREE from 'three'
import './EquirectangularPanoramaViewer.css'



export default function EquirectangularPanoramaViewer({fileName}) {

    const colorMap = useLoader(TextureLoader, fileName)
    colorMap.colorSpace = 'srgb'

    return (
        <>
            <mesh>
                <sphereGeometry attach="geometry" args={[800, 100, 100]} />
                <meshBasicMaterial attach="material" map={colorMap}  side={THREE.DoubleSide} />
            </mesh>
        </>
    )
}