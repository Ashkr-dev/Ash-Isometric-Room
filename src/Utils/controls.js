import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { canvas } from "./canvas";
import { camera } from "./camera";

// Controls
export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
