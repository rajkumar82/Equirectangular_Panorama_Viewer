import './Toolbar.css'

// eslint-disable-next-line react/prop-types
export default function Toolbar({currentState,changeState}) {

    return (
        <div className='toolbarDiv'>
            <button className="button" 
                    title="Default Mode"
                    disabled = {currentState === 'none'}
                    onClick={()=>changeState('none')}>None</button>

            <button className="button" 
                    title="Blur mode: Click on center of face to blur face"
                    disabled = {currentState === 'blur'}
                    onClick={()=> changeState('blur')}>Blur Face</button>

            <button className="button" 
                    title="Click and add an annotation text"
                    disabled = {currentState === 'annotate'}
                    onClick={()=> changeState('annotate')}>Annotate</button>
        </div>

    );

}