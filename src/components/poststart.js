import React, { Component } from 'react'
import { connect } from 'react-redux'
import { betAmount, updateError, dealingCards, distributeCard } from '../actions'
import Play from './play'
import axios from 'axios'

const styles = {
    Money: {
        fontWeight: 'bold',
        marginRight: '20px',
        cursor: 'pointer',
    },
    Error: {
        fontSize: '12px',
        color: '#ff3333'
    }
}

class PostStart extends Component {
    constructor(props){
        super(props)

        this.distributeCards = this.distributeCards.bind(this)
    }

    distributeCards() {
        if (this.props.bet === 0){
            this.props.updateError('Please place a bet!')
        } else {
            this.props.dealingCards()
            axios.get('https://deckofcardsapi.com/api/deck/auoeew5rp8rw/shuffle/?deck_count=1')

            setTimeout(() => { this.props.distributeCard('player')},0)
            setTimeout(() => { this.props.distributeCard('dealer')},1000)
            setTimeout(() => { this.props.distributeCard('player')},2000)
            setTimeout(() => { this.props.distributeCard('dealer')},3000)
        }
    }

    renderError() {
        return <p style={styles.Error}>{this.props.error}</p>
    }

    render() {
        return (
            <div>
                <h2>Balance: ${this.props.balance}</h2>
                <h3>Bet: ${this.props.bet}</h3>
                {!this.props.cardsDealt && (
                    <div>
                        <span onClick={() => this.props.betAmount(5)} style={styles.Money}>$5</span>
                        <span onClick={() => this.props.betAmount(25)} style={styles.Money}>$25</span>
                        <span onClick={() => this.props.betAmount(100)} style={styles.Money}>$100</span>
                        <button onClick={() => this.distributeCards()}>Deal Cards</button>
                    </div>
                )}
                {this.props.error && this.renderError()}
                {this.props.cardsDealt && <Play />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    balance: state.blackJack.balance,
    bet: state.blackJack.betAmount,
    error: state.error.message,
    cardsDealt: state.blackJack.cardsDealt
})

const mapDispatchToProps = {
    betAmount,
    updateError,
    dealingCards,
    distributeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(PostStart)