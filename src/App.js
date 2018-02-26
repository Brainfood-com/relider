import React from 'react'
import classnames from 'classnames'

import Relider from './Relider'
import extendableStyles from './extendableStyles'

const styles = theme => ({
  root: {
    display: 'flex',
    height: 600,
    alignItems: 'center',
    background: '#777777',
  },
  column: {
    display: 'inline-block',
    width: '50%',
  },
  slider: {
    boxSizing: 'border-box',
    padding: 0,
  },
  hover: {
    border:'1px solid white',
    borderRadius: 10,
    padding: 5,
    minHeight: 40,
    minWidth: 40,
  },
})

class App extends React.Component {
  state = {
    'true-false': {
      handles: [{value: 0}, {value: 25, readOnly: true}],
    },
    'true-true': {
      handles: [{value: 30, readOnly: true}, {value: 100}],
    },
    'false-false': {
      handles: [{value: 0}, {value: 65, readOnly: true}],
    },
    'false-true': {
      handles: [{value: 70, readOnly: true}, {value: 100}],
    },
  }

  handleOnChange = (name, handles) => {
    this.setState({[name]: {...this.state[name], handles}})
  }

  renderSlider(horizontal, reversed, style) {
    const {classes} = this.props
    const name = `${horizontal}-${reversed}`

    return <Relider
      classes={{
        root: classes.slider,
      }}
      style={style}
      min={0}
      max={100}
      tickStep={5}
      bars={[
        {value:30, style:{background: 'linear-gradient(to right, #008d91, #00ed65)'}},
        {value:60, style:{background: 'linear-gradient(to right, #008d91, #ffaaaa)'}},
      ]}
      horizontal={horizontal}
      reversed={reversed}
      handles={this.state[name].handles}
      onChange={handles => this.handleOnChange(name, handles)}

      hover={{
        position: reversed ? 'below' : 'above',
        element: (value, percent) => <div className={classes.hover}>
          <h4>Test: {value}</h4>
          {percent}
        </div>,
      }}
    />
  }

  render() {
    const {classes, className, ...props} = this.props
    return <div className={classnames(classes.root, className)}>
      <div className={classes.column}>
        {this.renderSlider(true, false, {})}
        {this.renderSlider(true, true, {})}
      </div>
      <div className={classes.column}>
        {this.renderSlider(false, false, {display:'inline-block'})}
        {this.renderSlider(false, true, {display:'inline-block'})}
      </div>
    </div>
  }
}

export default extendableStyles(styles)(App)
