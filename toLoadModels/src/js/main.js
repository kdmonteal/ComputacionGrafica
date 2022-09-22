/*
    Author(a): Kelly Daniella Marin
    Date of creation: 11 August/2022
    Last Modification: 22/September/2022 - 11:18 AM
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
    renderer.setSize((window.innerWidth - 1), (window.innerHeight - 6));
    document.body.appendChild(renderer.domElement);
    // Add elements
    scene.add(camera);
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(15, 10, 0);
    controls.update();
    // Grids
    const size = 50;
    const divisions = 50;

    const gridHelper = new THREE.GridHelper( size, divisions, 0x000, 0xffffff );
    scene.add( gridHelper );
    
    window.addEventListener('resize', onWindowResize, false);

    // *************************** Lights ***************************
    const light = new THREE.AmbientLight( 0x404040,1); // soft white light
    scene.add( light );

    const pointLight = new THREE.PointLight( 0xfff, 1, 100 );
    pointLight.position.set( 0, 0, 0);
    scene.add( pointLight );

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );
    // **************************************************************
}

function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}