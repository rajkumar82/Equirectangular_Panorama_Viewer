/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useLoader, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import EditableLabel from './EditableLabel'


export default function EquirectangularPanoramaViewer({ fileName, currentState }) {


    useFrame((state, delta) => {        
        delta;
    })

    const meshRef = useRef();
    
    const [meshes, setMeshes] = useState([]);
    
    const [texts, setTexts] = useState([]);

    const colorMap = useLoader(TextureLoader, fileName)
    colorMap.colorSpace = 'srgb'

    const clickEventHandler = (event) => {
        
        if (currentState === 'blur' && event.ctrlKey) {

            //Add a blurring mesh
            const newMeshes = [...meshes];
            newMeshes.push({ position: event.point });
            setMeshes(newMeshes);
            return;
        }
        else if (currentState === 'annotate' && event.ctrlKey) {
            const newTexts = [...texts];
            newTexts.push({ position: event.point });
            setTexts(newTexts);
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

                {texts.map((mesh, index) => (
                    <mesh
                        key={index}
                        position={mesh.position}
                    >
                        <sphereGeometry />
                        <meshBasicMaterial color="transparent" />
                        <EditableLabel/>

                    </mesh>
                ))}

            </group>
        </>
    )
}