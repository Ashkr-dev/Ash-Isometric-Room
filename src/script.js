import * as THREE from "three";
import { gsap } from "gsap";
import coffeeSmokeMaterial from "./Components/coffeeSmoke";
import {textureLoader, gltfLoader} from "./Components/loader";
import {ollieTrick, kickflipTrick, frontside360} from "./Components/skateboardTricks";
import {sizes} from "./Utils/sizes";
import {renderer} from "./Utils/renderer";
import {camera} from "./Utils/camera";
import {controls} from "./Utils/controls";
import {resize} from "./Utils/resize";
import {gui} from "./Utils/gui";

/**
 * Base
 */
// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const bakedTexture = textureLoader.load("Baked6.jpg");
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });
const tvEmissionMaterial = new THREE.MeshBasicMaterial({ color: "#6ccaf0" });
const studylampBulbMaterial = new THREE.MeshBasicMaterial({ color: "#ebd0b7" });
const laptopEmissionMaterial = new THREE.MeshBasicMaterial({
  color: "#9a5fe3",
});

/**
 * Model
 */
let skateboardMesh, skateboardTail, skateboardFront;

gltfLoader.load("Isometric-Room-Project.glb", (gltf) => {
  gltf.scene.traverse((child) => {
    child.material = bakedMaterial;
  });

  const chairMesh = gltf.scene.children.find((child) => {
    return child.name === "chair-seat";
  });

  const tvEmissionMesh = gltf.scene.children.find((child) => {
    return child.name === "Tv-emission";
  });

  const studyLampBulbMesh = gltf.scene.children.find((child) => {
    return child.name === "study-Lamp-bulb";
  });
  const laptopEmissionMesh = gltf.scene.children.find((child) => {
    return child.name === "Laptop-emission";
  });
  const coffeeSteamMesh = gltf.scene.children.find((child) => {
    return child.name === "coffee-steam";
  });
  skateboardMesh = gltf.scene.children.find((child) => {
    return child.name === "Skateboard";
  });

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name === "skateboard-tail") {
        skateboardTail = child;
      } else if (child.name === "skateboard-front") {
        skateboardFront = child;
      }
    }
  });

  /**
   * Animated chair
   */
  gsap.to(chairMesh.rotation, {
    y: `+= ${Math.PI * 0.5}`, // half rotation
    duration: 10, // very slow (20 seconds per full rotation)
    repeat: -1, // infinite loop
    ease: "power1.inOut", // constant speed (no easing)
    yoyo: true, // back and forth
  });

  if (coffeeSteamMesh) {
    coffeeSteamMesh.material = coffeeSmokeMaterial;
  }

  tvEmissionMesh.material = tvEmissionMaterial;
  studyLampBulbMesh.material = studylampBulbMaterial;
  laptopEmissionMesh.material = laptopEmissionMaterial;
  
  gltf.scene.position.set(0, -1, 0);
  scene.add(gltf.scene);
});


gui.addColor(tvEmissionMaterial, "color").name("Tv-BackLight");
gui.addColor(studylampBulbMaterial, "color").name("Study-Lamp-Bulb");
gui.addColor(laptopEmissionMaterial, "color").name("Laptop-keyboardLight");

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

//resize
resize();

/**
 * Cursor
 */
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

//witness object
let currentIntersect = null;

window.addEventListener("click", () => {
  if (!currentIntersect) return;

  switch (currentIntersect) {
    case skateboardTail:
      ollieTrick(skateboardMesh);
      break;
    case skateboardMesh:
      kickflipTrick(skateboardMesh);
      break;
    case skateboardFront:
      frontside360(skateboardMesh);
      break;
  }
});


//camera
scene.add(camera);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update coffeeSmokeMaterial
  if (coffeeSmokeMaterial.uniforms?.uTime) {
    coffeeSmokeMaterial.uniforms.uTime.value = elapsedTime;
  }
  
  //Cast a ray
  raycaster.setFromCamera(mouse, camera);
  const objectToTest = [skateboardTail, skateboardFront, skateboardMesh].filter(
    Boolean
  );
  const intersects = raycaster.intersectObjects(objectToTest);

  if (intersects.length > 0) {
    currentIntersect = intersects[0].object;
  } else {
    currentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
