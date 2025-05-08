// coffeeSmoke.js
import * as THREE from "three";
import coffeeSmokeVertexShader from "/shaders/coffeeSmoke/vertex.glsl";
import coffeeSmokeFragmentShader from "/shaders/coffeeSmoke/fragment.glsl";
import { textureLoader } from "./loader";

// Perlin texture
const perlinTexture = textureLoader.load("./perlin.png");
perlinTexture.wrapS = THREE.RepeatWrapping;
perlinTexture.wrapT = THREE.RepeatWrapping;

// Coffee smoke material
const coffeeSmokeMaterial = new THREE.ShaderMaterial({
  vertexShader: coffeeSmokeVertexShader,
  fragmentShader: coffeeSmokeFragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uPerlinTexture: new THREE.Uniform(perlinTexture),
  },
  side: THREE.DoubleSide,
  depthWrite: false,
  transparent: true,
});

export default coffeeSmokeMaterial;
