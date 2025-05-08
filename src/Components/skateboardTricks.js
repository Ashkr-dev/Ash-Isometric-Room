import { gsap } from "gsap";

/**
 * Base jump animation
 */
function skateboardJump(skateboardMesh) {
  gsap
    .timeline()
    .to(skateboardMesh.position, {
      y: 0.8,
      duration: 0.51,
      ease: "power2.Out",
      delay: 0.26,
    })
    .to(skateboardMesh.position, {
      y: 0.13,
      duration: 0.43,
      ease: "power2.In",
    });
}

/**
 * Ollie Trick
 */
function ollieTrick(skateboardMesh) {
  skateboardJump(skateboardMesh);
  gsap
    .timeline()
    .to(skateboardMesh.rotation, {
      z: -0.2,
      duration: 0.26,
      ease: "none",
    })
    .to(skateboardMesh.rotation, {
      z: 0.4,
      duration: 0.82,
      ease: "power2.in",
    })
    .to(skateboardMesh.rotation, {
      z: 0,
      duration: 0.12,
      ease: "none",
    });
}

/**
 * Kickflip Trick
 */
function kickflipTrick(skateboardMesh) {
  skateboardJump(skateboardMesh);
  gsap
    .timeline()
    .to(skateboardMesh.rotation, {
      z: -0.2,
      duration: 0.26,
      ease: "none",
    })
    .to(skateboardMesh.rotation, {
      z: 0.4,
      duration: 0.82,
      ease: "power2.in",
    })
    .to(
      skateboardMesh.rotation,
      {
        x: `+=${Math.PI * 2}`,
        duration: 0.78,
        ease: "none",
      },
      0.3
    )
    .to(skateboardMesh.rotation, {
      z: 0,
      duration: 0.12,
      ease: "none",
    });
}

/**
 * Frontside 360 Trick
 */
function frontside360(skateboardMesh) {
  skateboardJump(skateboardMesh);
  gsap
    .timeline()
    .to(skateboardMesh.rotation, {
      z: -0.2,
      duration: 0.26,
      ease: "none",
    })
    .to(skateboardMesh.rotation, {
      z: 0.4,
      duration: 0.82,
      ease: "power2.in",
    })
    .to(
      skateboardMesh.rotation,
      {
        y: `+=${Math.PI * 2}`,
        duration: 0.77,
        ease: "none",
      },
      0.3
    )
    .to(skateboardMesh.rotation, {
      z: 0,
      duration: 0.14,
      ease: "none",
    });
}

export {
  skateboardJump,
  ollieTrick,
  kickflipTrick,
  frontside360,
};
