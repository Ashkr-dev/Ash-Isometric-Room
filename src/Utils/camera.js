import * as THREE from "three";
import { sizes } from "./sizes";
import { gui } from "./gui";

/**
 * Camera
 */
// Base camera
export const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);


camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4.5;

gui.add(camera.position, "x").min(-10).max(10).step(0.01);
gui.add(camera.position, "y").min(-10).max(10).step(0.01);
gui.add(camera.position, "z").min(-10).max(10).step(0.01);