function addSelectors(container, modifierFunction) {
	const rules = [];

	container.walkRules(rule => {
		const selectors = rule.selectors.map(selector => modifierFunction(selector.slice(1)));
		rules.push(rule.clone({ selectors }));
	});

	return rules;
}

function generator({ addVariant }) {
	addVariant('direction', ({ container, separator }) => {
		const result = container.clone({ nodes: [] });

		['ltr', 'rtl'].forEach(dir => {
			result.nodes = result.nodes.concat(
				addSelectors(container, className => {
					return `[dir='${dir}'] .${dir}${separator}${className}`;
				})
			);
		});

		return result;
	});
}

module.exports = function() {
	return generator;
};
