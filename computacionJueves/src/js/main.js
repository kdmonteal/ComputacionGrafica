/*
    Author(a): Kelly Daniella Marin
    Date of creation: 11 August/2022
    Last Modification: 11/August/2022 - 10:24 AM
 */

// All elements that I Can create of THREE JS
console.log(THREE);

// ¿VAR, LET, CONST?
// Var: Pueden declarar sin necesidad de inicializar | Global
// let: Pueden declarar sin necesidad de inicializar | Lugar
// Const: Declarar con valor

// My principal elements : Scene, Camera, Render, Controls
var scene = null,    // The composition of diferents elements
    camera = null,   // Let me to see
    renderer = null, // Let me represent with digital image
    controls = null; // Can movements

var cube = null,
    myObject = null,
    geometry = null,
    countFigures = 0;

function start() {
    initScene();
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
    // Scene, Camera, Renderer
    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3293F5);
    // Create Camera 3D
    camera = new THREE.PerspectiveCamera(75, // FOV (FIELD OF VIEW)
        window.innerWidth / window.innerHeight, //(ASPECT)
        0.1, // (NEAR)
        1000);  // (FAR)
    // To Render
    const canvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize((window.innerWidth - 1), (window.innerHeight - 67));
    document.body.appendChild(renderer.domElement);
    // Add elements
    scene.add(camera);
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(10, 15, 10);
    controls.update();
    const size = 30;
    const divisions = 30;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    
    window.addEventListener('resize', onWindowResize, false);
}
function getValues(object2create) {
    let datas = document.querySelectorAll('input');
    
    switch (object2create) {
        case 'Box':
            geometry = new THREE.BoxGeometry( datas[0].value, datas[1].value, datas[2].value );       
            break;
        case 'Cylinder':
            geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
            break;
        case 'Sphere':
            geometry = new THREE.SphereGeometry( 15, 32, 16 );
            break;
    }
    const material = new THREE.MeshBasicMaterial( { color: datas[3].value } );
    myObject = new THREE.Mesh( geometry, material );
    scene.add( myObject ); 
    countFigures++;
    
    if(countFigures>0){
        document.getElementById('trans').className = "dropdown-item";
        document.getElementById('rotate').className = "dropdown-item";
        document.getElementById('scale').className = "dropdown-item";
        document.getElementById('myColor').className = "dropdown-item";
    }
}
function transformations(myTransformations) {
    switch (myTransformations) {
        case 'Translate':
            break;
        case 'Rotate':
            break;
        case 'Scale':
            break;
        case 'ChangeColor':
            myObject.material.color.set(0xFF00FF);
            break;
    }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}