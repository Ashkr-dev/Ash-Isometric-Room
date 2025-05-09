import gsap from "gsap";

export function animatedTurntable(turntableDisk, tonearm) {
  gsap.to(turntableDisk.rotation, {
    y: Math.PI * 2,
    repeat: -1,
    duration: 6,
    ease: "none",
  });
  const turntableTl = gsap.timeline();
  turntableTl
    .to(tonearm.rotation, {
      y: `-= ${Math.PI * 0.2}`, // half rotation
      duration: 4,
      ease: "none",
    })
    .to(tonearm.rotation, {
      z: -0.1,
      duration: 2,
      ease: "power1.inOut",
    });
}
