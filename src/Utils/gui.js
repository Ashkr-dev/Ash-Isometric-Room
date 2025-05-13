import GUI from "lil-gui";
import { camera } from "./camera";
import { sizes } from "./sizes";
import { controls } from "./controls";
import {
  tvEmissionMaterial,
  studylampBulbMaterial,
  laptopEmissionMaterial,
} from "./material";

// Initial GUI setup
let gui = createGUI(sizes.width);

// Resize listener
window.addEventListener("resize", () => {
  // Update sizes if needed
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Remove old GUI
  gui.destroy();

  // Create new responsive GUI
  gui = createGUI(sizes.width);
});

function createGUI(width) {
  const guiWidth = width < 768 ? 200 : 400;
  const newGUI = new GUI({ width: guiWidth });

  if (width < 768) {
    newGUI.close();
  }

  // Add your GUI controls again here if needed
  // e.g., newGUI.add(camera.position, "x").min(-10).max(10).step(0.01);

  newGUI.addColor(tvEmissionMaterial, "color").name("Tv-BackLight");
  newGUI.addColor(studylampBulbMaterial, "color").name("Study-Lamp-Bulb");
  newGUI.addColor(laptopEmissionMaterial, "color").name("Laptop-keyboardLight");

  
  newGUI.add(camera.position, "x").min(-10).max(10).step(0.01);
  newGUI.add(camera.position, "y").min(-10).max(10).step(0.01);
  newGUI.add(camera.position, "z").min(-10).max(10).step(0.01);
  
  // newGUI.add(controls.target, "x").min(-10).max(10).step(0.01).name("targetX");
  // newGUI.add(controls.target, "y").min(-10).max(10).step(0.01).name("targetY");
  // newGUI.add(controls.target, "z").min(-10).max(10).step(0.01).name("targetZ");
  
  

  return newGUI;
}

export { gui };
