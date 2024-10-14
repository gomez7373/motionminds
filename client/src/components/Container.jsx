import { Navigate } from 'react-router-dom';

function Container({children}) {
 

    return (
        <div className="app-container">
            {children}
        </div>
    )
}

export default Container;