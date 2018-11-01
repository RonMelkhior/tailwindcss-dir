const defaultConfig = require('tailwindcss/defaultConfig.stub');
const plugin = require('../src/index');

module.exports = {
	...defaultConfig,
	plugins: [plugin()],
};
