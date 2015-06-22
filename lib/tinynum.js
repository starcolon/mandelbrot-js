/**
 * Tiny number library 
 * by StarColon Projects*:
 * 2015
 */


/**
 * Create a tiny float notation of: a x 10^exp 
 */
var TinyFloat = function(a,exp){
	this.a = a || 0;
	this.exp = exp || 0;
	this.resolve();
	return this;
}

TinyFloat.prototype.a = 0;
TinyFloat.prototype.exp = 0;

TinyFloat.prototype.resolve = function(){

	// Round down
	while (Math.abs(this.a)>10){
		this.a /= 10;
		this.exp ++;
	}

	// Round up
	while (Math.abs(this.a)<1){
		this.a *= 10;
		this.exp --;
	}

	this.a = parseFloat(this.a.toPrecision(6));
	this.exp = parseInt(this.exp);
}


TinyFloat.add = function(a,b){
	a.resolve();
	b.resolve();
	if (a.exp>b.exp){
		while (a.exp>b.exp){
			a.exp--;
			a.a *= 10;
		}
	}
	else if (a.exp<b.exp){
		while (a.exp<b.exp){
			b.exp--;
			b.a *= 10;
		}
	}

	var newval = new TinyFloat(a.a + b.a, a.exp);
	newval.resolve();
	return newval;
}


TinyFloat.mul = function(a,b){
	var result = new TinyFloat(a.a*b.a, a.exp+b.exp);
	result.resolve();
	return result;
}

TinyFloat.div = function(a,b){
	var divider = new TinyFloat(b.a,-b.exp);
	return TinyFloat.mul(a,b);
}

TinyFloat.div2 = TinyFloat.half = function(a){
	return TinyFloat.div(a,new TinyFloat(2,0));
}

TinyFloat.sqr = function(a){
	return TinyFloat.mul(a,a);
}

TinyFloat.sqrt = function(a){
	// Round down until the exponent of a becomes even number
	while (a.exp%2>0){
		a.exp--;
		a.a *= 10;
	}

	a.a = Math.sqrt(a.a);
	a.exp /= 2;
	a.resolve();
	return a;
}

TinyFloat.greater = function(a,b){
	a.resolve();
	b.resolve();
	if (a.exp>b.exp)
		return true;
	else if (a.exp<b.exp)
		return false;
	else
		return a.a > b.a;
}

TinyFloat.less = function(a,b){
	a.resolve();
	b.resolve();
	if (a.exp>b.exp)
		return false;
	else if (a.exp<b.exp)
		return true;
	else
		return a.a < b.a;
}

TinyFloat.str = function(a){
	if (a.a==0) return "0";
	a.resolve();
	if (a.exp>0) return a.a.toString() + "E+" + a.exp.toString();
	else if (a.exp<0) return a.a.toString() + "E" + a.exp.toString();
	else return a.a.toString();
}


if (typeof(module)!='undefined')
	module.exports = TinyFloat;

