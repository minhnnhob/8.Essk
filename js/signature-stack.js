const stackBanner = () => {
  if (window.innerWidth > 768) {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
      const banner_item_1 = document.querySelector("#signature__item-1");
      const banner_item_2 = document.querySelector("#signature__item-2");
      const banner_item_3 = document.querySelector("#signature__item-3");
      const banner_item_4 = document.querySelector("#signature__item-4");

      // //   banner 1 pin
      let banner_item_1_tl = gsap.timeline({
        scrollTrigger: {
          trigger: banner_item_1,
          start: "top top",
          end: "+=200%",
          // markers: true,
          scrub: true,
          pin: true,
          pinSpacing: false,
          onEnter: () => {
            gsap.to(banner_item_2, {
              y: "-55%",
              scale: 0.4,
              ease: "power4.out",
              duration: 1,

              pinSpacing: false,
            });
          },

          onLeaveBack: () => {
            gsap.to(banner_item_2, {
              y: "0%",
              scale: 1,
              ease: "power4.out",
              duration: 1,
            });
          },
        },
      });
      // // banner 2 pin

      let banner_item_2_tl = gsap.timeline({
        scrollTrigger: {
          trigger: banner_item_2,
          start: "top bottom",
          end: "+=200%",
          markers: true,
          // scrub: true,
          // pin: true,
          pinSpacing: false,
          transformOrigin: "bottom bottom",
        },
      });

      banner_item_2_tl.fromTo(
        banner_item_2,
        { scale: 0.4 }, // trạng thái ban đầu (lúc mới pin)
        {
          scale: 1, // trạng thái cuối
          ease: "power4.out",
          duration: 1,
        } // tổng thời gian tương đối của tween (bị “dãn” bởi scrub)
      );
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  stackBanner();
});
window.addEventListener("resize", () => {
  // console.log("resize");
  stackBanner();
});
