var Args = new function () {

	var slice = [].slice;
	
	var check = function (object) {
		return typeof object !== 'undefined';
	};
	
	var countRequired = function (values) {
		for (var c = 0, i = values.length; i--;) {
			if (values[i] === required) c++;
		}
		return c;
	};

	var Args = function (args) {
		if (this instanceof Args) {
			this.args = args;
		} else return new Args(args);
	};
	Args.prototype = {
		allRequired: function () {
			var a = this.args;
			if (a.length != a.callee.length) {
				throw new TypeError(a.callee.length + ' args required, ' + a.length + ' given');
			}
			return this;
		},
		defaults: function () {
			var values = arguments,
			    args   = this.args,
			    a      = args.length,
			    v      = values.length,
			    rCount = countRequired(values),
			    params = slice.call(args, 0);
			if (a < rCount) throw new TypeError(rCount + ' args required, ' + a + ' given');
			
			for (var iV = 0, iA = 0; iV < v; iV++) {
				if (a > rCount) {
					args[iV] = check(params[iA]) ? params[iA] : values[iV];
					a--; iA++;
				} else if (values[iV] === required) {
					args[iV] = params[iA];
					rCount--;
					a--; iA++;
				} else {
					args[iV] = values[iV];
				}
			}
			
			args.length = values.length;
			
			return this;
		},
		cast: function () {
			var types = arguments, a = this.args, i = a.length;
			while (i--) {
				if (check(a[i]) && check(types[i])) {
					a[i] = types[i](a[i]);
				}
			}
			
			return this;
		},
		hinting: function () {
			var types = arguments, a = this.args, i = a.length;
			while (i--) {
				if (check(types[i])) {
					if (!a[i] || !(a[i] instanceof types[i])) {
						throw new TypeError('Wrong type of ' + (typeof a[i]) + ' ' + a[i] + '. Should be instance of ' + types[i]);
					}
				}
			}
			return this;
		}
	};
	
	var required = Args.required = { toString: function () { return '[object Required]'; }};
	return Args;
};