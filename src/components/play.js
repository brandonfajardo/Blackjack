import React, { Component } from 'react'
import { connect } from 'react-redux'
import { distributeCard, updateGameResult } from '../actions'

const styles = {
    PlayContainer: {
        marginBottom: '30px'
    },
    PlayersCardImage: {
        width: '100px', 
        marginRight: '5px'
    },
    PlayOptionContainer: {
        marginTop: '20px'
    },
    Option: {
        marginRight: '5px'
    },
    DealersCardImage: {
        width: '100px'
    },
    DealersSecondCard: {
        display: 'inline-block', 
        border: '1px solid lightgray', 
        height: '140px', 
        width: '100px', 
        borderRadius: '5px', 
        marginBottom: '-66px', 
        marginLeft: '5px'
    },
    DealersCard: {
        width: '100px', 
        marginRight: '5px'
    },
    GameResult: {
        marginTop: '15px', 
        fontSize: '20px', 
        color: 'red'
    }
}

class Play extends Component {
    constructor(props){
        super(props)

        this.state = { playerStays: false }
        
        this.hit = this.hit.bind(this)
    }

    hit() {
        this.props.distributeCard('player')
        
        setTimeout(() => {
            if (this.props.playerVal > 21){
                this.props.updateGameResult("BUST")
            }
        }, 200)
    }

    renderDealersCards() {
        return (
            <div style={styles.PlayContainer}>
                <p>Dealer's cards {this.props.dealersHand.length >= 1 && <strong>({this.state.playerStays ? this.props.dealerVal : this.props.dealerFirstCardVal})</strong>}:</p>
                {this.props.dealersHand.map((card, i) => {
                    if (i == 1){ // do not reveal second card unless player has stayed or has busted
                        return this.state.playerStays 
                        ? <img style={styles.DealersCardImage} src={card.image} />
                        : <div style={styles.DealersSecondCard} />
                    }
                    return <img style={styles.DealersCard} src={card.image} />
                })}
            </div>
        )
    }

    renderPlayersCards() {
        return (
            <div>
                <p>Your cards {this.props.playersHand.length >= 1 && `(${this.props.playerVal})`}:</p>
                {this.props.playersHand.map((card) => <img style={styles.PlayersCardImage} src={card.image} />)}
            </div>
        )
    }

    renderPlayOptions() {
        return (
            <div style={styles.PlayOptionContainer}>
                <button style={styles.Option} onClick={() => this.hit()}>Hit</button>
                <button onClick={() => this.setState({ playerStays: true })} style={styles.Option}>Stay</button>
                <button style={styles.Option}>Double Down</button>
            </div>
        )
    }

    renderGameResult() {
        return <h1 style={styles.GameResult}>{this.props.gameResult}</h1>
    }

    render() {
        return (
            <div>
                {this.renderDealersCards()}
                {this.renderPlayersCards()}
                {this.props.gameResult && this.renderGameResult()}
                {this.props.playersHand.length >= 2 && this.props.dealersHand.length >= 2 && this.renderPlayOptions()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dealersHand: state.blackJack.dealersHand,
    playersHand: state.blackJack.playersHand,
    playerVal: state.blackJack.playerVal,
    dealerFirstCardVal: state.blackJack.dealerFirstCardVal,
    gameResult: state.blackJack.gameResult
})

const mapDispatchToProps = {
    distributeCard,
    updateGameResult
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)