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

	if (parseFloat(this.a.toPrecision(4))==0){
		this.a = 0;
		this.exp = 0;
		return;
	}

	// Round down
	while (Math.abs(this.a)>10){
		this.a /= 10;
		this.exp ++;
	}

	// Round up
	while (Math.abs(this.a)<1 && Math.abs(this.a)>0){
		this.a *= 10;
		this.exp --;
	}

	this.a = parseFloat(this.a.toPrecision(4));
	this.exp = parseInt(this.exp);
}


TinyFloat.add = function(a,b){
	a.resolve();
	b.resolve();

	if (a.a==0) return b;
	if (b.a==0) return a;

	if (a.exp != b.exp){
		// Equalize exponentials
		var expDiff = Math.abs(a.exp-b.exp);
		if (expDiff>=6){
			// Too large difference, the smaller number is omitted
			if (TinyFloat.greater(a,b))
				return a;
			else
				return b;
		}
		else{
			var newexp = Math.min(a.exp,b.exp);
			while (a.exp>newexp){
				a.a *= 10;
				a.exp --;
			}
			while (b.exp>newexp){
				b.a *= 10;
				b.exp --;
			}
		}
	}

	var newval = new TinyFloat(a.a + b.a, a.exp);
	newval.resolve();
	return newval;
}

TinyFloat.subtract = function(a,b){

	return TinyFloat.add(a, new TinyFloat(-b.a, b.exp));
}


TinyFloat.mul = function(a,b){
	if (typeof(a)=='number') a = new TinyFloat(a,0);
	if (typeof(b)=='number') b = new TinyFloat(b,0);
	var result = new TinyFloat(a.a*b.a, a.exp+b.exp);
	result.resolve();
	return result;
}

TinyFloat.div = function(a,b){
	if (typeof(b)=='number') b = new TinyFloat(b,0);
	var divider = new TinyFloat(1/b.a,-b.exp);
	return TinyFloat.mul(a,divider);
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

TinyFloat.opr = function(a,k,b){
	if (k=='+') return TinyFloat.add(a,b);
	else if (k=='-') return TinyFloat.subtract(a,b);
	else if (k=='*') return TinyFloat.mul(a,b);
	else if (k=='/') return TinyFloat.div(a,b);
	else if (k=='^2') return TinyFloat.sqr(a);
	else return a;
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

TinyFloat.v = function(a){
	if (a.a==0) return 0;
	else return a.a * Math.pow(10,a.exp);
}


if (typeof(module)!='undefined')
	module.exports = TinyFloat;

