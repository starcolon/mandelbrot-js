/**
 * Tiny number library 
 * by StarColon Projects*:
 * 2015
 */


/**
 * Create a tiny float notation of: a x 10^exp 
 */
var TinyFloat = function(a,exp){
	this.prototype.a = a;
	this.prototype.exp = exp;
}

TinyFloat.prototype.resolve = function(){
	// Round down
	while (Math.abs(this.a)>10){
		this.a /= 10;
		this.exp ++;
	}

	// Round up
	while (Math.abs(this.a)<10){
		this.a *= 10;
		this.exp --;
	}
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

TinyFloat.sqr = function(a){
	return TinyFloat.mul(a,a);
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


if (typeof(modules)!='undefined')
	modules.exports = TinyFloat;

