import React, { Component } from 'react'
import PreStart from './prestart'
import PostStart from './poststart'
import { startGameWithAmount } from '../actions'
import { connect } from 'react-redux'

const Blackjack = (props) => {
    return (
        <div>
            {!props.start && <PreStart startGameWithAmount={props.startGameWithAmount} />}    
            {props.start && <PostStart />}    
        </div>
    )
}

const mapStateToProps = state => ({
    start: state.blackJack.start,
})

const mapDispatchToProps = {
    startGameWithAmount,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blackjack);