/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';

export default function EditableLabel() {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Edit Caption');
    const labelRef = useRef();

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };



    return (
        <Html zIndexRange={[10, 0]} center>
            {isEditing ? (
                <input                    
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        width: '100px',
                        outline: 'none',
                    }}
                />
            ) : (
                <div
                    style={{
                        padding: '10px',                        
                        fontFamily: 'Helvetica, Arial',
                        border: '0px solid #ccc',
                        background:'#00000088',
                        borderRadius: '30px',                        
                        outline: 'none',
                        whiteSpace:'nowrap',
                        color: 'white',
                        'userselect': 'none',
                        overflow:'hidden',
                    }}
                    onDoubleClick={handleDoubleClick} ref={labelRef}>{text}</div>
            )}
        </Html>
    );
}