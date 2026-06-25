const assert = require( 'assert' );
const fs = require( 'fs' );

const grammar = JSON.parse(
	fs.readFileSync( 'syntaxes/zuzu.tmLanguage.json', 'utf8' )
);

function pattern( name ) {
	for ( const section of [ 'keywords', 'numbers', 'operators' ] ) {
		for ( const entry of grammar.repository[section].patterns ) {
			if ( entry.name === name ) {
				return new RegExp( entry.match, 'u' );
			}
		}
	}
	throw new Error( `No pattern named ${name}` );
}

const wordOperator = pattern( 'keyword.operator.word.zuzu' );
const arithmetic = pattern( 'keyword.operator.arithmetic.zuzu' );
const comparison = pattern( 'keyword.operator.comparison.zuzu' );
const logical = pattern( 'keyword.operator.logical.zuzu' );
const number = pattern( 'constant.numeric.zuzu' );
const wholeNumber = new RegExp(
	`^(?:${grammar.repository.numbers.patterns[0].match})$`,
	'u'
);

for ( const op of [
	'divides', 'nor', 'xnor', 'onlyif', 'butnot',
	'and?', 'or?', 'xor?', 'nand?', 'nor?', 'xnor?', 'onlyif?', 'butnot?',
] ) {
	assert.match( op, wordOperator, `${op} is a word operator` );
}

for ( const op of [ '∣', '∤' ] ) {
	assert.match( op, comparison, `${op} is a comparison operator` );
}

for ( const op of [ '#', '√' ] ) {
	assert.match( op, arithmetic, `${op} is an arithmetic operator` );
}

for ( const op of [
	'⊽', '⊽?', '↔', '↔?', '⊨', '⊨?', '⊭', '⊭?',
] ) {
	assert.match( op, logical, `${op} is a logical operator` );
}

for ( const literal of [ '0x1F', '0b1111', '0o100', '1E3', '2.5E-7' ] ) {
	assert.match( literal, number, `${literal} is a current numeric literal` );
}

for ( const literal of [ '0X1F', '0B1111', '0O100', '1e3' ] ) {
	assert.doesNotMatch(
		literal,
		wholeNumber,
		`${literal} is not a source numeric literal`
	);
}
