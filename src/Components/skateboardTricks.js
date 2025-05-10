import { gsap } from "gsap";
import { Howl } from "howler";

/**
 * Skateboard tricks sfx
 */
const skateboardPop = new Howl({
  src: ["sounds/skateboard/skateboard_pop.mp3"],
  volume: 0.2,
});

const skateboardLand = new Howl({
  src: ["sounds/skateboard/skateboard_land.mp3"],
  volume: 0.06,
});

/**
 * Base jump animation
 */
let isAnimating = false;

function skateboardJump(skateboardMesh) {
  const jumpTl = gsap.timeline();

  jumpTl
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

  return jumpTl;
}

/**
 * Ollie Trick
 */

function ollieTrick(skateboardMesh) {
  if (isAnimating) return;
  isAnimating = true;

  skateboardJump(skateboardMesh);

  const ollieTl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    },
  });

  skateboardPop.play();

  ollieTl
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
      onComplete: () => {
        skateboardLand.play();
      },
    });
}

/**
 * Kickflip Trick
 */

function kickflipTrick(skateboardMesh) {
  if (isAnimating) return;
  isAnimating = true;

  skateboardJump(skateboardMesh);

  const kickflipTl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    },
  });

  skateboardPop.play();

  kickflipTl
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
      onComplete: () => {
        skateboardLand.play();
      },
    });
}

/**
 * Frontside 360 Trick
 */

function frontside360(skateboardMesh) {
  if (isAnimating) return;
  isAnimating = true;

  skateboardJump(skateboardMesh);

  const frontside360Tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    },
  });

  skateboardPop.play();

  frontside360Tl
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
      onComplete: () => {
        skateboardLand.play();
      },
    });
}

export { skateboardJump, ollieTrick, kickflipTrick, frontside360 };
