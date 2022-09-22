/*
    Author(a): Kelly Daniella Marin
    Date of creation: 11 August/2022
    Last Modification: 08/september/2022 - 10:24 AM
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
    cube4 = null,
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
    camera.position.set(0, 20, 1);
    controls.update();
    
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
    

    createObjectWithMaterials();
    // **************************************************************
}
function createObjectWithMaterials() {
    const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );


    // MeshStandardMaterial
    const material54 = new THREE.MeshStandardMaterial({ color: 0xff00ff,
                                                      roughness:0.2,
                                                      metalness:0.6
                                                    });                                               
                                        
    const torusKnot = new THREE.Mesh( geometry, material54 );
    scene.add( torusKnot );

    // MeshBasicMaterial
    const material = new THREE.MeshBasicMaterial( { transparent: true,
                                                    opacity: 1,
                                                    map: new THREE.TextureLoader().load('./src/img/uv_test_bw_1024.png') } );
    
    var materialCube = [ new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/img/face1.jpg')}),
                         new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/img/face2.png')}),
                         new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/img/face3.jpg')}),
                         new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/img/face4.jpg')}),
                         new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/img/face5.png')}),
                         new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/img/face6.jpg')})
    ];

    const materialFaces = new THREE.MeshFaceMaterial(materialCube);

    const geometry3 = new THREE.BoxGeometry( 5, 5, 5 );
    cube = new THREE.Mesh( geometry3, material );

    cube.position.set(6,5,0);
    scene.add( cube );

    const geometry4 = new THREE.BoxGeometry( 5, 5, 5 );
    cube4 = new THREE.Mesh( geometry4, materialFaces );

    cube4.position.set(-6,5,0);
    scene.add( cube4 );
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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube4.rotation.x += 0.01;
    cube4.rotation.y += 0.01;

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}