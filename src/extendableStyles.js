import React from 'react'
import injectSheet from 'react-jss'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default function extendableStyles(styles, {inject = [], ...options} = {}) {
  const wantedSheet = inject.indexOf('sheet')
  const injectSheetOptions = {
    ...options,
    inject: [].concat(inject, ['sheet'])
  }
  return function(Component) {
    const WrappedComponent = injectSheet(styles, injectSheetOptions)(class WrappedComponent extends React.Component {
      render() {
        const {classes: userClasses = {}, sheet, ...props} = this.props
        const {classes: sheetClasses} = sheet
        const mergedClasses = {...sheetClasses, ...Object.keys(userClasses).reduce((target, key) => {
          const additionalValue = userClasses[key]
          if (additionalValue) {
            target[key] = sheetClasses[key] + ' ' + additionalValue
          }
          return target
        }, {})}
        return <Component {...props} sheet={wantedSheet ? sheet : undefined} classes={mergedClasses}/>
      }
    })
    return hoistNonReactStatics(WrappedComponent, Component, {inner: true})
  }
}
