import React from 'react'

const styles = {
    Money: {
        fontWeight: 'bold',
        marginRight: '20px',
        cursor: 'pointer',
    }
}

const PreStart = (props) => {
    return (
        <div>
            <h1>Blackjack</h1>
            <p>How much would you like to start out with?</p>
            <span onClick={() => props.startGameWithAmount(100)} style={styles.Money}>$100</span>
            <span onClick={() => props.startGameWithAmount(500)} style={styles.Money}>$500</span>
            <span onClick={() => props.startGameWithAmount(1000)} style={styles.Money}>$1000</span>
        </div>
    )
}

export default PreStart