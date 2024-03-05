/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './EquirectangularPanoramaViewer.css'
import { useState } from 'react'

export default function EquirectangularPanoramaViewer({ fileName }) {

    const [meshes, setMeshes] = useState([{
        position: [0, 0, 0]
    }]);

    const colorMap = useLoader(TextureLoader, fileName)
    colorMap.colorSpace = 'srgb'

    useFrame((state, delta) => {
        delta;
    })

    const clickEventHandler = (event) => {
        console.log(event.point);

        const newMeshes = [...meshes];

        newMeshes.push({ position: event.point });
        setMeshes(newMeshes)
    }

    const doubleClickEventHandler = (event) => {
        event;
    }

    doubleClickEventHandler;

    return (
        <>
            <OrbitControls />

            <mesh onClick={clickEventHandler}>
                <sphereGeometry args={[800, 100, 100]} />
                <meshBasicMaterial map={colorMap} side={THREE.BackSide} />
            </mesh>

            {meshes.map((mesh, index) => (
                <mesh key={index} position={mesh.position}>
                    <sphereGeometry args={[120, 16, 16]} />
                    <meshPhysicalMaterial
                                transmission={1}
                                roughness={0.4}
                            />
                </mesh>
            ))}
        </>
    )
}