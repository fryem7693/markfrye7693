const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.IcosahedronGeometry(2, 2);

const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  wireframe: true,
  emissive: 0x1e40af,
  roughness: 0.3,
  metalness: 0.8
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lighting
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 6;

// Mouse tracking
let mouse = { x: 0, y: 0 };
let target = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Smooth easing
  target.x += (mouse.x - target.x) * 0.07;
  target.y += (mouse.y - target.y) * 0.07;

  // Base slow rotation
  sphere.rotation.y += 0.0015;
  sphere.rotation.x += 0.0008;

  // Mouse interaction
  sphere.rotation.y += target.x * 0.08;
  sphere.rotation.x += target.y * 0.08;

  // Slight depth shift
  camera.position.x = target.x * 0.5;
  camera.position.y = -target.y * 0.5;

  // Subtle light follow
  light.position.x = target.x * 5;
  light.position.y = -target.y * 5;

  renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


//Create starfield 
// Starfield
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;

const starPositions = [];

for (let i = 0; i < starCount; i++) {
  starPositions.push(
    (Math.random() - 0.5) * 300, // x
    (Math.random() - 0.5) * 300, // y
    (Math.random() - 0.5) * 300  // z
  );
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.7,
  transparent: true,
  opacity: 0.25
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//star movement
stars.rotation.y += 0.0002;
stars.rotation.x += 0.0001;







