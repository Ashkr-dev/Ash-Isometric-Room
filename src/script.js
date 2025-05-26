import * as THREE from "three";
import coffeeSmokeMaterial from "./Components/coffeeSmoke";
import { textureLoader, gltfLoader } from "./Components/loader";
import {
  ollieTrick,
  kickflipTrick,
  frontside360,
} from "./Components/skateboardTricks";
import { sizes } from "./Utils/sizes";
import { renderer } from "./Utils/renderer";
import { camera } from "./Utils/camera";
import { controls } from "./Utils/controls";
import { resize } from "./Utils/resize";
import { animatedChair } from "./Components/animatedChair";
import { animatedTurntable } from "./Components/animatedTurntable";
import {
  tvEmissionMaterial,
  studylampBulbMaterial,
  laptopEmissionMaterial,
} from "./Utils/material";

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

/**
 * Model
 */
let skateboardMesh,
  skateboardTail,
  skateboardFront,
  turntableDisk,
  tonearm,
  bgMusic,
  tonearmTimeline;

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

  //skateboard
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

  //turntable
  const turntable = gltf.scene.children.find((child) => {
    return child.name === "turntable";
  });

  turntableDisk = gltf.scene.getObjectByName("turntable-disk");
  tonearm = gltf.scene.getObjectByName("tonearm");

  // Get animation timeline and music
  const result = animatedTurntable(turntableDisk, tonearm);
  tonearmTimeline = result.tonearmTimeline;
  bgMusic = result.bgMusic;

  // Add a toggle function to userData
  turntableDisk.userData.toggleMusic = () => {
    if (bgMusic.playing()) {
      bgMusic.pause();
      tonearmTimeline.reverse();
    } else {
      tonearmTimeline.play();
    }
  };

  /**
   * Animated chair
   */
  animatedChair(chairMesh);

  if (coffeeSteamMesh) {
    coffeeSteamMesh.material = coffeeSmokeMaterial;
  }
  tvEmissionMesh.material = tvEmissionMaterial;
  studyLampBulbMesh.material = studylampBulbMaterial;
  laptopEmissionMesh.material = laptopEmissionMaterial;

  gltf.scene.position.set(0, -1, 0);
  scene.add(gltf.scene);
});

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
    default:
      if (currentIntersect.userData.toggleMusic) {
        currentIntersect.userData.toggleMusic(); // ✅ Trigger music toggle
      }
      break;
  }
});

window.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "o":
      ollieTrick(skateboardMesh);
      break;
    case "k":
      kickflipTrick(skateboardMesh);
      break;
    case "f":
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
  if (coffeeSmokeMaterial?.uniforms?.uTime) {
    coffeeSmokeMaterial.uniforms.uTime.value = elapsedTime;
  }

  //Cast a ray
  raycaster.setFromCamera(mouse, camera);
  const objectToTest = [
    skateboardTail,
    skateboardFront,
    skateboardMesh,
    turntableDisk,
  ].filter(Boolean);
  const intersects = raycaster.intersectObjects(objectToTest);

  document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";

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
