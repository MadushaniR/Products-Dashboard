import './Button.css';

import { useState } from 'react';

export const Button = () => {
    const { state, setState } = useState()
    return (
        <div>
            <button
                id="click-btn"
                className="shared-btn"
                onClick={() => 
                    setState((s) => s+1)}>
                        hello world {state}
            </button>
        </div>
    );
};

export default Button;