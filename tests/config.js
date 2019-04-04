const defaultConfig = require('tailwindcss/defaultConfig');
const plugin = require('../src/index');

module.exports = {
	...defaultConfig,
	plugins: [plugin()],
};
