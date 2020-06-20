const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const config = require('./config');

function expectMatch(input, output) {
	return postcss([tailwindcss(config)])
		.process(input, { from: undefined })
		.then((result) => {
			expect(result.css).toMatchCss(output);
			expect(result.warnings().length).toBe(0);
		});
}
test('it generates direction variants', () => {
	const input = `
		@variants direction {
			.banana { color: yellow; }
			.tomato { color: red; }
		}
	`;

	const output = `
		.banana {
			color: yellow;
		}

		.tomato {
			color: red;
		}

		[dir='ltr'] .ltr\\:banana,
		[dir='ltr'].ltr\\:banana {
			color: yellow;
		}

		[dir='ltr'] .ltr\\:tomato,
		[dir='ltr'].ltr\\:tomato {
			color: red;
		}

		[dir='rtl'] .rtl\\:banana,
		[dir='rtl'].rtl\\:banana {
			color: yellow;
		}

		[dir='rtl'] .rtl\\:tomato,
		[dir='rtl'].rtl\\:tomato {
			color: red;
		}
	`;

	return expectMatch(input, output);
});

test('it generates rtl variant', () => {
	const input = `
		@variants rtl {
			.banana { color: yellow; }
			.tomato { color: red; }
		}
	`;

	const output = `
		.banana {
			color: yellow;
		}

		.tomato {
			color: red;
		}

		[dir='rtl'] .rtl\\:banana,
		[dir='rtl'].rtl\\:banana {
			color: yellow;
		}

		[dir='rtl'] .rtl\\:tomato,
		[dir='rtl'].rtl\\:tomato {
			color: red;
		}
	`;

	return expectMatch(input, output);
});

test('it generates ltr variant', () => {
	const input = `
		@variants ltr {
			.banana { color: yellow; }
			.tomato { color: red; }
		}
	`;

	const output = `
		.banana {
			color: yellow;
		}

		.tomato {
			color: red;
		}

		[dir='ltr'] .ltr\\:banana,
		[dir='ltr'].ltr\\:banana {
			color: yellow;
		}

		[dir='ltr'] .ltr\\:tomato,
		[dir='ltr'].ltr\\:tomato {
			color: red;
		}
	`;

	return expectMatch(input, output);
});
