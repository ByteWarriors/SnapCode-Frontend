import React from 'react';
import {Link} from 'react-router-dom';

import '../assets/landingPage.css';

const landingPage = () => {

    const headerStyle = {
        color: '#483D53',
        fontSize: '60px',
        letterSpacing: '2px',
        position: 'relative',
        marginTop: '16%',
        marginLeft: '8%'
    }

    const buttonStyle = {
        backgroundColor: '#483D53',
        border: 'none',
        padding: '14px 40px',
        width: '225px',
        position: 'absolute',
        marginTop: '1%',
        marginLeft: '-5%',
        cursor: 'pointer',
        color: '#FFFFFF',
        textDecoration: 'none',
        letterSpacing: '2px',
        fontSize: '20px',
        textAlign: 'center',
        display: 'inline-block',
    }

    return (
        <div className="landingPage"> 
            <h1 style={headerStyle}>
                SnapCode
            </h1>
            <Link to='/addCode'>
                <button style={buttonStyle}>
                    Get Started!
                </button>
            </Link>
        </div>        
    )
}

export default landingPage;