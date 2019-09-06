const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const config = require('./config');

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

	return postcss([tailwindcss(config)])
		.process(input, { from: undefined })
		.then(result => {
			expect(result.css).toMatchCss(output);
			expect(result.warnings().length).toBe(0);
		});
});
