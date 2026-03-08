// particles.js - Three.js background and visualizations

window.addEventListener('load', initVisuals);

function initVisuals() {
    initHeroBackground();
    initGlobe();
}

// 1. Hero Background (Particle Mesh)
function initHeroBackground() {
    const container = document.getElementById('canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050A, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particles using Points
    const geometry = new THREE.BufferGeometry();
    const particles = 2000;
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);

    const color1 = new THREE.Color(0x2563eb); // electricBlue
    const color2 = new THREE.Color(0x6b21a8); // neonPurple
    const color3 = new THREE.Color(0x06b6d4); // softCyan

    for (let i = 0; i < particles; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * 3000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;

        // Color mix
        const mixRatio = Math.random();
        const mixed = color1.clone().lerp(mixRatio > 0.5 ? color2 : color3, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    function animate() {
        requestAnimationFrame(animate);

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.001;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 2. Global Infrastructure Map (Wireframe Globe)
function initGlobe() {
    const container = document.getElementById('globe-container');
    if (!container || typeof THREE === 'undefined') return;

    // Clear placeholder
    container.innerHTML = '';

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    // Sphere geometry
    const geometry = new THREE.SphereGeometry(100, 32, 32);

    // Wireframe material
    const material = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Nodes (Points on the globe)
    const nodeGeometry = new THREE.SphereGeometry(3, 16, 16);
    const nodes = [];

    const locs = [
        { lat: 40.7, lon: -74, color: 0x2563eb }, // USA
        { lat: 50.1, lon: 8.6, color: 0x6b21a8 }, // EU
        { lat: 19.0, lon: 72.8, color: 0x06b6d4 }, // India
        { lat: 1.3, lon: 103.8, color: 0xffffff } // Asia
    ];

    function latLongToVector3(lat, lon, radius) {
        var phi = (90 - lat) * (Math.PI / 180);
        var theta = (lon + 180) * (Math.PI / 180);

        var x = -(radius * Math.sin(phi) * Math.cos(theta));
        var z = (radius * Math.sin(phi) * Math.sin(theta));
        var y = (radius * Math.cos(phi));

        return new THREE.Vector3(x, y, z);
    }

    locs.forEach(loc => {
        const mat = new THREE.MeshBasicMaterial({ color: loc.color });
        const mesh = new THREE.Mesh(nodeGeometry, mat);
        const pos = latLongToVector3(loc.lat, loc.lon, 100);
        mesh.position.copy(pos);
        sphere.add(mesh); // attach to sphere so they rotate together
        nodes.push({ mesh, time: Math.random() * Math.PI }); // store random time offset for pulsing
    });

    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.y += 0.002;
        sphere.rotation.x = 0.2; // slight tilt

        // Pulse nodes
        nodes.forEach((node, i) => {
            node.time += 0.05;
            const scale = 1 + Math.sin(node.time) * 0.5;
            node.mesh.scale.set(scale, scale, scale);
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    });
}
