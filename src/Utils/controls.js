import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { canvas } from "./canvas";
import { camera } from "./camera";
import { gui } from "./gui";


// Controls
export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

//limit we can't go down (0) or up (pi/2)
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;

//limit we can't go left (0) or right (pi/2)
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;

//limit zoom
controls.minDistance = 2;
controls.maxDistance = 15;

if (window.innerWidth < 768) {
  camera.position.set(10, 10, 10);
  controls.target.set(0, 0, 0); // zoom out slightly on smaller screens
}else{
  camera.position.set(4, 4, 4.5);
  controls.target.set(0, 0, 0); // zoom out slightly on smaller screens
}

gui.add(controls.target, "x").min(-10).max(10).step(0.01).name("targetX");
gui.add(controls.target, "y").min(-10).max(10).step(0.01).name("targetY");
gui.add(controls.target, "z").min(-10).max(10).step(0.01).name("targetZ");

