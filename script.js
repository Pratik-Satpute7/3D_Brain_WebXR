import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

// Initialize Scene
function init() {
    const container = document.getElementById('scene-container');

    // Create Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    scene.add(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // Load 3D Brain Model
    const loader = new GLTFLoader();
    loader.load('assets/brain.glb', (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, -1); // Place in front of user
        model.scale.set(0.2, 0.2, 0.2);
        scene.add(model);
    });

    // AR Button
    document.body.appendChild(ARButton.createButton(renderer));

    // Animation Loop
    function animate() {
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    animate();
}

// Start Everything
window.addEventListener('load', init);
