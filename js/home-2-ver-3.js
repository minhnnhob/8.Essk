const images = Array.from(document.images);
const links = Array.from(
  document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]')
);

const banner_title = document.querySelectorAll(".banner__title");
const header = document.querySelector(".header");
const banner_num = document.querySelector(".banner__slide-num");

gsap.set(header, {
  y: "-100",
  opacity: 0,
});

gsap.set(".banner__slide-num", {
  y: "80",
  opacity: 0,
});

gsap.set(banner_title, {
  x: "-100",
  opacity: 0,
});
// banner_title.forEach((title) => {
//     console.log(title);
// })

const total = images.length + links.length;
let loaded = 0;
let counter = { value: 0 };
let targetProgress = 0;
const startTime = performance.now();
console.log(total);

function updateProgress() {
  loaded++;
  targetProgress = Math.floor((loaded / total) * 100);
}
//Banner
// slide bottom to -top

gsap.ticker.add(() => {
  counter.value += (targetProgress - counter.value) * 0.05;

  const current = Math.floor(counter.value);
  //   document.querySelector(".num-test-2").textContent = current + "%";
  //   document.querySelector(".line-test-2").style.width = current - 10 + "%";

  gsap.to(".number-home-2", {
    textContent: current + "%",
    duration: 0.1,
    snap: "textContent",
    ease: "power2.out",
  });

  // Nếu đã loaded hết và đạt 100% hiển thị

  if (loaded === total && current >= 100) {
    const elapsed = performance.now() - startTime;
    // performance.now() ~ date.now()

    if (elapsed >= 1500) {
      //ddamr bao thoi gian load toi thieu 1.5s
      gsap.ticker.remove(updateProgress);

      const tl = gsap.timeline();

      tl.to(".number-home-2", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "none",
      });
      tl.to(".number-home-2", {
        scale: 0.6,
        opacity: 0,
        duration: 0.4,
        ease: "none",
      });

      tl.to(".block-home-2", {
        height: "0",
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          each: 0.05,
          from: "start",
        },
      });

      tl.add(() => {
        document.querySelector(".banner").classList.remove("banner--hide");
        void document.querySelector(".banner").offsetHeight;
      }, "-=.5");

      tl.to(banner_title, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        // delay: .6,
      });

      tl.add(() => {
        document.querySelector(".loader-home-2").style.display = "none";
      });

      tl.add(() => {
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out",
        });

        gsap.to(banner_num, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out",
        });
      }, "-=.2");
    }
  }
  if (loaded === total && targetProgress === 100 && counter.value >= 99.5) {
    counter.value = 100;
  }
});

// slide top to bottom
// gsap.ticker.add(() => {
//   counter.value += (targetProgress - counter.value) * 0.05;

//   const current = Math.floor(counter.value);
//   //   document.querySelector(".num-test-2").textContent = current + "%";
//   //   document.querySelector(".line-test-2").style.width = current - 10 + "%";

//   gsap.to(".number-home-2", {
//     textContent: current + "%",
//     duration: 0.1,
//     snap: "textContent",
//     ease: "power2.out",
//   });

//   // gsap.to(".line-test-2", {
//   //   width: current - 10 + "%",
//   //   duration: 0.1,
//   //   ease: "power2.out",
//   // });

//   // Nếu đã loaded hết và đạt 100% hiển thị
//   if (loaded === total && current >= 100) {
//     const elapsed = performance.now() - startTime;

//     // performance.now() ~ date.now()

//     if (elapsed >= 1500) {
//       //ddamr bao thoi gian load toi thieu 1.5s
//       gsap.ticker.remove(updateProgress);

//       const tl = gsap.timeline();

//       tl.to(".number-home-2", {
//         scale: 0,
//         opacity: 0,
//         duration: 0.4,
//         ease: "none",

//       });
//       tl.to(".number-home-2", {
//         scale: .6,
//         opacity: 0,
//         duration: 0.4,
//         ease: "none",

//       });

//       tl.to(".block-home-2", {
//         y: "100%",
//         duration: 0.8,
//         ease: "power1.out",
//         stagger: {
//           each: 0.05,
//           from: "end",
//         },
//       });
//     }
//   }
//   if (loaded === total && targetProgress === 100 && counter.value >= 99.5) {
//     counter.value = 100;
//   }
// });

images.forEach((image) => {
  if (image.complete) {
    updateProgress();
  } else {
    image.addEventListener("load", updateProgress);
    image.addEventListener("error", updateProgress);
  }
});

links.forEach((link) => {
  if (link.sheet) {
    updateProgress();
  } else {
    link.addEventListener("load", updateProgress);
    link.addEventListener("error", updateProgress);
  }
});

//////////////////////////Split text

  document.addEventListener("DOMContentLoaded", function () {
    document.fonts.ready.then(() => {
      const split = new SplitText(".mau-home-2__slogan", {
        types: "words, chars",
        tagName: "span",
        // mask: "words",
      });

      gsap.from(split.words, {
        scrollTrigger: {
          trigger: ".mau-home-2__slogan",
          start: "top 80%",
          // markers: true,
          toggleActions: "play none none none",
        },
        y: 10,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "power1.out",
      });

      const split_2 = new SplitText(".mau-home-2__qoute", {
        types: "words, chars",
        tagName: "span",
        // mask: "words",
      });

      gsap.from(split_2.words, {
        scrollTrigger: {
          trigger: ".mau-home-2__qoute",
          start: "top 75%",
          // markers: true,
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });

      const split_3 = new SplitText(".mau-home-2__big-description", {
        types: "words, chars",
        tagName: "span",
        // mask: "words",
      });

      gsap.from(split_3.words, {
        scrollTrigger: {
          trigger: ".mau-home-2__big-description",
          start: "top 75%",
          // markers: true,
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });

      const split_4 = new SplitText(".cf-home-2__title-1", {
        types: "words, chars",
        tagName: "span",
        // mask: "words",
      });

      gsap.from(split_4.chars, {
        scrollTrigger: {
          trigger: ".cf-home-2__title-1",
          start: "top 55%",
          // markers: true,
          id: "title",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });

      const split_5 = new SplitText(".cf-home-2__title-2", {
        types: "words, chars",
        tagName: "span",
        // mask: "words",
      });

      gsap.from(split_5.chars, {
        scrollTrigger: {
          trigger: ".cf-home-2__title-2",
          start: "top 50%",
          // markers: true,
          id: "title-2",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

// Ensure DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".signature__item");

  const card1 = document.querySelector("#signature__item-1");
  const card2 = document.querySelector("#signature__item-2");
  const card3 = document.querySelector("#signature__item-3");
  const card4 = document.querySelector("#signature__item-4");

  // const cards = [card1, card2, card3, card4];
  let stickDistance = 0;
  let first_card = ScrollTrigger.create({
    trigger: cards[0],
    start: "center center",
  });

  let last_card = ScrollTrigger.create({
    trigger: cards[cards.length - 1],
    start: "center center",
  });

  console.log(last_card.start);

  cards.forEach((card, index) => {
    const isLast = index === cards.length - 1;
    console.log(isLast);
    var scale = 1 - (cards.length - index) * 0.02;
    console.log(scale);
    // var scale = 0.9;
    let scaleDown = gsap.to(card, {
      scale: scale,
      delay: 0.3,

      // transformOrigin: '"50% ' +
      // (last_card.start - stickDistance) + '"',
    });

    const contentElements = card.querySelectorAll(
      ".signature__item-title, .signature__item-descption, .signature__item-button"
    );

    gsap.set(contentElements, { opacity: 0, y: 20 });

    gsap.to(contentElements, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out",
      stagger: 0.1,

      scrollTrigger: {
        trigger: card,
        start: "top 40%",
        toggleActions: "play reverse play reverse",
        // markers:true,
        id: "signature__item-title",
      },
    });

    ScrollTrigger.create({
      trigger: card,
      start: "center 65%",
      end: () => last_card.start + stickDistance,
      pin: true,
      // markers: true,
      pinSpacing: false,
      ease: "power2.out",
      animation: scaleDown,
      toggleActions: "restart none none reverse",
    });
  });
});
