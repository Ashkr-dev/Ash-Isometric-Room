import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { canvas } from "./canvas";
import { camera } from "./camera";

// Controls
export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//limit we can't go down (0) or up (pi/2)
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;

//limit we can't go left (0) or right (pi/2)
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;

//limit zoom
controls.minDistance = 2;
controls.maxDistance = 10;


