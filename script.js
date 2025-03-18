 import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://unpkg.com/three@0.150.1/examples/jsm/webxr/ARButton.js';

document.addEventListener("DOMContentLoaded", () => {
    let scene, camera, renderer, controller;
    let brainModel;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 3); // Adjust position for better viewing

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;

        const arContainer = document.getElementById("arContainer");
        if (arContainer) {
            arContainer.innerHTML = ""; // Clear previous instances
            arContainer.appendChild(renderer.domElement);
        } else {
            console.error("Missing #arContainer in HTML");
        }

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // Load 3D Brain Model
        const loader = new GLTFLoader();
        loader.load("./model/brain.glb", (gltf) => {
            brainModel = gltf.scene;
            brainModel.scale.set(0.5, 0.5, 0.5);
            scene.add(brainModel);
        }, undefined, (error) => console.error("Error loading model:", error));

        // WebXR Controller
        controller = renderer.xr.getController(0);
        scene.add(controller);

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

    // Create AR Button once
    document.body.appendChild(ARButton.createButton(renderer));

    document.getElementById("arButton").addEventListener("click", () => {
        init();
    });
});
