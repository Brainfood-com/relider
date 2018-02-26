import React from 'react'
import PropTypes from 'prop-types'

class ReliderMouse extends React.Component {
  static propTypes = {
    onMousePosition: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onTouchStart: function() {},
    onTouchMove: function() {},
    onTouchEnd: function() {},
    onMouseDown: function() {},
    onMouseMove: function() {},
    onMouseUp: function() {},
    onClick: function() {},
  }

  state = {}

  componentWillUnmount() {
    clearTimeout(this.state.timer)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleOnMouseMove)
    document.removeEventListener('mouseup', this.handleOnMouseUp)
  }

  handleOnTouchStart = (ev) => {
    const {pageX, pageY} = ev.touches[0]
    const touchStart = {x: pageX, y: pageY}
    //console.log('handleOnTouchStart', touchStart)
    if (!ev.defaultPrevented) {
      clearTimeout(this.state.timer)
      this.setState({
        fireClick: false,
        timer: setTimeout(() => {
          //console.log('timer called')
          this.setState({fireClick: true, timer: null})
        }, 300),
        touchStart,
      })
      //this.processClick(ev)
    }
    this.props.onTouchStart(ev, touchStart)
  }

  handleOnTouchMove = (ev) => {
    const {pageX, pageY} = ev.touches[0]
    const touchMove = {x: pageX, y: pageY}
    const {fireClick, timer, touchStart} = this.state
    const distance = Math.sqrt(Math.abs((touchMove.x - touchStart.x) ^ 2 + (touchMove.y - touchStart.y) ^ 2))
    //console.log('handleOnTouchMove', {...touchMove, fireClick, distance})
    touchMove.distance = distance
    if (distance > 1) {
      clearTimeout(timer)
      this.setState({timer: null})
    }
    this.doPositioning(ev, touchMove)
    if (fireClick) {
      this.setState({fireClick: false})
      this.props.onMouseDown(ev)
    }
    this.props.onTouchMove(ev, touchMove)
  }

  handleOnTouchEnd = (ev) => {
    //console.log('handleOnTouchEnd', {fireClick: this.state.fireClick})
    const {timer, fireClick} = this.state
    clearTimeout(timer)
    this.setState({timer: null, touchStart: null, touchMove: null})
    if (timer || fireClick) {
      this.setState({fireClick: false})
    } else {
      ev.preventDefault()
    }
    this.props.onTouchEnd(ev)
  }

  handleOnMouseDown = (ev) => {
    document.addEventListener('mousemove', this.handleOnMouseMove)
    document.addEventListener('mouseup', this.handleOnMouseUp)
    this.doPositioning(ev, {x: ev.clientX, y: ev.clientY})
    this.props.onMouseDown(ev)
  }

  handleOnMouseUp = (ev) => {
    document.removeEventListener('mousemove', this.handleOnMouseMove)
    document.removeEventListener('mouseup', this.handleOnMouseUp)
    this.doPositioning(ev, {x: ev.clientX, y: ev.clientY})
    this.props.onMouseUp(ev)
  }

  handleOnMouseMove = (ev) => {
    this.doPositioning(ev, {x: ev.clientX, y: ev.clientY})
    this.props.onMouseMove(ev)
  }

  doPositioning(ev, {x, y}) {
    const bounds = this._node.getBoundingClientRect()

    const {_node:{offsetLeft, offsetTop, offsetWidth, offsetHeight}} = this
    const percentX = (x - bounds.left) / bounds.width
    const percentY = (y - bounds.top) / bounds.height
    //console.log('onMouseMove', {x, y, offsetPosition: `${bounds.left}/${bounds.top}`, offsetSize: `${bounds.width}/${bounds.height}`})
    //console.log('onMouseMove', {x, offsetLeft, percentX, percentY})
    this.props.onMousePosition(ev, {percentX, percentY})
  }

  render() {
    const {onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMousePosition, onClick, ...props} = this.props
    return <div
      {...props}
      ref={node => this._node = node}
      onTouchStart={this.handleOnTouchStart}
      onTouchMove={this.handleOnTouchMove}
      onTouchEnd={this.handleOnTouchEnd}
      onMouseDown={this.handleOnMouseDown}
      onMouseMove={this.handleOnMouseMove}
    />
  }
}

export default ReliderMouse
