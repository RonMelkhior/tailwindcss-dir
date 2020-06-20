function addSelectors(container, modifierFunction) {
	const rules = [];

	container.walkRules((rule) => {
		const selectors = rule.selectors.map((selector) => modifierFunction(selector.slice(1)));
		rules.push(rule.clone({ selectors }));
	});

	return rules;
}

const RTL_VARIANT = 'rtl';
const LTR_VARIANT = 'ltr';

function generator({ addVariant, e }) {
	addVariant('direction', variantGenerator([LTR_VARIANT, RTL_VARIANT]));
	addVariant(LTR_VARIANT, variantGenerator([LTR_VARIANT]));
	addVariant(RTL_VARIANT, variantGenerator([RTL_VARIANT]));

	function variantGenerator(variants) {
		return ({ container, separator }) => {
			const result = container.clone({ nodes: [] });

			variants.forEach((dir) => {
				result.nodes = result.nodes.concat(
					addSelectors(container, (className) => {
						return [
							`[dir='${dir}'] .${dir}${e(separator)}${className}`,
							`[dir='${dir}'].${dir}${e(separator)}${className}`,
						];
					})
				);
			});

			return result;
		};
	}
}

module.exports = function () {
	return generator;
};
