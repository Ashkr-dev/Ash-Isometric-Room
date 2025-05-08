import * as THREE from "three";
import {sizes} from "./sizes";
import {canvas} from "./canvas";


/**
 * Renderer
*/
export const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
