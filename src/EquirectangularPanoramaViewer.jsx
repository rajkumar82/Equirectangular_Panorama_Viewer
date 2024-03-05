/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useLoader, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import EditableLabel from './EditableLabel'


export default function EquirectangularPanoramaViewer({ fileName, currentState }) {

    useFrame((state, delta) => {
        delta;
    })

    const meshRef = useRef();
    const blurMeshRef = useRef();
    const [isBlurVisible, setIsBlurVisible] = useState(false);
    const [blurPosition, setBlurPosition] = useState([0, 0, 0]);
    const [blurRadius, setBlurRadius] = useState(1);




    const [meshes, setMeshes] = useState([]);
    const [texts, setTexts] = useState([]);

    const colorMap = useLoader(TextureLoader, fileName)
    colorMap.colorSpace = 'srgb'


    // Add event listener for key press
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyPress = (event) => {
        switch (event.key) {
            case '+':
                setBlurRadius(value => value * 1.1);
                break;
            case '-':
                setBlurRadius(value => value / 1.1);
                break;
        }
    }

    const mouseMoveEventHandler = (event) => {

        if (currentState === 'blur') {


            setBlurPosition(event.point);
            if (!isBlurVisible)
                setIsBlurVisible(true);
        }
        else {

            setIsBlurVisible(false);
        }
    }

    const clickEventHandler = (event) => {

        if (currentState === 'blur' && event.ctrlKey) {

            //Add a blurring mesh
            const newMeshes = [...meshes];
            newMeshes.push({ position: event.point, scale: blurRadius });
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
                onPointerMove={mouseMoveEventHandler}
                onk
            >

                <mesh>
                    <sphereGeometry args={[120, 128, 128]} />
                    <meshBasicMaterial map={colorMap} side={THREE.BackSide} />
                </mesh>

                <mesh
                    scale={[blurRadius, blurRadius, blurRadius]}
                    ref={blurMeshRef}
                    visible={isBlurVisible}
                    position={blurPosition}
                >
                    <sphereGeometry args={[10, 16, 16]} />
                    <meshPhysicalMaterial
                        transmission={1}
                        roughness={0.4}
                    />

                </mesh>

                {meshes.map((mesh, index) => (
                    <mesh key={index}
                        position={mesh.position}
                        scale={[mesh.scale, mesh.scale, mesh.scale]}
                    >
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
                        <EditableLabel />

                    </mesh>
                ))}

            </group>
        </>
    )
}