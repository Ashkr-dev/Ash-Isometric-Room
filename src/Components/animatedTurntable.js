import { gsap } from "gsap";
import { Howl } from "howler";

const bgMusic = new Howl({
  src: ["sounds/bgMusic/bg-music.mp3"],
  volume: 0.3,
  loop: true,
});

let wasPlayingBeforeTabHidden = false; // 🔁 Track state before hiding

export function animatedTurntable(turntableDisk, tonearm) {
  gsap.to(turntableDisk.rotation, {
    y: Math.PI * 2,
    repeat: -1,
    duration: 6,
    ease: "none",
  });

  const tonearmTimeline = gsap.timeline({ paused: true });
  tonearmTimeline
    .to(tonearm.rotation, {
      y: `-=${Math.PI * 0.2}`,
      duration: 4,
      ease: "none",
    })
    .to(tonearm.rotation, {
      z: -0.1,
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => {
        bgMusic.play();
      },
    });

  turntableDisk.userData.toggleMusic = () => {
    const fadeDuration = 2000;

    if (bgMusic.playing()) {
      bgMusic.fade(bgMusic.volume(), 0, fadeDuration);
      setTimeout(() => {
        bgMusic.pause();
      }, fadeDuration);
      tonearmTimeline.reverse();
    } else {
      bgMusic.volume(0);
      bgMusic.play();
      bgMusic.fade(0, 0.3, fadeDuration);
      tonearmTimeline.play();
    }
  };

  // 🔄 Handle tab visibility
  document.addEventListener("visibilitychange", () => {
    const fadeDuration = 1000;

    if (document.hidden) {
      if (bgMusic.playing()) {
        wasPlayingBeforeTabHidden = true;
        bgMusic.fade(bgMusic.volume(), 0, fadeDuration);
        setTimeout(() => bgMusic.pause(), fadeDuration);
      }
    } else {
      if (wasPlayingBeforeTabHidden) {
        bgMusic.volume(0);
        bgMusic.play();
        bgMusic.fade(0, 0.3, fadeDuration);
        wasPlayingBeforeTabHidden = false;
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    if (bgMusic.playing()) {
      bgMusic.stop();
    }
  });

  return { tonearmTimeline, bgMusic };
}
