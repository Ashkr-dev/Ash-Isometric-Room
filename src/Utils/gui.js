import GUI from "lil-gui";
import { camera } from "./camera";
import {
  tvEmissionMaterial,
  studylampBulbMaterial,
  laptopEmissionMaterial,
} from "./material";

const gui = new GUI();

gui.close();

gui.addColor(tvEmissionMaterial, "color").name("Tv-BackLight");
gui.addColor(studylampBulbMaterial, "color").name("Study-Lamp-Bulb");
gui.addColor(laptopEmissionMaterial, "color").name("Laptop-keyboardLight");

gui.add(camera.position, "x").min(-10).max(10).step(0.01);
gui.add(camera.position, "y").min(-10).max(10).step(0.01);
gui.add(camera.position, "z").min(-10).max(10).step(0.01);

export { gui };
