# Tailwind Direction

Tailwind Direction adds a custom `direction` variant to your tailwind project,
letting you have custom CSS rules for LTR and RTL layouts.

**Note: This package requires Tailwind >= v0.6.2, and is currently using experimental features which might break.**

# Getting started

Install the package via NPM/Yarn.

```bash
# Yarn
yarn add tailwindcss-dir --dev

# NPM
npm install tailwindcss-dir --save-dev
```

Then, enable `pluginVariants` in the `experiments` section of your Tailwind config.
**This is currently required due to variant plugins being in development and prone to changes.**

```js
experiments: {
	pluginVariants: true,
},
```

Now, setup the plugin in your Tailwind config's `plugins` section.
Currently the plugin doesn't offer any configuration.

```js
plugins: [
	require('tailwindcss-dir')(),
],
```

Finally, you can use the plugin and add it to modules you want to use it with.

```js
modules: {
	float: ['responsive', 'direction'],
	margin: ['responsive', 'direction'],
	padding: ['responsive', 'direction'],
},
```

# Usage

The plugin adds `ltr` and `rtl` variants to your modules. With the default Tailwind configuration, you can use them like so:

```html
<div class="text-green text-2xl ltr:pl-4 rtl:pr-4">
	Hello world.
</div>
```

# License

Tailwind Direction is licensed under the MIT license.
