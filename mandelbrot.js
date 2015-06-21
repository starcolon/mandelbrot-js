/**
 * Mandelbrot render project
 * by StarColon Projects*:
 * ----------------------------------------------------------
 * Dependencies: Raphaël.js
 */

function render(size,bound,maxIter){
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
	for (var u=-size/2; u<size/2; u++)
		for (var v=-size/2; v<size/2; v++){
			var c = canvasCoordToPlaneCoord(u, v, bound, size);
			// Generate Mandelbrot sequence from this coordinate
			operations.push(new Promise(function(resolve,reject){
				mandelbrot(c, bound, size, paper, maxIter);
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


function canvasCoordToPlaneCoord(u,v,bound,size){
	return {
		re: (u-(size/2))*bound/(size/2),
		im: (v-(size/2))*bound/(size/2)
	}
}

function planeCoordToCanvasCoord(z,bound,size){
	var s = (size/2)/bound;
	return {
		x: size/2 + s*Re(z), 
		y: size/2 + s*Im(z)
	}
}

function mandelbrot(c,bound,size,paper,maxIter){
	var iter = 0;
	var z = {re: 0, im: 0};
	while (Abs(z)<bound && iter<maxIter){
		// Generate the next set element
		z = nextMandelbrot(z, c);
		++iter;
	}

	// If the iteration does not exceed the maximum constraint,
	// then it is a member of the set
	if (iter<maxIter){
		var coord = planeCoordToCanvasCoord(c, bound, size);
		var intensity = 255 - (255*iter/maxIter);
		var R = parseInt(intensity);
		var G = parseInt(Math.ceil(intensity*0.25));
		var B = parseInt(Math.ceil(intensity*0.3));
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
	return Math.sqrt(Re(z)*Re(z) + Im(z)*Im(z))
}

function sqr(z){
	return {re: Re(z)*Re(z) - Im(z)*Im(z),im: 2*Re(z)*Im(z)}
}

function add(z,c){
	return {re: Re(z)+Re(c), im: Im(z)+Im(c)}
}

