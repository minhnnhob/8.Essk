const runGsapAnimation = () => {
  if (window.innerWidth > 768) {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

      let logoSplit = document.querySelectorAll(".header__logo path");

      let logo = document.querySelector(".header__logo");

      let logo_description = new SplitText(".header__logo-description", {
        type: "lines, words",
        tagName: "span",
        mask: "lines",
      });

      // menu
      let menu_shop = document.querySelectorAll(".header__menu-page-item");
      let menu_cart = document.querySelectorAll(".header__menu-end-cart");
      let menu_lg = document.querySelector(".header__menu-end-language");
      ////big banner title
      let banner__title = new SplitText(".banner__title", {
        types: "chars",
        mask: "lines",
      });
      // banner number
      const banner__number = document.querySelectorAll(
        ".banner__slide-num-item"
      );

      const banner__chars_tl = gsap.timeline();

      banner__chars_tl.fromTo(
        banner__title.chars,
        {
          opacity: 0,
          y: "160%",
          // rotationX: 180,
          // transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          y: "0%",
          // rotationX: 0,
          duration: 1,
          ease: "back.out(1)",
          stagger: {
            amount: 0.4,
            from: "start",
          },
        }
      );

      banner__chars_tl.fromTo(
        banner__number,
        {
          opacity: 0,
          y: "500%",

          // rotationX: 90,
          // transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          y: "0%",
          // rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          stagger: {
            amount: 0.4,
            from: "start",
          },
        },
        "<"
      );

      let menuCartArray = Array.from(menu_cart);
      menuCartArray.push(menu_lg);

      const menu_item_tl = gsap.timeline();

      menu_item_tl.fromTo(
        menu_shop,
        {
          y: "300%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          stagger: {
            each: 0.08,
            from: "start",
          },
          duration: 0.5,
          ease: "back.out(1.5)",
        }
      );

      menu_item_tl.fromTo(
        menuCartArray,
        {
          y: "-300%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          stagger: {
            each: 0.08,
            from: "end",
          },
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.2"
      );

      const number_logo_d = logo_description.words.length;
      gsap.set(".header__logo-description", {
        perspective: 800,
        transformStyle: "preserve-3d",
      });
      gsap.set(".header__logo-icon", {
        perspective: 400,
        transformStyle: "preserve-3d",
      });
      const header_tl = gsap.timeline();

      header_tl.fromTo(
        logoSplit,
        {
          opacity: 0,
          y: "200%",

          //   ease: "sine.out",
          //   force3D: true,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.3,
          ease: "back.out(.7)",
          force3D: true,
          stagger: {
            amount: 0.2,
            from: "start",
          },
        },
        "-=0.8"
      );

      //   for (let i = 0; i < logoSplit.length; i++) {
      //     const logoPath = logoSplit[i];
      //     console.log(logoPath);
      //     header_tl.from(
      //       logoPath,
      //       {
      //         opacity: 0,
      //         rotationY: -180,
      //         transformOrigin: "50% 50%",
      //         duration: 1.3,
      //         ease: "sine.out",
      //         force3D: true,
      //       },
      //       Math.random()
      //     );
      //     header_tl.to(
      //       logoPath,
      //       {
      //         rotationY: 0,
      //         duration: 2,
      //       },
      //       Math.random()
      //     );
      //   }
      let logo_tl = gsap.timeline();
      // for (let i = 0; i < number_logo_d; i++) {
      //   const word = logo_description.words[i];
      //   header_tl.from(
      //     word,
      //     {
      //       opacity: 0,
      //       rotationY: -90,
      //       transformOrigin: "0% 50%",
      //       // duration: 1.3,
      //       ease: "sine.out",
      //       force3D: true,
      //     },
      //     Math.random()
      //   );
      //   header_tl.to(
      //     word,
      //     {
      //       rotationY: 0,
      //       duration: 1,
      //     },
      //     Math.random()
      //   );
      // }

      // main time line
      header_tl.fromTo(
        logo_description.words,
        {
          opacity: 0,
          y: "200%",
          // rotationY: -90,
          // transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          y: "0%",
          // rotationY: 0,
          duration: 0.5,
          ease: "back.out(1)",
          force3D: true,
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "<+=0.2"
      );

      ////Section 2
      const qoute = new SplitText(".mau-home-4__title", {
        type: "lines, words",
        tagName: "span",
      });
      const section_2_des_1 = new SplitText("#mau-home-4__title-1", {
        type: "lines, words",
        tagName: "span",
        mask: "lines",
      });
      const section_2_des_2 = new SplitText("#mau-home-4__title-2", {
        type: "lines, words",
        tagName: "span",
        mask: "lines",
      });

      const section_2_tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mau-home-4",
          start: "top 80%",
          end: "top 50%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      section_2_tl.fromTo(
        qoute.words,
        {
          opacity: 0,
          y: "200%",
          // rotationY: -90,
          // transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          y: "0%",
          // rotationY: 0,
          duration: 0.5,
          ease: "back.out(1)",
          force3D: true,
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "<+=0.2"
      );

      section_2_tl.fromTo(
        section_2_des_1.words,
        {
          opacity: 0,
          y: "200%",
          // rotationY: -90,
          // transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          y: "0%",
          // rotationY: 0,
          duration: 0.5,
          ease: "back.out(1)",
          force3D: true,
          stagger: {
            amount: 0.3,
            from: "start",
          },
        },
        "<+=0.5"
      );
      section_2_tl.fromTo(
        section_2_des_2.words,
        {
          opacity: 0,
          y: "200%",
          // rotationY: -90,
          // transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          y: "0%",
          // rotationY: 0,
          duration: 0.5,
          ease: "back.out(1)",
          force3D: true,
          stagger: {
            amount: 0.3,
            from: "start",
          },
        },
        "<+=0.1"
      );

      const s2_pr_1 = document.querySelector("#product-1");
      const s2_pr_2 = document.querySelector("#product-2");
      const s2_pr_3 = document.querySelector("#product-3");
      const s2_pr_4 = document.querySelector("#product-4");

      // gsap.fromTo(
      //   [s2_pr_1, s2_pr_2, s2_pr_3, s2_pr_4],
      //   {
      //     opacity: 0,
      //     y: "200%",
      //     // rotationY: -90,
      //     // transformOrigin: "0% 50%",
      //   },
      //   {
      //     opacity: 1,
      //     y: "0%",
      //     // rotationY: 0,
      //     duration: 0.6,
      //     ease: "back.out(.8)",
      //     force3D: true,
      //     stagger: {
      //       amount: 0.6,
      //       from: "start",
      //     },
      //     scrollTrigger: {
      //       trigger: ".mau-home-4",
      //       start: "top 80%",
      //       end: "top 50%",
      //       // scrub: true,
      //       markers: true,
      //       toggleActions: "play none none reverse",
      //     },
      //   }
      // );

      const pr_tl = gsap.timeline({
        scrollTrigger: {
          trigger: s2_pr_1,
          start: "-100% 85%",
          end: "-100% 50%",
          // scrub: true,
          stagger: 0.2,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
      const pr_tl_2 = gsap.timeline({
        scrollTrigger: {
          trigger: s2_pr_3,
          start: "-100% 85%",
          end: "-100% 50%",
          // scrub: true,
          stagger: 0.2,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      [s2_pr_1, s2_pr_2].forEach((item, index) => {
        pr_tl.fromTo(
          item,
          {
            opacity: 0,
            y: "100%",
            // rotationY: -90,
            // transformOrigin: "0% 50%",
          },
          {
            opacity: 1,
            y: "0%",
            // rotationY: 0,
            duration: .6,
            ease: "back.out(1.25)",
            // force3D: true,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            // scrollTrigger: {
            //   trigger: item,
            //   start: "-200% 80%",
            //   end: "-100% 50%",
            //   // scrub: true,
            //   markers: true,

            //   toggleActions: "play none none reverse",
            // },
          },
          "<+=0.2" + index * 23
        );
      });
      [s2_pr_3, s2_pr_4].forEach((item, index) => {
        pr_tl_2.fromTo(
          item,
          {
            opacity: 0,
            y: "100%",
            // rotationY: -90,
            // transformOrigin: "0% 50%",
          },
          {
            opacity: 1,
            y: "0%",
            // rotationY: 0,
            duration: 0.6,
            ease: "back.out(.8)",
            // force3D: true,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            // scrollTrigger: {
            //   trigger: item,
            //   start: "-200% 80%",
            //   end: "-100% 50%",
            //   // scrub: true,
            //   markers: true,

            //   toggleActions: "play none none reverse",
            // },
          },
          "<+=0.4"
        );
      });

      let mainTimeLine = gsap.timeline();
      mainTimeLine.add(banner__chars_tl, "<+=0.8");
      mainTimeLine.add(header_tl, "<+=0.8");
      mainTimeLine.add(menu_item_tl, "<+=.9");
    });
  }
};
// runGsapAnimation();
document.addEventListener("DOMContentLoaded", () => {
  runGsapAnimation();
});
window.addEventListener("resize", () => {
  // console.log("resize");
  runGsapAnimation();
});

// let animationContext;

// const runGsapAnimation = () => {
//   if (window.innerWidth <= 768) return;

//   if (animationContext) {
//     animationContext.revert();
//   }

//   animationContext = gsap.context(() => {
//     gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

//     let logoSplit = document.querySelectorAll(".header__logo path");

//     let logo = document.querySelector(".header__logo");

//     let logo_description = new SplitText(".header__logo-description", {
//       type: "lines, words",
//       tagName: "span",
//       mask: "lines",
//     });

//     // menu
//     let menu_shop = document.querySelectorAll(".header__menu-page-item");
//     let menu_cart = document.querySelectorAll(".header__menu-end-cart");
//     let menu_lg = document.querySelector(".header__menu-end-language");
//     ////big banner title
//     let banner__title = new SplitText(".banner__title", {
//       types: "chars",
//       mask: "lines",
//     });
//     // banner number
//     const banner__number = document.querySelectorAll(".banner__slide-num-item");

//     banner__title.chars.forEach((char) => {
//       gsap.set(char, {
//         opacity: 0,
//       });
//     });
//     banner__number.forEach((char) => {
//       gsap.set(char, {
//         opacity: 0,
//       });
//     });

//     const banner__chars_tl = gsap.timeline();

//     banner__chars_tl.fromTo(
//       banner__title.chars,
//       {
//         opacity: 0,
//         y: "160%",
//         // rotationX: 180,
//         // transformOrigin: "50% 50%",
//       },
//       {
//         opacity: 1,
//         y: "0%",
//         // rotationX: 0,
//         duration: 1,
//         ease: "back.out(1)",
//         stagger: {
//           amount: 0.4,
//           from: "start",
//         },
//       }
//     );

//     banner__chars_tl.fromTo(
//       banner__number,
//       {
//         opacity: 0,
//         y: "500%",

//         // rotationX: 90,
//         // transformOrigin: "50% 50%",
//       },
//       {
//         opacity: 1,
//         y: "0%",
//         // rotationX: 0,
//         duration: 0.8,
//         ease: "back.out(1.5)",
//         stagger: {
//           amount: 0.4,
//           from: "start",
//         },
//       },
//       "<"
//     );

//     let menuCartArray = Array.from(menu_cart);
//     menuCartArray.push(menu_lg);

//     const menu_item_tl = gsap.timeline();

//     menu_item_tl.fromTo(
//       menu_shop,
//       {
//         y: "300%",
//         opacity: 0,
//       },
//       {
//         y: "0%",
//         opacity: 1,
//         stagger: {
//           each: 0.08,
//           from: "start",
//         },
//         duration: 0.5,
//         ease: "back.out(1.5)",
//       }
//     );

//     menu_item_tl.fromTo(
//       menuCartArray,
//       {
//         y: "-300%",
//         opacity: 0,
//       },
//       {
//         y: "0%",
//         opacity: 1,
//         stagger: {
//           each: 0.08,
//           from: "end",
//         },
//         duration: 0.5,
//         ease: "back.out(1.5)",
//       },
//       "-=0.2"
//     );

//     const number_logo_d = logo_description.words.length;
//     gsap.set(".header__logo-description", {
//       perspective: 800,
//       transformStyle: "preserve-3d",
//     });
//     gsap.set(".header__logo-icon", {
//       perspective: 400,
//       transformStyle: "preserve-3d",
//     });
//     const header_tl = gsap.timeline();

//     header_tl.fromTo(
//       logoSplit,
//       {
//         opacity: 0,
//         y: "200%",

//         //   ease: "sine.out",
//         //   force3D: true,
//       },
//       {
//         y: "0%",
//         opacity: 1,
//         duration: 0.3,
//         ease: "back.out(.7)",
//         force3D: true,
//         stagger: {
//           amount: 0.2,
//           from: "start",
//         },
//       },
//       "-=0.8"
//     );

//     //   for (let i = 0; i < logoSplit.length; i++) {
//     //     const logoPath = logoSplit[i];
//     //     console.log(logoPath);
//     //     header_tl.from(
//     //       logoPath,
//     //       {
//     //         opacity: 0,
//     //         rotationY: -180,
//     //         transformOrigin: "50% 50%",
//     //         duration: 1.3,
//     //         ease: "sine.out",
//     //         force3D: true,
//     //       },
//     //       Math.random()
//     //     );
//     //     header_tl.to(
//     //       logoPath,
//     //       {
//     //         rotationY: 0,
//     //         duration: 2,
//     //       },
//     //       Math.random()
//     //     );
//     //   }
//     let logo_tl = gsap.timeline();
//     // for (let i = 0; i < number_logo_d; i++) {
//     //   const word = logo_description.words[i];
//     //   header_tl.from(
//     //     word,
//     //     {
//     //       opacity: 0,
//     //       rotationY: -90,
//     //       transformOrigin: "0% 50%",
//     //       // duration: 1.3,
//     //       ease: "sine.out",
//     //       force3D: true,
//     //     },
//     //     Math.random()
//     //   );
//     //   header_tl.to(
//     //     word,
//     //     {
//     //       rotationY: 0,
//     //       duration: 1,
//     //     },
//     //     Math.random()
//     //   );
//     // }

//     // main time line
//     header_tl.fromTo(
//       logo_description.words,
//       {
//         opacity: 0,
//         y: "200%",
//         // rotationY: -90,
//         // transformOrigin: "0% 50%",
//       },
//       {
//         opacity: 1,
//         y: "0%",
//         // rotationY: 0,
//         duration: 0.5,
//         ease: "back.out(1)",
//         force3D: true,
//         stagger: {
//           amount: 0.6,
//           from: "start",
//         },
//       },
//       "<+=0.2"
//     );

//     ////Section 2
//     const qoute = new SplitText(".mau-home-4__title", {
//       type: "lines, words",
//       tagName: "span",
//     });

//     const section_1_tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".mau-home-4",
//         start: "top 80%",
//         end: "top 50%",
//         // scrub: 1,
//         markers: true,
//       },
//     });

//     let mainTimeLine = gsap.timeline();
//     mainTimeLine.add(banner__chars_tl, "<+=0.8");
//     mainTimeLine.add(header_tl, "<+=0.8");
//     mainTimeLine.add(menu_item_tl, "<+=.9");
//   });
// };

// window.addEventListener("load", () => {
//   runGsapAnimation();
// });

// window.addEventListener("resize", () => {
//   runGsapAnimation();
//   ScrollTrigger.refresh();
// });
