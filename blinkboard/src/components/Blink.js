import React, { Component } from 'react'

class Blink extends Component {

  handleClick = () => {
    this.props.onClick(this.props.blink.id)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.blink.id)
  }

  render () {
    return(
      <div className="title">
        <span className="deleteButton" onClick={this.handleDelete}>
          x
        </span>
        <h4 onClick={this.handleClick}>
          {this.props.blink.title}
        </h4>
        <p onClick={this.handleClick}>
          {this.props.blink.description}
        </p>
      </div>
    )
  }
}

export default Blink