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

var pointLight = null;

function start() {
    initScene();
    createUI();
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
    scene.background = new THREE.Color(0x000);//0x3293F5
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

    const gridHelper = new THREE.GridHelper(size, divisions, 0x000, 0xffffff);
    //scene.add( gridHelper );

    window.addEventListener('resize', onWindowResize, false);

    // *************************** Lights ***************************
    const light = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
    scene.add(light);

    // White directional light at half intensity shining from the top.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    //scene.add( directionalLight );

    pointLight = new THREE.PointLight(0xffffff, 1, 500);
    pointLight.position.set(2, 5, 3);
    scene.add(pointLight);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(directionalLight, sphereSize);
    //scene.add( pointLightHelper );

    // **************************************************************
    /* Player */
    var generalPathG = "./src/models/obj/guerrero/"; // Path of folder
    var fileObjG = "soldado.vox.obj";        // Name of OBJ file extension
    var fileMtlG = "soldado.vox.mtl";        // Name of MTL file extension

    // To load the Texture of MTL file extension
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(generalPathG);
    mtlLoader.setPath(generalPathG);
    mtlLoader.load(fileMtlG, function (materials) {
        materials.preload();

        // To load the geometry of OBJ file extension
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(generalPathG);
        objLoader.load(fileObjG, function (object) {
            scene.add(object);
            object.scale.set(1, 1, 1);
        });
    });

    /* World */
    var generalPathG2 = "./src/models/obj/world/"; // Path of folder
    var fileObjG2 = "castle.vox.obj";        // Name of OBJ file extension
    var fileMtlG2 = "castle.vox.mtl";        // Name of MTL file extension

    // To load the Texture of MTL file extension
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(generalPathG2);
    mtlLoader.setPath(generalPathG2);
    mtlLoader.load(fileMtlG2, function (materials) {
        materials.preload();

        // To load the geometry of OBJ file extension
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(generalPathG2);
        objLoader.load(fileObjG2, function (object) {
            scene.add(object);
            object.scale.set(8, 8, 8);
        });
    });
}

function createUI() {
    var gui = new dat.GUI();
    var param = {
            a: "OBJ/MTL",
            b: "#ff00ff",
            c: "Idle",
            d: true,
            e: "Voxel Player"
    };

    var g = gui.addFolder('Geometry');
    g.add(param, 'a', ["OBJ/MTL", "FBX", "GLTF"]).name("3D Type File");
    g.add(param, 'e', ["Voxel Player", "Luigi", "Mario"]).name("Player");
    g.add(param, 'd').name("Show Model");

    gui.addFolder('Animations').add(param,'c', ["Idle", "Run", "Jump"]).name("Animation Player");
    
    var colorGuiLight = gui.addFolder('Light').addColor(param,'b').name("Color light");
    colorGuiLight.onChange(function (colorGet) {
        console.log("change color: "+colorGet); 
        pointLight.color.setHex(Number(colorGet.toString().replace('#', '0x')));
    });
}

function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}