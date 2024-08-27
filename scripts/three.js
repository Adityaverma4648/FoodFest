// Ensure fflate is globally accessible
THREE.FBXLoader.prototype.fflate = window.fflate;

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const container = document.querySelector(".animation");

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

// Create the WebGLRenderer with alpha option for transparency
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);

// Set the clear color to transparent
renderer.setClearColor(0x000000, 0); // 0x000000 is black, 0 is full transparency

container.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 50).normalize();
scene.add(directionalLight);

// Create a cube and add it to the scene
const geometry = new THREE.BoxGeometry(45, 45, 45); // Width, Height, Depth
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 }); // Yellow color with Lambert shading
const cube = new THREE.Mesh(geometry, material);

// Create a group to hold the drone and package
const droneGroup = new THREE.Group();
scene.add(droneGroup);

// Variables to store the blade meshes
let blade1, blade2, blade3, blade4;

// Load FBX model
const loader = new THREE.FBXLoader();
loader.load(
  "./model/Drone.fbx", // Replace with your .fbx file path
  function (object) {
    object.position.set(0, -125, 0); // Adjust position of the drone
    droneGroup.add(object); // Add drone to the group
    droneGroup.add(cube); // Add package to the group
    cube.position.set(0, -10, 0); // Adjust package position relative to drone

    // Log the object to explore the hierarchy
    // console.log(object);

    // object.traverse(function (child) {
    //   if (child.isMesh) {
    //     console.log('Mesh Name:', child.name);
    //     // Here you can identify the blades by their name or some other property
    //   }
    // });

    // Find and store the blades by name or index
    blade1 = object.getObjectByName("Cylinder005"); // Replace with the actual name
    blade2 = object.getObjectByName("Cylinder006");
    blade3 = object.getObjectByName("Cylinder002");
    blade4 = object.getObjectByName("Cylinder009");
  },
  undefined,
  function (error) {
    console.error("Error loading FBX model:", error);
  }
);

camera.position.z = 80;
camera.position.y = -50;
camera.position.x = 100;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// Create a helper to visualize the 3D axes
// const axesHelper = new THREE.AxesHelper(100); // The number represents the length of the axes
// scene.add(axesHelper);

// // Rotate the axes so that the X-axis (red) is parallel to the screen
// axesHelper.rotation.y = Math.PI / 2; // Rotate 90 degrees (π/2 radians) around the Y-axis

// Variables for hover effect
let time = 0;
const hoverAmplitude = 20; // Amplitude of the hover (how much it moves up and down)
const hoverFrequency = 0.02; // Frequency of the hover (how fast it moves up and down)

// Animate the drone and package moving from right to left with a hover effect
function animate() {
  requestAnimationFrame(animate);

  // Update time for hover calculation
  time += hoverFrequency;

  // Calculate hover effect using a sine wave
  const hoverY = Math.sin(time) * hoverAmplitude;

  // Move the group from right to left along the X-axis
  // if (droneGroup.position.x > -150) { // Adjust the stopping point as needed
  //   droneGroup.position.x -= 0.5; // Speed of the movement
  // }

  // Apply hover effect to the Y position
  droneGroup.position.y = hoverY;

  // Rotate the blades if they are defined
  if (blade1) blade1.rotation.z += 0.8; // Adjust the rotation speed as needed
  if (blade2) blade2.rotation.z += 0.8;
  if (blade3) blade3.rotation.z += 0.8;
  if (blade4) blade4.rotation.z += 0.8;

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  // Update the renderer and camera on resize
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
