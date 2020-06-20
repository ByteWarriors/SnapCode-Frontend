import React from 'react';

const button = (props) => {

    const buttonStyle = {
        backgroundColor: '#483D53',
        border: 'none',
        padding: '20px 40px',
        width: '250px',
        marginTop: '35%',
        marginRight:'15%',
        marginLeft:'15%',
        cursor: 'pointer',
        color: '#FFFFFF',
        textDecoration: 'none',
        letterSpacing: '2px',
        fontSize: '20px',
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative'
    }

    const buttonAlign={
        display: 'inline',
    }

    return (
        <div style={buttonAlign} >
            <button style={buttonStyle} onClick={props.click}>
                {props.name}
            </button>
        </div>
    )
}

export default button