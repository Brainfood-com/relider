import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

const keyboardKeyToAction = {
  'page down':  'down',
  'down':       'down',
  'page up':    'up',
  'up':         'up',
  'left':       'left',
  'right':      'right',
  'home':       'min',
  'end':        'max',
}

const keyboardKeyToJump = {
  'page down':  true,
  'page up':    true,
}

const keyboardActionToDirection = {
  up:     'decrease',
  down:   'increase',
  left:   'decrease',
  right:  'increase',
  min:    'min',
  max:    'max',
  reversed: {
    horizontal: {
      left:   'increase',
      right:  'decrease',
    },
    vertical: {
      down:   'decrease',
      up:     'increase',
    },
  },
}

const keyboardActionEnum = PropTypes.oneOf(['up', 'down', 'left', 'right', 'min', 'max'])
const keyboardDirectionEnum = PropTypes.oneOf(['increase', 'decrease', 'min', 'max'])
const keyboardDirectionShapeReverse = PropTypes.shape({
  up: keyboardDirectionEnum,
  down: keyboardDirectionEnum,
  left: keyboardDirectionEnum,
  right: keyboardDirectionEnum,
  min: keyboardDirectionEnum,
  max: keyboardDirectionEnum,
})

class ReliderKeyboard extends React.Component {
  static propTypes = {
    horizontal: PropTypes.bool,
    reversed: PropTypes.bool,
    onAction: PropTypes.func,
    keyToAction: PropTypes.objectOf(keyboardActionEnum),
    keyToJump: PropTypes.objectOf(PropTypes.bool),
    actionToDirection: PropTypes.shape({
      up: keyboardDirectionEnum.isRequired,
      down: keyboardDirectionEnum.isRequired,
      left: keyboardDirectionEnum.isRequired,
      right: keyboardDirectionEnum.isRequired,
      reversed: PropTypes.shape({
        horizontal: keyboardDirectionShapeReverse,
        vertical: keyboardDirectionShapeReverse,
      }),
    }),
  }

  static defaultProps = {
    horizontal: true,
    reversed: false,
    onAction: function() {},

    keyToAction: keyboardKeyToAction,
    keyToJump: keyboardKeyToJump,
    actionToDirection: keyboardActionToDirection,
  }

  handleOnKeyDown = (ev) => {
    const key = keycode(ev)
    if (!key) {
      return
    }
    const {keyToAction} = this.props
    const action = keyToAction[key]
    if (!action) {
      return
    }
    const {horizontal, reversed, actionToDirection} = this.props
    const direction = reversed && actionToDirection.reversed[horizontal ? 'horizontal' : 'vertical'][action] || actionToDirection[action]
    if (!direction) {
      return
    }
    ev.preventDefault()
    const {keyToJump, onAction} = this.props
    const jump = keyToJump[key] || false
    onAction(direction, jump)
  }

  render() {
    const {horizontal, reversed, keyToAction, keyToJump, actionToDirection, onAction, ...props} = this.props
    return <div {...props} onKeyDown={this.handleOnKeyDown}/>
  }
}

export default ReliderKeyboard
