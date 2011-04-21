# Args javascript

Позволяет управлять аргументами в функции:

 * default values
 * casting
 * type hinting

### Default values:

	function test (foo, bar) {
		Args(arguments).defaults(100, 100);
		
		return [foo, bar];
	};
	
	test(    ); // 100, 100
	test(  42); //  42, 100
	test(1, 2); //   1,   2

#### Default values with required arguments

	function onkeypress (keyname, fn) {
		Args(arguments).defaults(null, Args.required);
		// Если передан только один аргумент - он присвоится fn
	}
	
	var listener = function () { alert(1) };
	
	onkeypress( 'enter', listener ); // if enter pressed
	onkeypress(          listener ); // if any key pressed
	onkeypress(); // Error: 1 args required, 0 given

### All arguments required
	function test (foo, bar, qux) {
		Args(arguments).allRequired();
	}
	
	test(1,2,3); // success
	test(1,2  ); // Error: 3 args required, 2 given
	
### Type casting

	// Function.from - MooTools method
	
	function addEvent (name, fn) {
		Args(arguments).cast(String, Function.from);
		
		console.log(typeof name); // string
		console.log(typeof fn  ); // function
	}
	
	addEvent('click', false);
	
### Type Hinting

	function test (foo, bar, qux) {
		Args(arguments).hinting(Foo, Bar, Qux);
	};
	
	test(new Foo(), new Bar(), new Qux()); // Success
	test(1,2,3); // Error