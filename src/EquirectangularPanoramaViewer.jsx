/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useLoader, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import './EquirectangularPanoramaViewer.css'

import { OrbitControls } from '@react-three/drei'


export default function EquirectangularPanoramaViewer({ fileName, currentState }) {


    useFrame((state, delta) => {
        //console.log(delta)
        delta;

    })

    const meshRef = useRef();


    const [meshes, setMeshes] = useState([

    ]);

    const colorMap = useLoader(TextureLoader, fileName)
    colorMap.colorSpace = 'srgb'

    //const [isDragging, setIsDragging] = useState(false);
    //const [previousMousePosition, setPreviousMousePosition] = useState([0, 0]);

    // const handleMouseDown = (event) => {
    //     setIsDragging(true);
    //     setPreviousMousePosition([event.clientX, event.clientY]);
    // };

    // const handleMouseUp = () => {
    //     setIsDragging(false);
    // };

    // const handleMouseMove = (event) => {



    //     if (isDragging) {
    //         const deltaMousePosition = [
    //             event.clientX - previousMousePosition[0],
    //             event.clientY - previousMousePosition[1]
    //         ];

    //         meshRef.current.rotation.y += deltaMousePosition[0] * 0.01;
    //         meshRef.current.rotation.x += deltaMousePosition[1] * 0.01;

    //         setPreviousMousePosition([event.clientX, event.clientY]);
    //     }
    // };

    const clickEventHandler = (event) => {


        console.log(meshes.length);

        if (currentState === 'blur' && event.ctrlKey) {
            //Add a blurring mesh        
            console.log(event.point);
            const newMeshes = [...meshes];
            newMeshes.push({ position: event.point });
            setMeshes(newMeshes);
            return;
        }

    }

    const doubleClickEventHandler = (event) => {
        event;
    }

    doubleClickEventHandler;

    return (
        <>

            <OrbitControls 
            minDistance={0} // Minimum distance
            maxDistance={80} // Maximum distance
            />

            <group

                ref={meshRef}

                // onPointerDown={handleMouseDown}
                // onPointerUp={handleMouseUp}
                // onPointerMove={handleMouseMove}
                onClick={clickEventHandler}
                onDoubleClick={doubleClickEventHandler}


            >

                <mesh>
                    <sphereGeometry args={[120, 128, 128]} />
                    <meshBasicMaterial map={colorMap} side={THREE.BackSide} />
                </mesh>

                {meshes.map((mesh, index) => (
                    <mesh key={index} position={mesh.position}>
                        <sphereGeometry args={[10, 16, 16]} />
                        <meshPhysicalMaterial
                            transmission={1}
                            roughness={0.4}
                        />
                    </mesh>
                ))}

            </group>
        </>
    )
}