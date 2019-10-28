"use strict";

/**	Available variables:
 * 		- `value`
 * 		- `field`
 * 		- `errors`
 */
module.exports = function(schema, path, messages) {
	const src = [];

	if (schema.field) {
		if (schema.strict) {
			src.push(`
				if (value !== parent["${schema.field}"]) {
			`);
		} else {
			src.push(`
				if (value != parent["${schema.field}"]) {
			`);
		}
		src.push(`
				${this.makeError({ type: "equalField", field: path, actual: "value", expected: JSON.stringify(schema.field), messages })}
			}
		`);
	} else {
		if (schema.strict) {
			src.push(`
				if (value !== ${JSON.stringify(schema.value)}) {
			`);
		} else {
			src.push(`
				if (value != ${JSON.stringify(schema.value)}) {
			`);
		}
		src.push(`
				${this.makeError({ type: "equalValue", field: path, actual: "value", expected: JSON.stringify(schema.value), messages })}
			}
		`);
	}

	return {
		source: src.join("\n")
	};
};