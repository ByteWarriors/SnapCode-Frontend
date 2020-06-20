import React from 'react'

const heading = () => {

    const headingStyle = {
        width: '100%',
        marginTop: '-0.01%',
        paddingTop: '25px',
        paddingBottom: '30px',
        paddingLeft: '20px',
        backgroundColor: '#070E47',
        color: '#ffffff',
        textAlign: 'left',
        letterSpacing: '2px',
        opacity: '0.9'
    }

    return (
        <div>
            <h1 style={headingStyle}>SnapCode</h1>
        </div>
    )
}

export default heading;