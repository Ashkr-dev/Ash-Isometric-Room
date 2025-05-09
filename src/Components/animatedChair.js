import gsap from "gsap";

/**
 * Animated chair
 */

export function animatedChair(chairMesh) {
  gsap.to(chairMesh.rotation, {
    y: `+= ${Math.PI * 0.5}`, // half rotation
    duration: 10, // very slow (20 seconds per full rotation)
    repeat: -1, // infinite loop
    ease: "power1.inOut", // constant speed (no easing)
    yoyo: true, // back and forth
  });
}
