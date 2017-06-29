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
            cardsDealt: false,
            playerStays: false
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
            this.setState({ cardsDealt: true })
            axios.get('https://deckofcardsapi.com/api/deck/auoeew5rp8rw/shuffle/?deck_count=1')
            
            setTimeout(() => {
                this.props.distributeCard('player')
            },0)
            setTimeout(() => {
                this.props.distributeCard('dealer')
            },1000)
            setTimeout(() => {
                this.props.distributeCard('player')
            },2000)
            setTimeout(() => {
                this.props.distributeCard('dealer')
            },3000)
        }
    }

    Hit() {
        this.props.distributeCard('player')
        if (this.props.playerVal > 17){
            setTimeout(() => {
                alert('BUST!')
            }, 1000)
        }
    }

    renderPreStart() {
        return (
            <div>
                <h1>Blackjack</h1>
                <p>How much would you like to start out with?</p>
                <span onClick={() => this.startGame(100)} style={styles.Money}>$100</span>
                <span onClick={() => this.startGame(500)} style={styles.Money}>$500</span>
                <span onClick={() => this.startGame(1000)} style={styles.Money}>$1000</span>
            </div>
        )
    }

    stay() {
        this.setState({ playerStays: true })
    }

    renderPostStart() {
        return (
            <div>
                <h2>Balance: ${this.props.balance}</h2>
                <h3>Bet: ${this.props.bet}</h3>
                {!this.state.cardsDealt && (
                    <div>
                        <span onClick={() => this.betAmount(5)} style={styles.Money}>$5</span>
                        <span onClick={() => this.betAmount(25)} style={styles.Money}>$25</span>
                        <span onClick={() => this.betAmount(100)} style={styles.Money}>$100</span>
                        <button onClick={() => this.distributeCards()}>Deal Cards</button>
                    </div>
                )}
            </div>
        )
    }

    renderPlayOptions() {
        if (this.props.playersHand.length >= 2 && this.props.dealersHand.length >= 2){
            return (
                <div style={{marginTop: '20px'}}>
                    <button style={{marginRight: '5px'}} onClick={() => this.Hit()}>Hit</button>
                    <button onClick={() => this.stay()} style={{marginRight: '5px'}}>Stay</button>
                    <button style={{marginRight: '5px'}}>Double Down</button>
                </div>
            )
        }
    }

    renderDealersCards() {
        return (
            <div style={{marginBottom: '30px'}}>
                <p>Dealer's cards {this.props.dealersHand.length >= 1 && <strong>({this.state.playerStays ? this.props.dealerVal : this.props.dealerFirstCardVal})</strong>}:</p>
                {this.props.dealersHand.map((card, i) => {
                    if (i == 1){ // do not reveal second card unless player has stayed or has busted
                        return this.state.playerStays ?
                            <img style={{width: '100px'}} src={card.image} />
                            : 
                            <div style={{display: 'inline-block', border: '1px solid lightgray', height: '140px', width: '100px', borderRadius: '5px', marginBottom: '-66px', marginLeft: '5px'}} />
                    }
                    return <img style={{width: '100px', marginRight: '5px'}} src={card.image} />
                })}
            </div>
        )
    }

    renderPlayersCards() {
        return (
            <div>
                <p>Your cards {this.props.playersHand.length >= 1 && <strong>({this.props.playerVal})</strong>}:</p>
                {this.props.playersHand.map((card) => {
                    return (
                        <img style={{width: '100px', marginRight: '5px'}} src={card.image} />
                    )
                })}
            </div>
        )
    }

    render() {
        const {
            dealersHand,
            playersHand,
            start,
        } = this.props 

        const { cardsDealt } = this.state 
        return (
            <div>
                {!start && this.renderPreStart()}    
                {start && this.renderPostStart()}
                
                <br /><br />
                
                {cardsDealt && (
                    <div>
                        {this.renderDealersCards()}
                        {this.renderPlayersCards()}
                        {playersHand.length >= 2 && dealersHand.length >= 2 && this.renderPlayOptions()}
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
        dealersHand: state.blackJack.dealersHand,
        playerVal: state.blackJack.playerVal,
        dealerVal: state.blackJack.dealerVal,
        dealerFirstCardVal: state.blackJack.dealerFirstCardVal
    }   
}

const mapDispatchToProps = {
    startGameWithAmount,
    betAmount,
    distributeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Blackjack);