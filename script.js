 document.addEventListener("DOMContentLoaded", () => {
    let scene, camera, renderer, controller;
    let brainModel;

    // Initialize Three.js Scene
    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        document.getElementById("arContainer").appendChild(renderer.domElement);

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // Load 3D Brain Model
        const loader = new THREE.GLTFLoader();
        loader.load("model/brain.glb", (gltf) => {
            brainModel = gltf.scene;
            brainModel.scale.set(0.5, 0.5, 0.5);
            scene.add(brainModel);
        });

        // WebXR Controller
        controller = renderer.xr.getController(0);
        scene.add(controller);

        // Start AR Session
        document.body.appendChild(ARButton.createButton(renderer));

        animate();
    }

    function animate() {
        renderer.setAnimationLoop(() => {
            if (brainModel) {
                brainModel.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        });
    }

    document.getElementById("arButton").addEventListener("click", () => {
        init();
    });
});
