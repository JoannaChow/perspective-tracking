const RADIUS = 50;

let scene, camera, renderer, teapot;

//CAMERA
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

//RERENDER
renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xf0f0f0, 0);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

//LIGHTS
const light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
const light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
light1.position.set( 1, 1, 1 ).normalize();
light2.position.set( 0, 1, 1 ).normalize();

//MATERIAL
const materialColor = new THREE.Color( 0xE6D291 );
phongMaterial = new THREE.MeshPhongMaterial( { color: materialColor, side: THREE.DoubleSide } );

//GEOMETRY
const teapotGeometry = new TeapotBufferGeometry();
teapot = new THREE.Mesh( teapotGeometry, phongMaterial );

//SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 );
scene.add( light1 );
scene.add( light2 );
scene.add( teapot );

let theta = 0;
let delta = 0;
const cx = window.innerWidth / 2;
const cy = window.innerHeight / 2;
camera.position.z = RADIUS;

function moveCamera(results) {
	if (!results)
		return;

	const resizeResults = faceapi.resizeResults(results, { width: window.innerWidth, height: window.innerHeight });
	const dx = cx - (resizeResults['_box']['_x'] + resizeResults['_box']['_width'] / 2);
	const dy = cy - (resizeResults['_box']['_y'] + resizeResults['_box']['_height'] / 2);
	theta = (dx / window.innerWidth) * 2 * Math.PI;
	delta = (dy / window.innerHeight) * Math.PI / 2;
	camera.position.x = RADIUS * Math.sin( theta );
	light1.position.x = camera.position.x;
	camera.position.y = RADIUS * Math.sin( delta );
	light1.position.y = camera.position.y;
	camera.position.z = RADIUS * Math.cos( theta );
	light1.position.z = camera.position.z;
	
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
