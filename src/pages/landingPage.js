import React from 'react';
import {Link} from 'react-router-dom';

import '../assets/landingPage.css';

const landingPage = () => {

    return (
        <div className="landingPage"> 
            <h1 className="headerStyle">
                SnapCode
            </h1>
            <Link to='/addCode'>
                <button className="buttonStyle">
                    Get Started!
                </button>
            </Link>
        </div>        
    )
}

export default landingPage;