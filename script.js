
//THREEJS RELATED VARIABLES 

var scene, 
    camera,
    controls,
    fieldOfView,
  	aspectRatio,
  	nearPlane,
  	farPlane,
    shadowLight, 
    backLight,
    light, 
    renderer,
    container;

//SCENE
var floor, cat = false;

//SCREEN VARIABLES

var HEIGHT,
  	WIDTH,
    windowHalfX,
  	windowHalfY,
    mousePos = {x:0,y:0};
    dist = 0;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init(){
  scene = new THREE.Scene();
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000; 
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane);
  camera.position.z = 800;  
  camera.position.y = 0;
  camera.lookAt(new THREE.Vector3(0,0,0));    
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  container = document.getElementById('scene');
  container.appendChild(renderer.domElement);
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('touchmove',handleTouchMove, false);
  mousePos = { x: windowHalfX, y: windowHalfY }
}

function onWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
  mousePos = {x:event.clientX, y:event.clientY};
}

function handleTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
    isBlowing = true;
  }
}

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
  
  shadowLight = new THREE.DirectionalLight(0xffffff, .8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = .2;
 	
  backLight = new THREE.DirectionalLight(0xffffff, .4);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = .1;
  backLight.castShadow = true;
 	
  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFloor(){ 
  floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.MeshBasicMaterial({color: 0xebe5e7}));
  floor.rotation.x = -Math.PI/2;
  floor.position.y = -100;
  floor.receiveShadow = true;
  scene.add(floor);
}

function createCat(){
  cat = new Cat();
  setTimeout(cat.blink, 1000);
  scene.add(cat.threegroup);
}

Cat = function(){

  this.threegroup = new THREE.Group();
  this.yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xfdd276, 
    shading:THREE.FlatShading
  });
  this.redMat = new THREE.MeshLambertMaterial ({
    color: 0xad3525, 
    shading:THREE.FlatShading
  });
  
  this.pinkMat = new THREE.MeshLambertMaterial ({
    color: 0xcea6a6,
    shading:THREE.FlatShading
  });
  
  this.whiteMat = new THREE.MeshLambertMaterial ({
    color: 0xffffff, 
    shading:THREE.FlatShading
  });
  
  this.purpleMat = new THREE.MeshLambertMaterial ({
    color: 0x451954, 
    shading:THREE.FlatShading
  });
  
  this.greyMat = new THREE.MeshLambertMaterial ({
    color: 0xaaaaaa,
    shading:THREE.FlatShading
  });
  
  this.blackMat = new THREE.MeshLambertMaterial ({
    color: 0x302925, 
    shading:THREE.FlatShading
  });

  this.brownMat = new THREE.MeshLambertMaterial ({
    color: 0x51392c,
    shading:THREE.FlatShading
  });
  
  var bodyGeom = new THREE.CylinderGeometry(20,60, 170, 100);
  var faceGeom = new THREE.BoxGeometry(60,60,60);
  var mustacheGeom = new THREE.BoxGeometry(50,1,1);

  var earGeom = new THREE.CylinderGeometry( 1, 17, 17, 4 )
  var innerEarGeom = new THREE.CylinderGeometry( 1, 15, 15, 4 )
  var noseGeom = new THREE.BoxGeometry(12,12,20);
  var eyeGeom = new THREE.BoxGeometry(5,25,25);
  var irisGeom = new THREE.BoxGeometry(4,10,10);
  var mouthGeom = new THREE.BoxGeometry(30,2,30);
  var handGeom = new THREE.BoxGeometry(15, 90, 15);
    var kneeGeom = new THREE.BoxGeometry(20, 80, 80);
  kneeGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
  var footGeom = new THREE.BoxGeometry(20, 20, 40);
  
  // body
  this.body = new THREE.Mesh(bodyGeom, this.brownMat);
  this.body.position.z = 50;
  this.body.position.y = -10;

  // knees
  this.leftKnee = new THREE.Mesh(kneeGeom, this.brownMat);
  this.leftKnee.position.x = 45;
  this.leftKnee.position.z = 90;
  this.leftKnee.position.y = -110;
  
  this.rightKnee = new THREE.Mesh(kneeGeom, this.brownMat);
  this.rightKnee.position.x = -45;
  this.rightKnee.position.z = 90;
  this.rightKnee.position.y = -110;

  // hands
  this.leftHand = new THREE.Mesh(handGeom, this.brownMat);
  this.leftHand.position.x = 12;
  this.leftHand.position.z = 95;
  this.leftHand.position.y = -50;
  this.leftHand.rotation.x = -.4;


  this.rightHand = new THREE.Mesh(handGeom, this.brownMat);
  this.rightHand.position.x = -12;
  this.rightHand.position.z = 95;
  this.rightHand.position.y = -50;
  this.rightHand.rotation.x = -.4;
  
  // feet
  this.backLeftFoot = new THREE.Mesh(footGeom, this.whiteMat);
  this.backLeftFoot.position.z = 130;
  this.backLeftFoot.position.x = 45;
  this.backLeftFoot.position.y = -90;
  
  this.backRightFoot = new THREE.Mesh(footGeom, this.whiteMat);
  this.backRightFoot.position.z = 130;
  this.backRightFoot.position.x = -45;
  this.backRightFoot.position.y = -90;
  
  this.frontRightFoot = new THREE.Mesh(footGeom, this.whiteMat);
  this.frontRightFoot.position.z = 100;
  this.frontRightFoot.position.x = -12;
  this.frontRightFoot.position.y = -90;
  
  this.frontLeftFoot = new THREE.Mesh(footGeom, this.whiteMat);
  this.frontLeftFoot.position.z = 100;
  this.frontLeftFoot.position.x = 12;
  this.frontLeftFoot.position.y = -90;
  

  // face
  this.face = new THREE.Mesh(faceGeom, this.brownMat);
  this.face.position.z = 135;
  this.face.rotation.y = Math.PI/4

  // Mustaches
  this.mustaches = [];
  
  this.mustache1 = new THREE.Mesh(mustacheGeom, this.greyMat);
  this.mustache1.position.x = 20;
  this.mustache1.position.y = -5;
  this.mustache1.position.z = 165;
  this.mustache1.rotation.z = .1;
  this.mustache2 = this.mustache1.clone();
  this.mustache2.position.x = 25;
  this.mustache2.position.y = -10;
  this.mustache2.position.z = 167;
  this.mustache3 = this.mustache1.clone();
  this.mustache3.position.y = -15;
  this.mustache3.position.x = 20;
  this.mustache4 = this.mustache1.clone();
  this.mustache4.rotation.z = Math.PI;
  this.mustache4.position.x = -20;
  this.mustache4.rotation.z = -.1;
  this.mustache5 = new THREE.Mesh(mustacheGeom, this.blackMat);
  this.mustache5 = this.mustache2.clone();
  this.mustache5.position.x = -25;
  this.mustache5.rotation.z = -.1;
  this.mustache6 = new THREE.Mesh(mustacheGeom, this.blackMat);
  this.mustache6 = this.mustache3.clone();
  this.mustache6.rotation.z = -.1;
  this.mustache6.position.x = -20;
  
  this.mustaches.push(this.mustache1);
  this.mustaches.push(this.mustache2);
  this.mustaches.push(this.mustache3);
  this.mustaches.push(this.mustache4);
  this.mustaches.push(this.mustache5);
  this.mustaches.push(this.mustache6);
    

  // eyes
  this.leftEye = new THREE.Mesh(eyeGeom, this.whiteMat);
  this.leftEye.position.x = 14;
  this.leftEye.position.z = 160;
  this.leftEye.position.y = 10;
  this.leftEye.rotation.y = -Math.PI/4
  
  this.rightEye = new THREE.Mesh(eyeGeom, this.whiteMat);
  this.rightEye.position.x = -14;
  this.rightEye.position.z = 160;
  this.rightEye.position.y = 10;
  this.rightEye.rotation.y = Math.PI/4
  
  // iris
  this.leftIris = new THREE.Mesh(irisGeom, this.brownMat);
  this.leftIris.position.x = 14;
  this.leftIris.position.z = 161;
  this.leftIris.position.y = 10;
  this.leftIris.rotation.y = -Math.PI/4
  
  this.rightIris = new THREE.Mesh(irisGeom, this.brownMat);
  this.rightIris.position.x = -14;
  this.rightIris.position.z = 161;
  this.rightIris.position.y = 10;
  this.rightIris.rotation.y = Math.PI/4

  // mouth
  this.mouth = new THREE.Mesh(mouthGeom, this.pinkMat);
  this.mouth.position.z = 158;
  this.mouth.position.y = -21;
  this.mouth.rotation.y = Math.PI/4;
  this.mouth.rotation.x = 0.2;
  
  // ears
  this.rightEar = new THREE.Mesh(earGeom, this.brownMat);
  this.rightEar.position.x = -25;
  this.rightEar.position.y = 30;
  this.rightEar.position.z = 126;
  this.rightEar.rotation.x = -Math.PI/2
  this.rightEar.rotation.y = -Math.PI/2;

  this.leftEar = new THREE.Mesh(earGeom, this.brownMat);
  this.leftEar.position.x = 25;
  this.leftEar.position.y = 30;
  this.leftEar.position.z = 126;
  this.leftEar.rotation.x = -Math.PI/2
  this.leftEar.rotation.y = -Math.PI/2;

  // inner ear
  this.rightInnerEar = new THREE.Mesh(innerEarGeom, this.pinkMat);
  this.rightInnerEar.position.x = -25;
  this.rightInnerEar.position.y = 30;
  this.rightInnerEar.position.z = 128;
  this.rightInnerEar.rotation.x = -Math.PI/2
  this.rightInnerEar.rotation.y = -Math.PI/2;

  this.leftInnerEar = new THREE.Mesh(innerEarGeom, this.pinkMat);
  this.leftInnerEar.position.x = 25;
  this.leftInnerEar.position.y = 30;
  this.leftInnerEar.position.z = 128;
  this.leftInnerEar.rotation.x = -Math.PI/2
  this.leftInnerEar.rotation.y = -Math.PI/2;
  
  // nose
  this.nose = new THREE.Mesh(noseGeom, this.pinkMat);
  this.nose.position.z = 170;
  this.nose.position.y = -9;
  
  // head
  this.head = new THREE.Group();
  this.head.add(this.face);
  this.head.add(this.rightEar);
  this.head.add(this.leftEar);
  this.head.add(this.nose);
  this.head.add(this.leftEye);
  this.head.add(this.rightEye);
  this.head.add(this.leftInnerEar);
  this.head.add(this.rightInnerEar);
  this.head.add(this.leftIris);
  this.head.add(this.rightIris);
  this.head.add(this.mouth);
  this.head.add(this.mustache1);
  this.head.add(this.mustache2);
  this.head.add(this.mustache3);
  this.head.add(this.mustache4);
  this.head.add(this.mustache5);
  this.head.add(this.mustache6);
  
  this.head.position.y = 60;
  this.head.position.z = -160;
  
  this.threegroup.add(this.body);
  this.threegroup.add(this.head);
  this.threegroup.add(this.leftHand);
  this.threegroup.add(this.rightHand);
  this.threegroup.add(this.leftKnee);
  this.threegroup.add(this.rightKnee);
  this.threegroup.add(this.backLeftFoot);
  this.threegroup.add(this.backRightFoot);
  this.threegroup.add(this.frontRightFoot);
  this.threegroup.add(this.frontLeftFoot);
    
  this.threegroup.traverse( function ( object ) {
		if ( object instanceof THREE.Mesh ) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	} );

  this.blink = () => {
    this.leftEye.scale.y = 0.1
    setTimeout(this.blink, 2000*Math.random() + 3000)
  }
}

Cat.prototype.updateBody = function(speed){
  
  this.head.rotation.y += (this.tHeagRotY - this.head.rotation.y) / speed;
  this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
  this.head.position.x += (this.tHeadPosX-this.head.position.x) / speed; 
  this.head.position.y += (this.tHeadPosY-this.head.position.y) / speed; 
  this.head.position.z += (this.tHeadPosZ-this.head.position.z) / speed; 
  
  this.leftEye.scale.y += (this.tEyeScale - this.leftEye.scale.y) / (speed*2);
  this.rightEye.scale.y = this.leftEye.scale.y;
  
}

Cat.prototype.look = function(xTarget, yTarget){
  this.tHeagRotY = rule3(xTarget, -100, 100, -Math.PI/4, Math.PI/4);
  this.tHeadRotX = rule3(yTarget, -100,100, -Math.PI/4, Math.PI/4);
  this.tHeadPosX = rule3(xTarget, -100, 100, 70,-70);
  this.tHeadPosY = rule3(yTarget, -70, 130, 20, 100);
  this.tHeadPosZ = 0;
  
    
  this.tEyeScale = 1;
  this.updateBody(10);

  for (var i=0; i<this.mustaches.length; i++){
    var m = this.mustaches[i];
    m.rotation.y = 0;
  }
}

function loop(){
  render();
  var xTarget = (mousePos.x-windowHalfX);
  var yTarget= (mousePos.y-windowHalfY);
  
  cat.look(xTarget, yTarget);
  requestAnimationFrame(loop);
}

function render(){
  if (controls) controls.update();
  renderer.render(scene, camera);
}


init();
createLights();
createFloor();
createCat();
loop();


function rule3(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}
