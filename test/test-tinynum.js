/**
 * TinyNum - tester
 * ------------------------------------------------------
 * This test suite can be executed on "mocha" only.
 */

var expect = require('expect.js');
var TinyFloat = require('../lib/tinynum.js');

//-------------------------------------------------------

describe('tinynum module tests', function(){
	describe('basic tinyfloat tests', function(){
		it('should initialize the tiny num with appropriate notations', function(){
			var v1 = new TinyFloat(1, -15);
			var v2 = new TinyFloat(2.2, -16);
			expect(TinyFloat.greater(v1,v1)).to.be.true;
		})

		it('should normalize a tiny float correctly', function(){
			var v = new TinyFloat(88825, -20);
			v.resolve();
			expect(v.a).to.be.equal(8.8825);
			expect(v.exp).to.be.equal(-16);
		})

		it('should add two tiny floats',function(){
			var v1 = new TinyFloat(25, 0);
			var v2 = new TinyFloat(111,1);
			var v3 = TinyFloat.add(v1,v2);
			expect(v3.a).to.be.equal(1.135);
			expect(v3.exp).to.be.equal(3);
		})

		it('should add two tiny floats (2)', function(){
			var v1 = new TinyFloat(7, -41);
			var v2 = new TinyFloat(-6, -23);
			var v3 = TinyFloat.add(v1,v2);
			expect(v3.exp).to.be.equal(-23);
		})

		it('should add/subtract two tiny floats (3)', function(){
			var v1 = new TinyFloat(7, -41);
			var v2 = new TinyFloat(-6, -43);
			var v3 = TinyFloat.add(v1,v2);
			var v4 = TinyFloat.subtract(v1, v2);
			expect(v3.exp).to.be.equal(-41);
			expect(v4.exp).to.be.equal(-41);
		})


		it('should multiply two tiny floats', function(){
			var v1 = new TinyFloat(3, 8);
			var v2 = new TinyFloat(2, -12);
			var v3 = TinyFloat.mul(v1,v2);
			expect(v3.a).to.be.equal(6);
			expect(v3.exp).to.be.equal(-4);
		})

		it('should power a tiny float by 2', function(){
			var v1 = new TinyFloat(0.00000025);
			var v2 = TinyFloat.sqr(v1);
			expect(v2.a).to.be.equal(6.25);
			expect(v2.exp).to.be.equal(-14);
		})

	})
})