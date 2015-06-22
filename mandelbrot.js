/**
 * Mandelbrot render project
 * by StarColon Projects*:
 * ----------------------------------------------------------
 * Dependencies: Raphaël.js
 */


var _ = TinyFloat;

function render(size,bound,center,maxIter){
	console.log('bound = ' + parseFloat(bound).toFixed(3));

	// Initialize the canvas
	var paper = Raphael(0,0,size,size);
	var fullrect = paper.rect(0,0,size,size);
	fullrect.attr({
		stroke: "none", 
		fill: "black"
	});

	// Draw axes
	paper.path( ["M", 0, size/2, "L", size, size/2 ] ).attr({stroke: 'rgb(50,50,50)'});
	paper.path( ["M", size/2, 0, "L", size/2, size ] ).attr({stroke: 'rgb(50,50,50)'});
	paper.circle(size/2,size/2,size/2).attr({stroke: 'rgb(50,50,50)'});

	var operations = [];
	var iter = 0;
	console.log('sequencing ...');
	for (var u=0; u<size; u++)
		for (var v=0; v<size; v++){
			var c = canvasCoordToPlaneCoord(u, v, center, bound, size);
			// Generate Mandelbrot sequence from this coordinate
			operations.push(new Promise(function(resolve,reject){
				mandelbrot(center, c, bound, size, paper, maxIter);
				resolve();
			}));
		}

	console.log('sequenced!!...');
	console.log('start processing...');

	Promise.all(operations).then(function(resolve,reject){
		console.log('done!.');
		alert('Render completed');
	});
}


function canvasCoordToPlaneCoord(u,v,center,bound,size){
	var halfsize = _.div2(size);
	var k = _.add(u,-halfsize);
	return {
		re: _.add(_.mul(k,_.div(bound,halfsize)),Re(center)), 
		im: _.add(_.mul(k,_.div(bound,halfsize)),Im(center))
		///re: parseFloat(u-(size/2))*bound/parseFloat(size/2) + Re(center),
		///im: parseFloat(v-(size/2))*bound/parseFloat(size/2) + Im(center)
	}
}

function planeCoordToCanvasCoord(z,center,bound,size){
	var halfsize = _.div2(size);
	var s = _.div(halfsize,bound);
	return {
		x: _.add(halfsize, _.mul(s, _.add(Re(z),-Re(center)))),
		y: _.add(halfsize, _.mul(s, _.add(Im(z),-Im(center))))
		///x: size/2 + s*(Re(z) - Re(center)), 
		///y: size/2 + s*(Im(z) - Im(center))
	}
}

function mandelbrot(center,c,bound,size,paper,maxIter){
	var iter = 0;
	var z = {re: 0, im: 0};
	while (_.less(Abs(z),bound) && iter<maxIter){
		// Generate the next set element
		z = nextMandelbrot(z, c);
		++iter;
	}

	// If the iteration does not exceed the maximum constraint,
	// then it is a member of the set
	if (iter<maxIter){
		var coord = planeCoordToCanvasCoord(c, center, bound, size);
		var ratio = 10 - Math.log(parseFloat(iter)/parseFloat(maxIter))/10;
		var R = 200;
		var G = parseInt(ratio*255);
		var B = 0;
		function showCoord(cx){
			return function(event){
				console.log('> ' + _.str(Re(cx)) + ' : ' + _.str(Im(cx))+'i');
			}
		}
		paper.circle(coord.x, coord.y, 1).attr({
			fill: 'rgba('+R+','+G+','+B+',0.8)', 
			stroke: 'none'
		});
	}
}


function nextMandelbrot(z0,c0){
	return add(sqr(z0),c0);
}


function Re(z){
	return z.re;
}

function Im(z){
	return z.im;
}

function Abs(z){
	var re2 = _.sqr(Re(z));
	var im2 = _.sqr(Im(z));
	return _.sqrt(_.add(re2,im2));
}

function sqr(z){
	var mul2 = function(s){ return _.mul(s,new _(2)) }
	return {
		re: _.add(_.sqr(Re(z)),-_.sqr(Im(z))),
		im: _.mul2(_.mul(Re(z),Im(z)))
	}
}

function add(z,c){
	return {re: _.add(Re(z),Re(c)), im: _.add(Im(z),Im(c))}
}

