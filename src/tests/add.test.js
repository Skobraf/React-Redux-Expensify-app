const add = (a, b) => a + b;
const generateGreeting = (name) => 'hello $ {name}';

test('should add two numbers', () => {
	const result = generateGreeting("mike");
	expect(result).toBe('hello mike');


});