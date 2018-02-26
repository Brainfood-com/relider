A slider for react, using jss for theming.

First pass, still a bit of a WIP.

Integrating with your react-based app:

In your theme passed to `ThemeProvider`, you'll need the following stanza:

```javascript
theme.relider = {
	handleColorZero: palette.primary.light,
	handleFillColor: palette.secondary.dark,
	handleSize: spacing.unit * 1.5,
	handleSizeDisabled: spacing.unit,
	handleSizeActive: spacing.unit * 2,
	trackSize: spacing.unit / 4,
	trackColor: palette.primary.light,
	trackColorSelected: palette.secondary.light,
	rippleColor: palette.primary.main,
	selectionColor: palette.primary.main,
	handleBorderWidth: 0,
	handleBorderColor: 'transparent',
},
theme.transitions = {
	create: function(props) {
		return props.map(prop => `${prop} 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`).join(',')
	},
}

```
The above example contains pieces of `material-ui` variables; if that
is your chosen gui, then the above will be close to what you need.
Note, that the `transitions` piece is not needed in material-ui.

This repository does *not* published transpiled variants.  You'll need
to update your webpack(or other) system to allow for this.  An example of this follows.

```javascript
loaders: [
	{
		test: /node_modules\/relider\/.*\.jsx?$/,
		loader: 'babel-loader',
		query: {
			presets: ['react', 'es2015', 'stage-2']
		}
	}, {
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
			presets: ['react', 'es2015', 'stage-2']
		}
	},
],
```

You can see a working example by checking out the source, installing the deps, then doing `npm start`.





