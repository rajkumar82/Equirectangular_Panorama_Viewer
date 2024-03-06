/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useThree, useLoader } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
//import { OrbitControls } from '@react-three/drei'
import EditableLabel from './EditableLabel'
import './EquirectangularPanoramaViewer.css'


export default function EquirectangularPanoramaViewer({ fileName, currentState }) {

    const { camera, gl } = useThree()    

    const meshRef = useRef();
    const sphereRef = useRef();

    // 
    //  Blur Mesh
    //    
    const blurMeshRef = useRef();
    const [isBlurVisible, setIsBlurVisible] = useState(false);
    const [blurPosition, setBlurPosition] = useState([0, 0, 0]);
    const [blurRadius, setBlurRadius] = useState(1);
    const [meshes, setMeshes] = useState([]);

    //
    //   Annotation
    //
    const [texts, setTexts] = useState([]);

    //
    //  Texture
    //
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

    let isDragging = false;

    const mouseDownEventHandler = (event) => {

        isDragging = true;        
        previousMousePosition = {
            x: event.offsetX,
            y: event.offsetY
        };
        document.body.classList.add('pan');

    }

    const mouseUpEventHandler = () => {        
        isDragging = false;
        document.body.classList.remove('pan');
    }

    const mouseWheelEventHandler = (event) => {
        
        const delta = Math.sign(event.deltaY) * 20;
        var zPos = camera.position.z + delta;
        if (zPos < 320 && zPos > -320) {
            camera.position.z += delta;
        }
    }

    let previousMousePosition = {
        x: 0,
        y: 0
    };

    let deltaMove = {
        x: 0,
        y: 0
    };

    const mouseMoveEventHandler = (event) => {

        if (currentState === 'blur') {
            setBlurPosition(event.point);
            if (!isBlurVisible)
                setIsBlurVisible(true);

        }
        else { setIsBlurVisible(false); }


        if (isDragging) {
            gl.domElement.classList.add('pan');
        }
        else {
            gl.domElement.classList.remove('pan');
            return;
        }

        deltaMove = {
            x: event.offsetX - previousMousePosition.x,
            y: event.offsetY - previousMousePosition.y
        };

        camera.rotation.x += deltaMove.y * 0.001;
        camera.rotation.y += deltaMove.x * 0.001;

        previousMousePosition = {
            x: event.offsetX,
            y: event.offsetY
        };
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
            <group
                ref={meshRef}
                onClick={clickEventHandler}
                onDoubleClick={doubleClickEventHandler}
                onPointerMove={mouseMoveEventHandler}
                onPointerDown={mouseDownEventHandler}
                onPointerUp={mouseUpEventHandler}
                onWheel={mouseWheelEventHandler}
            >

                <mesh ref={sphereRef} position={[0,0,0]}> 
                    <sphereGeometry args={[400, 100, 100]} />
                    <meshBasicMaterial map={colorMap} side={THREE.DoubleSide}/>
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