import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import classnames from 'classnames/bind'

//import {withContentRect} from 'react-measure'

import ReliderKeyboard from './ReliderKeyboard'
import ReliderMouse from './ReliderMouse'
import extendableStyles from './extendableStyles'

const styles = theme => {
  const {
    relider = {},
    transitions,
  } = theme
  const {
    handleColorZero,
    handleFillColor,
    handleSize,
    handleSizeDisabled,
    handleSizeActive,
    trackSize,
    trackColor,
    trackColorSelected,
    rippleColor,
    selectionColor,
    handleBorderWidth,
    handleBorderColor,
  } = relider
  const crossLength = Math.max(handleSize, handleSizeDisabled, handleSizeActive) + handleBorderWidth * 2
  return {
    root: {
      touchAction: 'none',
      touchCallout: 'none',
      userSelect: 'none',
      cursor: 'pointer',
    },
    moving: {
    },
    horizontal: {
      /*
        primaryLength: 'width',
        primaryPosition: 'left',
        primaryMargin: 'marginLeft',
        crossLength: 'height',
        crossPosition: 'top',
        crossMargin: 'marginTop',
        hoverMatrix: [-50, -100],
        hoverTransform: 1,
      */
      '& $sliderContainer': {
        width: '100%',
        height: crossLength,
      },
      '& $trackContainer': {
        width: '100%',
        height: trackSize,
        top: crossLength / 2 - trackSize / 2 - handleBorderWidth,
        transition: transitions.create(['height', 'top']),
      },
      '& $sliderContainer:hover, &$moving': {
        '& $bar': {
          height: trackSize * 2,
        },
        '& $trackContainer': {
          height: trackSize * 2,
          top: crossLength / 2 - trackSize - handleBorderWidth,
        },
        '& $hoverContainer$hoverAbove $hoverElement': {
          transform: 'translate(-50%, -100%) scale(1, 1)',
          '&:hover': {
            transform: 'translate(-50%, -50%) scale(0, 0)',
          },
        },
        '& $hoverContainer$hoverBelow $hoverElement': {
          transform: 'translate(-50%, 0%) scale(1, 1)',
          '&:hover': {
            transform: 'translate(-50%, -50%) scale(0, 0)',
          },
        },
      },
      '& $bar': {
        height: trackSize,
        transition: transitions.create(['height']),
      },
      '& $hover': {
        height: handleSizeDisabled,
        width: 2,
        top: '50%',
      },
      '& $hoverPointer': {
        height: handleSizeDisabled,
        width: 2,
      },
      '& $hoverContainer$hoverAbove': {
        top: handleSizeDisabled / 2 - crossLength / 2,
      },
      '& $hoverContainer$hoverBelow': {
        top: handleSizeDisabled / 2 + crossLength / 2,
      },
      '& $handle': {
        top: '50%',
      },
      '& $tick': {
        height: handleSizeDisabled,
        width: 2,
        top: '50%',
      },
    },
    vertical: {
      /*
        primaryLength: 'height',
        primaryPosition: 'top',
        primaryMargin: 'marginTop',
        crossLength: 'width',
        crossPosition: 'left',
        crossMargin: 'marginLeft',
        hoverMatrix: [-100, -50],
        hoverTransform: 0,
      */
      '& $sliderContainer': {
        height: '100%',
        width: crossLength,
      },
      '& $trackContainer': {
        height: '100%',
        width: trackSize,
        left: crossLength / 2 - trackSize / 2 - handleBorderWidth,
        transition: transitions.create(['width', 'left']),
      },
      '& $sliderContainer:hover, &$moving': {
        '& $bar': {
          width: trackSize * 2,
        },
        '& $trackContainer': {
          width: trackSize * 2,
          left: crossLength / 2 - trackSize - handleBorderWidth,
        },
        '& $hoverContainer$hoverAbove $hoverElement': {
          transform: 'translate(-100%, -50%) scale(1, 1)',
          '&:hover': {
            transform: 'translate(-50%, -50%) scale(0, 0)',
          },
        },
        '& $hoverContainer$hoverBelow $hoverElement': {
          transform: 'translate(0, -50%) scale(1, 1)',
          '&:hover': {
            transform: 'translate(-50%, -50%) scale(0, 0)',
          },
        },
      },
      '& $bar': {
        width: trackSize,
        transition: transitions.create(['width']),
      },
      '& $hover': {
        width: handleSizeDisabled,
        height: 2,
        left: '50%',
      },
      '& $hoverPointer': {
        width: handleSizeDisabled,
        height: 2,
      },
      '& $hoverContainer$hoverAbove': {
        left: handleSizeDisabled / 2 - crossLength / 2,
      },
      '& $hoverContainer$hoverBelow': {
        left: handleSizeDisabled / 2 + crossLength / 2,
      },
      '& $handle': {
        left: '50%',
      },
      '& $tick': {
        width: handleSizeDisabled,
        height: 2,
        left: '50%',
      },
    },
    sliderContainer: {
      position: 'relative',
      '&:hover': {
        '& $trackContainer': {
          backgroundColor: trackColorSelected,
        },
        '& $tick': {
          backgroundColor: trackColorSelected,
        },
        '& $hoverPointer': {
          display: 'block',
        },
      },
    },
    trackContainer: {
      position: 'absolute',
      directionInvariant: true,
      top: 0,
      left: 0,
      backgroundColor: trackColor,
    },
    bar: {
      position:'absolute',
    },
    handle: {
      zIndex: 2,
      position: 'absolute',
      cursor: 'pointer',
      directionInvariant: true,
      pointerEvents: 'inherit',
      outline: 'none',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      border: `${handleBorderWidth}px solid transparent`,
      width: handleSize,
      height: handleSize,
      borderColor: handleBorderColor,
      backgroundColor: selectionColor,
      transition: transitions.create(['height', 'width']),
    },
    handleDisabled: {
      cursor: 'not-allowed',
      width: handleSizeDisabled,
      height: handleSizeDisabled,
      backgroundColor: trackColor,
    },
    handleActive: {
      width: handleSizeActive,
      height: handleSizeActive,
      borderColor: 'red',
      backgroundColor: handleFillColor,
    },
    handleAtZero: {
      cursor: 'not-allowed',
      backgroundColor: handleFillColor,
    },
    handleHover: {
      borderColor: 'red',
    },
    hover: {
      position: 'absolute',
      top:0,
      left:0,
      transform: 'translate(-50%, -50%)',
    },
    hoverAbove: {},
    hoverBelow: {},
    hoverPointer: {
      display: 'none',
      backgroundColor: handleFillColor,
    },
    hoverContainer: {
      zIndex: 1,
      position:'absolute',
    },
    hoverElement: {
      position: 'absolute',
      zIndex: 1,
      transition: transitions.create(['transform']),
      transform: 'translate(-50%, -50%) scale(0, 0)',
    },
    tick: {
      position: 'absolute',
      backgroundColor: trackColor,
      transform: 'translate(-50%, -50%)',
    },
  }
}
const axisMappingInfo = {
  horizontal: {
    primaryLength: 'width',
    primaryPosition: 'left',
  },
  vertical: {
    primaryLength: 'height',
    primaryPosition: 'top',
  },
}

function getStylesNG(props, context, state) {
  const {
    horizontal,
    reversed,
  } = props
  const axisInfo = axisMappingInfo[horizontal ? 'horizontal' : 'vertical']

  return {
    trackPosition: percent => ({
      [axisInfo.primaryPosition]: `${100 * (reversed ? 1 - percent : percent)}%`,
    }),
    barWidth: percent => ({
      [axisInfo.primaryPosition]: `${100 * (reversed ? percent : 0)}%`,
      [axisInfo.primaryLength]: `${100 * (reversed ? 1 - percent : percent)}%`,
    }),
  }
}

class Relider extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    required: PropTypes.bool,     // TODO: Move to per-handle
    disabled: PropTypes.bool,

    horizontal: PropTypes.bool,
    reversed: PropTypes.bool,
    step: PropTypes.number,
    handles: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      readOnly: PropTypes.bool,
    })).isRequired,
    bars: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number.isRequired,
      className: PropTypes.string,
      style: PropTypes.object,
    })),
    tickStart: PropTypes.number,
    tickStep: PropTypes.number,

    hover: PropTypes.shape({
      position: PropTypes.oneOf(['above', 'below']).isRequired,
      element: PropTypes.func.isRequired,
    }),
  }

  static defaultProps = {
    horizontal: true,
    reversed: false,
    step: 1,

    required: false,
    disabled: false,

    bars: [],
    onChange: function() {},
    onDrag: function() {},
    onDragStart: function() {},
    onDragStop: function() {},
    axis: 'x',
    tickCount: 0,

    onTouchStart: function() {},
    onTouchMove: function() {},
    onTouchEnd: function() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      hovered: false,
      focused: null,
      moving: null,
      ...this.processProps(props, {})
    }
  }

  processProps(props, prevState) {
    const mergeState = {}
    const {handles} = props
    if (!isEqual(handles, prevState.handles)) {
      mergeState.handles = handles
    }
    return mergeState
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.processProps(nextProps, this.state))
  }

  handleOnTouchStart = (ev, touched) => {
    this.props.onTouchStart(ev, touched)
  }

  handleOnTouchMove = (ev, touched) => {
    this.props.onTouchMove(ev, touched)
  }

  handleOnTouchEnd = (ev) => {
    this.props.onTouchEnd(ev)
  }

  handleOnMouseOver = (ev) => {
    this.setState({hovered: true})
  }

  handleOnMouseOut = (ev) => {
    this.setState({hovered: false})
  }

  handleOnKeyboardAction = (direction, jump) => {
    const {min, max, step} = this.props
    const {focused, handles: prevHandles, updates} = this.state
    //console.log('onKeyboardAction', {min, max, step, direction, jump, focused})
    if (focused === null) {
      return
    }
    let newValue
    const handle = prevHandles[focused]
    switch (direction) {
      case 'increase':
        newValue = handle.value + step
        break
      case 'decrease':
        newValue = handle.value - step
        break
      case 'min':
        newValue = min
        break
      case 'max':
        newValue = max
        break
      default:
        return
    }
    newValue = Math.max(Math.min(max, parseFloat(newValue.toFixed(5))), min)
    if (newValue !== handle.value) {
      const handles = prevHandles.slice(0, focused).concat({...handle, value: newValue}, prevHandles.slice(focused + 1))
      this.setState({handles})
      this.props.onChange(handles)
    }
  }

  findNearestHandle() {
    this.setState((prevState, props) => {
      const {mouseValue, handles} = prevState
      let index = null, distance
      for (let i = 0; i < handles.length; i++) {
        const handle = handles[i]
        const nextDistance = Math.abs(mouseValue - handle.value)
        if (!!!handle.readOnly && (index === null || nextDistance < distance)) {
          index = i
          distance = nextDistance
        }
      }
      return {moving: index}
    })
  }

  handleOnMousePosition = (ev, {percentX, percentY}) => {
    const {horizontal, reversed, min, max} = this.props
    const rawPercent = horizontal ? percentX : percentY
    const mousePercent = reversed ? 1 - rawPercent : rawPercent
    const mouseValue = Math.max(min, Math.min(max, parseFloat(((max - min) * mousePercent).toFixed(5))))
    this.setState({mouseValue, mousePercent})
    this.checkMove()
  }

  handleOnMouseDown = (ev) => {
    const {focused, moving} = this.state
    if (moving === null && focused === null) {
      this.findNearestHandle()
    }
    this.checkMove()
    this.props.onDragStart(ev)
  }

  checkMove() {
    this.setState((prevState, props) => {
      const {focused, moving} = prevState
      const index = moving !== null ? moving : focused !== null ? focused : null
      if (index !== null) {
        const {mouseValue, handles: prevHandles} = prevState
        const handle = prevHandles[index]
        //console.log('moved', {index, percent, newHandle, currentValue: handles[index]})
        if (mouseValue !== handle.value) {
          const handles = prevHandles.slice(0, index).concat({...handle, value: mouseValue}, prevHandles.slice(index + 1))
          this.props.onChange(handles)
          return {handles}
        }
      }
    })
  }

  handleOnMouseUp = (ev) => {
    this.setState({focused: null, moving: null})
    this.props.onDragStop(ev)
  }

  handleHandleEvent = (ev, type, index) => {
    switch (type) {
      case 'focus':
        this.setState({focused: index})
        break
      case 'blur':
        this.setState({focused: null})
        break
      case 'mouseover':
        this.setState({hovered: index})
        break
      case 'mouseout':
        this.setState({hovered: true})
        break
    }
  }

  render() {
    const styles = getStylesNG(this.props, this.context, this.state)
    const {
      classes,

      name,
      horizontal,
      reversed,
      min,
      max,
      step,

      tickStart = min,
      tickStep,

      bars,

      hover = {position: null, element: function() {}},

      required,
      disabled,
      id,
      className,
      style,
      sliderStyle,
    } = this.props
    const {
      focused,
      handles,
      hovered,
      mousePercent,
      mouseValue,
      moving,
    } = this.state
    const displayBars = bars.slice().sort((a, b) => b.value - a.value).map((bar, index) => {
      const percent = (bar.value - min) / (max - min)
      return <div
        key={index}
        className={classnames(classes.bar, bar.className)}
        style={{...bar.style, ...styles.barWidth(percent)}}
      />
    })
    const displayHandles = handles.map((handle, index) => {
      const percent = (handle.value - min) / (max - min)

      const isActive = focused === index || moving === index
      const isHovered = hovered === index
      const classNames = {
        handleHovered: isHovered,
        handleAtZero: percent === 0,
      }
      if (handle.readOnly || disabled) {
        classNames.handleDisabled = true
      } else if (isActive) {
        classNames.handleActive = true
      }
      return <div
        key={index}
        tabIndex={!!!handle.readOnly && !disabled ? 0 : null}

        onFocus={ev => this.handleHandleEvent(ev, 'focus', index)}
        onBlur={ev => this.handleHandleEvent(ev, 'blur', index)}
        onMouseOver={ev => this.handleHandleEvent(ev, 'mouseover', index)}
        onMouseOut={ev => this.handleHandleEvent(ev, 'mouseout', index)}
        className={classnames(classnames.bind(classes)('handle', classNames), handle.className)}
        style={{...styles.trackPosition(percent), ...handle.style}}
      />
    })
    if (reversed) {
      displayBars.reverse()
      displayHandles.reverse()
    }
    const ticks = []
    if (tickStep !== undefined) {
      for (let i = tickStart; i <= max; i += tickStep) {
        ticks.push(<div key={i} className={classnames(classes.tick)} style={styles.trackPosition((i - min) / (max - min))}/>)
      }
    }
    return <div
      draggable={false}
      id={id}
      className={classnames(classes.root, moving !== null && classes.moving, classes[horizontal ? 'horizontal' : 'vertical'], className)}
      style={style}
      onMouseOver={this.handleOnMouseOver}
      onMouseOut={this.handleOnMouseOut}
    >
      <input type='hidden'/>

      <ReliderKeyboard
        horizontal={horizontal}
        reversed={reversed}
        onAction={this.handleOnKeyboardAction}
      >
        <ReliderMouse
          className={classnames(classes.sliderContainer)}
          style={sliderStyle}
          onTouchStart={this.handleOnTouchStart}
          onTouchMove={this.handleOnTouchMove}
          onTouchEnd={this.handleOnTouchEnd}

          onMouseDown={this.handleOnMouseDown}
          onMouseUp={this.handleOnMouseUp}
          onMousePosition={this.handleOnMousePosition}
        >
          <div
            className={classnames(classes.trackContainer)}
          >
            {ticks}
            {displayBars}
            {displayHandles}
            <div className={classnames(classes.hover)} style={styles.trackPosition(mousePercent)}>
              <div className={classnames(classes.hoverPointer)}/>
              <div className={classnames(classes.hoverContainer, classes[hover.position === 'below' ? 'hoverBelow' : 'hoverAbove'])}>
                <div className={classnames(classes.hoverElement)}>
                  {hover.element(mouseValue, mousePercent)}
                </div>
              </div>
            </div>
          </div>
        </ReliderMouse>
      </ReliderKeyboard>
    </div>
  }
}

export default extendableStyles(styles)(Relider)
