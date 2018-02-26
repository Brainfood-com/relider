const palette = {
  primary: {
    light: '#00c689',
    main: '#00ed65',
    dark: '#008d91',
  },
  secondary: {
    light: '#e51837',
    main: '#da2929',
    dark: '#c40522',
  },
}
const unit = 8

export default {
  relider: {
    handleColorZero: palette.primary.light,      // done
    handleFillColor: palette.secondary.dark,      // done
    handleSize: unit * 1.5,           // done
    handleSizeDisabled: unit,   // done
    handleSizeActive: unit * 2,     // done
    trackSize: unit / 4,            // done
    trackColor: palette.primary.light,           // done
    trackColorSelected: palette.secondary.light,   // done
    rippleColor: palette.primary.main,
    selectionColor: palette.primary.main,       // done
    handleBorderWidth: 0,
    handleBorderColor: 'transparent',
  },
  transitions: {
    create: function(props) {
      return props.map(prop => `${prop} 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`).join(',')
    },
  },
}
