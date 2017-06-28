import React, { Component } from 'react'
import { startGameWithAmount, betAmount, distributeCard } from '../actions'
import { connect } from 'react-redux'
import axios from 'axios'

const styles = {
    Money: {
        fontWeight: 'bold',
        marginRight: '20px',
        cursor: 'pointer',
    }
}

class Blackjack extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            dealt: false
        }
    }

    startGame(startingAmount) {
        this.props.startGameWithAmount(startingAmount)
    }

    betAmount(amount){
        this.props.betAmount(amount)
    }

    distributeCards(){
        if (this.props.bet == 0){
            alert('Please place a bet')
        } else {
            this.setState({ dealt: true })
            axios.get('https://deckofcardsapi.com/api/deck/auoeew5rp8rw/shuffle/?deck_count=1')
            
            setTimeout(() => {
                this.props.distributeCard('player')
            },0)
            setTimeout(() => {
                this.props.distributeCard('dealer')
            },1500)
            setTimeout(() => {
                this.props.distributeCard('player')
            },3000)
            setTimeout(() => {
                this.props.distributeCard('dealer')
                console.log("PROPS", this.props)
            },4500)
        }
    }

    Hit() {
        this.props.distributeCard('player')
    }

    render() {
        return (
            <div>
                {!this.props.start && (
                    <div>
                        <h1>Blackjack</h1>
                        <p>How much would you like to start out with?</p>
                        <span onClick={() => this.startGame(100)} style={styles.Money}>$100</span>
                        <span onClick={() => this.startGame(500)} style={styles.Money}>$500</span>
                        <span onClick={() => this.startGame(1000)} style={styles.Money}>$1000</span>
                    </div>
                )}
                
                {this.props.start && (
                    <div>
                        <h2>Balance: ${this.props.balance}</h2>
                        <h3>Bet: ${this.props.bet}</h3>
                        {!this.state.dealt && (
                            <div>
                                <span onClick={() => this.betAmount(5)} style={styles.Money}>$5</span>
                                <span onClick={() => this.betAmount(25)} style={styles.Money}>$25</span>
                                <span onClick={() => this.betAmount(100)} style={styles.Money}>$100</span>
                            </div>
                        )}
                        <br /><br />
                        
                        {!this.state.dealt && <button onClick={() => this.distributeCards()}>Deal Cards</button>}

                        <p>Dealer's cards: ()</p>
                        {this.props.dealersHand.map((card, i) => {
                            if (i == 1){
                                return <div style={{display: 'inline-block', border: '1px solid lightgray', height: '140px', width: '100px', borderRadius: '5px', marginBottom: '-66px', marginLeft: '5px'}}></div>
                            }
                            return <img style={{width: '100px'}} src={card.image} />
                        })}

                        <p>Your cards:</p>
                        {this.props.playersHand.map((card) => {
                            return (
                                <img style={{width: '100px', marginRight: '5px'}} src={card.image} />
                            )
                        })}

                        {this.props.playersHand.length >= 2 && this.props.dealersHand.length >= 2 && (
                            <div>
                                <button onClick={() => this.Hit()} style={{display: 'block', marginTop: '20px'}}>Hit</button>
                                <button>Double Down</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        balance: state.blackJack.balance,
        start: state.blackJack.start,
        bet: state.blackJack.betAmount,
        playersHand: state.blackJack.playersHand,
        dealersHand: state.blackJack.dealersHand
    }   
}

const mapDispatchToProps = {
    startGameWithAmount,
    betAmount,
    distributeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Blackjack);