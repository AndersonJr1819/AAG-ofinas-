import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    initHome();
    initVan3D();
    initMobileMenu();
});

function initVan3D() {
    const container = document.querySelector('.van-3d-container');
    if (!container) return;

    container.innerHTML = '';

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(5, 3, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff6b00, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    const group = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(3, 1.2, 1.4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.4, metalness: 0.6 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    group.add(body);

    const cabinGeometry = new THREE.BoxGeometry(1.2, 1, 1.35);
    const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b00, roughness: 0.3 });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(0.6, 1.4, 0);
    group.add(cabin);

    scene.add(group);

    const loader = new GLTFLoader();
    loader.load(
        './assets/models/van.glb',
        (gltf) => {
            scene.remove(group);
            const model = gltf.scene;
            model.scale.set(1.5, 1.5, 1.5);
            scene.add(model);
        },
        (xhr) => { },
        (error) => { }
    );

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        group.rotation.y += deltaX * 0.005;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        group.rotation.y += deltaX * 0.005;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    function animate() {
        requestAnimationFrame(animate);

        if (!isDragging) {
            group.rotation.y += 0.003;
        }

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function initMobileMenu() {
    const headerContainer = document.querySelector('.header .container');
    const headerNav = document.querySelector('.header-nav');

    if (!headerContainer || !headerNav) return;

    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Abrir Menu');

        menuToggle.style.cssText = `
            background: transparent;
            border: 1px solid #2A2A2A;
            color: #FF6B00;
            font-size: 24px;
            padding: 6px 12px;
            border-radius: 8px;
            cursor: pointer;
            display: none;
        `;

        const btnLogin = document.querySelector('.btn-login');
        if (btnLogin) {
            headerContainer.insertBefore(menuToggle, btnLogin);
        } else {
            headerContainer.appendChild(menuToggle);
        }
    }

    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            headerNav.style.display = '';
        }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    menuToggle.addEventListener('click', () => {
        const isVisible = headerNav.style.display === 'flex';
        if (isVisible) {
            headerNav.style.display = 'none';
            menuToggle.innerHTML = '☰';
        } else {
            headerNav.style.display = 'flex';
            headerNav.style.flexDirection = 'column';
            headerNav.style.position = 'absolute';
            headerNav.style.top = '80px';
            headerNav.style.left = '0';
            headerNav.style.width = '100%';
            headerNav.style.backgroundColor = '#0A0A0A';
            headerNav.style.padding = '24px';
            headerNav.style.borderBottom = '1px solid #2A2A2A';
            headerNav.style.boxSizing = 'border-box';
            headerNav.style.zIndex = '999';
            menuToggle.innerHTML = '✕';
        }
    });
}