// import { splitText } from "./split-text.js";

const runGsapAnimation = () => {
  if (window.innerWidth > 768) {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("minh-beo", "0.625, 0.05, 0, 1");
    CustomEase.create("minh-beo-2", ".17,.67,.83,.67");

    let title_1 = new SplitText(".lux__title-1", { types: "chars" });
    let title_2 = new SplitText(".lux__title-2", { types: "chars" });

    let menu_shop = document.querySelectorAll(".header__menu-page-item");
    let menu_cart = document.querySelectorAll(".header__menu-end-cart");
    let menu_lg = document.querySelector(".header__menu-end-language");

    let lux_product_1 = document.querySelector("#lux-product-1");
    let lux_product_2 = document.querySelector("#lux-product-2");

    let menuCartArray = Array.from(menu_cart);

    let banner__title = new SplitText(".lux__description", { types: "lines" });

    let title_banner_2 = new SplitType(".banner-home-3__top-content", {
      types: "chars",
    });

    let qoute = new SplitText(".banner-home-3__bottom-content-title", {
      types: "chars",
      //   mask: "lines", // lỗi các chữ như "g" các thứ bị cắt chân
    });

    let home_3_btn = document.querySelector(
      ".banner-home-3__bottom-content-btn"
    );

    menuCartArray.push(menu_lg);

    // console.log(home_3_btn);
    // console.log(lux_product_2);

    let tl_menu = gsap.timeline({});
    let tl_cart = gsap.timeline({});
    let tl_header_title = gsap.timeline({});

    let tl_home_btn = gsap.timeline({
      scrollTrigger: {
        trigger: home_3_btn,
        start: "-100% 90%",
        // end: "bottom 85%",
        // scrub: true,
        // markers: true,
        id: "home-3-btn",
        toggleActions: "play reverse play reverse",
      },
    });

    let tl_header_title_2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner-home-3",
        start: "top 60%",
        end: "top 20%",
        scrub: true,
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });
    let tl_qoute = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner-home-3__bottom-content-title",
        start: "top 94%",
        end: "bottom 95%",
        scrub: true,
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });

    tl_header_title_2.fromTo(
      title_banner_2.chars,
      {
        x: "-50%",
        y: "50%",
        opacity: 0,
      },
      {
        x: "0%",
        y: "0%",
        opacity: 1,
        stagger: {
          each: 0.08,
          from: "start",
        },
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
    tl_qoute.fromTo(
      qoute.chars,
      {
        x: "-50%",
        y: "110%",
        opacity: 0,
      },
      {
        x: "0%",
        y: "0%",
        opacity: 1,
        stagger: {
          each: 0.008,
        },
        duration: 0.4,
        ease: "minh-beo",
      }
    );

    tl_home_btn.fromTo(
      home_3_btn,
      {
        x: "150%",

        // opacity: 0,
      },
      {
        x: "0%",
        // opacity: 1,
        duration: 2,
        ease: "power4.out",
      }
    );

    tl_menu.fromTo(
      menu_shop,
      {
        x: "300%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        stagger: {
          each: 0.08,
          from: "start",
        },
        duration: 0.5,
        ease: "back.out(0.5)",
      }
    );

    tl_cart.fromTo(
      menuCartArray,
      {
        x: "300%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        stagger: {
          each: 0.08,
          from: "start",
        },
        duration: 0.5,
        ease: "back.out(0.5)",
      }
    );

    tl_header_title.fromTo(
      banner__title.lines,
      {
        x: "-200%",
        // opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        stagger: {
          each: 0.08,
          from: "end",
        },
        duration: 0.5,
        ease: "back.out(.4)",
      }
    );

    let tl = gsap.timeline({});

    tl.fromTo(
      title_1.chars,
      {
        x: "-350%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        stagger: {
          each: 0.08,
          from: "end",
        },
        duration: 0.5,
        ease: "back.out(.5)",
      }
    );
    tl.fromTo(
      title_2.chars,
      {
        x: "350%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        stagger: {
          each: 0.08,
          from: "start",
        },
        duration: 0.5,
        ease: "back.out(.5)",
      },
      "-=.8"
    );

    tl.add(tl_menu, "-=.4");
    tl.add(tl_cart, "<");
    tl.add(tl_header_title, "<");

    tl.fromTo(
      lux_product_1,
      {
        y: "200%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "back.out(.4)",
      },
      "-=.3"
    );
    tl.fromTo(
      lux_product_2,
      {
        y: "200%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "back.out(.4)",
      },
      "-=1"
    );

    tl.add(tl_header_title_2);
    tl.add(tl_qoute);

    tl.add(tl_home_btn);
    //////////////////////////////////
    // Shoop- mood hover

    // const hoverImages = document.querySelector(".hover-images");
    // const imgs = hoverImages.querySelectorAll("img");

    // document.querySelectorAll(".shop-mood__line").forEach((line) => {
    //   line.addEventListener("mouseenter", () => {
    //     gsap.to(hoverImages, { opacity: 1, duration: 0.2, ease: "minh-beo-2" });
    //     imgs.forEach((img, i) => {
    //       gsap.to(img, {
    //         opacity: 1,
    //         scale: 1,
    //         // delay: 0.05 * i,
    //         duration: 0.2,
    //         transformOrigin: "50% 50%",
    //         // ease: "none",
    //       });
    //     });
    //   });

    //   line.addEventListener("mouseleave", (e) => {
    //     gsap.to(hoverImages, { opacity: 1, duration: 0.2, ease: "minh-beo-2" });
    //     let x = e.clientX;
    //     let y = e.clientY;

    //     imgs.forEach((img) => {
    //       const offsetX = parseFloat(img.dataset.offsetX) || 0;
    //       const offsetY = parseFloat(img.dataset.offsetY) || 0;

    //       gsap.to(img, {
    //         x: x + offsetX,
    //         y: y - offsetY,

    //         opacity: 0,
    //         scale: 0.8,
    //         duration: 0.2,
    //         transformOrigin: "50% 50%",
    //         // ease: "minh-beo-2",
    //       });
    //     });
    //   });

    //   line.addEventListener("mousemove", (e) => {
    //     // gsap.to(hoverImages, { opacity: 1, duration: 0.2, ease: "power2.out" });

    //     const x = e.clientX;
    //     const y = e.clientY;

    //     gsap.to(hoverImages, {
    //       x: x,
    //       y: y,
    //       // duration: 0.2,
    //       // ease: "power2.out",

    //       onUpdate: () => {
    //         imgs.forEach((img) => {
    //           const offsetX = parseFloat(img.dataset.offsetX) || 0;
    //           const offsetY = parseFloat(img.dataset.offsetY) || 0;
    //           // if (x > window.innerWidth / 2) {
    //           //   x = -x;
    //           // }
    //           gsap.set(img, {
    //             x: x + offsetX,
    //             y: offsetY,

    //             // duration: 0.1,
    //             transformOrigin: "50% 50%",
    //             // ease: "minh-beo-2",
    //           });
    //         });
    //       },
    //     });
    //   });
    // });

    // ////
    window.addEventListener("DOMContentLoaded", () => {
      const noiseImg = document.querySelector(".sale-off__image img");
      // console.log(noiseImg);
      if (noiseImg) {
        gsap.fromTo(
          noiseImg,
          {
            scale: 1.2,
            opacity: 0,
            y: 50,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      }

      /////
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
        // console.log(split_2);
        gsap.from(split_2.words, {
          scrollTrigger: {
            trigger: ".mau-home-2__qoute",
            start: "top 75%",
            // markers: true,
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.3,
          ease: "power2.out",
        });

        // console.log(split_2.words);

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
            id: "big-description",
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
    ////// Sale off
    let saleOffImage = document.querySelector(".sale-off__image img");
    let saleOff = new SplitText(".sale-off__title", {
      types: "words, chars",
      tagName: "span",
    });
    let saleDescription = new SplitText(".sale-off__description", {
      types: "words, chars",
      tagName: "span",
    });

    let button = document.querySelector(".sale-off__button");
    let limit = new SplitText(".sale-off__limited", {
      types: "words, chars",
      tagName: "span",
      mark: "lines",
    });

    // console.log(limit);
    // console.log(button);

    gsap.to(saleOffImage, {
      scrollTrigger: {
        trigger: ".sale-off",
        start: "top center",
        end: "bottom 50%",
        scrub: true,
        // markers: true,
        toggleActions: "play none none reverse",
      },
      y: "+=100",
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "none",
    });

    gsap.fromTo(
      saleOff.chars,
      {
        y: "200%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".sale-off__title",
          start: "top 80%",
          end: "-100% 50%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
        y: "0%",
        opacity: 1,
        stagger: {
          each: 0.03,
          from: "start",
        },
        duration: 0.5,
        ease: "minh-beo",
      }
    );

    gsap.fromTo(
      saleDescription.words,
      {
        y: "200%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".sale-off__description",
          start: "top 80%",
          end: "-100% 50%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
        y: "0%",
        opacity: 1,
        stagger: {
          each: 0.03,
          from: "start",
        },
        duration: 0.5,
        ease: "minh-beo",
      }
    );

    gsap.fromTo(
      button,
      {
        y: "200%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".sale-off__button",
          start: "top 85%",
          end: "-100% 50%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "minh-beo",
      }
    );

    gsap.fromTo(
      limit.words,
      {
        y: "100%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".sale-off__limited",
          start: "top 75%",
          end: "-100% 50%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "minh-beo",
      }
    );
    //////////////////
    const insignt_title = new SplitText(".insignt__title", {
      types: "words, chars",
      tagName: "span",
    });

    const insignt_btn = document.querySelector(".mau-home-2__btn");

    gsap.fromTo(
      insignt_btn,
      {
        y: "-200%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".mau-home-2__btn",
          start: "top 80%",
          end: "-100% 50%",
          // scrub: true,
          // markers: true,
          id: "button",
          toggleActions: "play none none reverse",
        },
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "minh-beo",
      }
    );
    gsap.fromTo(
      insignt_title.chars,
      {
        x: "-200%",
        scale: 1.2,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".insignt__title",
          start: "top 75%",
          end: "-100% 50%",
          scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
        x: "0%",
        scale: 1,
        opacity: 1,
        stagger: {
          each: 0.03,
          from: "end",
        },
        duration: 0.5,
        ease: "back.out(0.5)",
      }
    );

    //Custom A Long
    const carousel = document.querySelector(
      ".insignt__bottom-content-carousel"
    );
    if (!carousel) return;

    const carouselName = carousel.xoName || "carousel";
    const totalSlides = 6;
    const min = 1;
    const max = totalSlides;
    let currentIndex = 1;

    function nextIndex(current) {
      return current >= max ? min : current + 1;
    }

    function prevIndex(current) {
      return current <= min ? max : current - 1;
    }

    ScrollTrigger.create({
      trigger: ".insignt",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const direction = self.direction;
        const indexFromProgress = Math.round(progress * (totalSlides - 1)) + 1;

        if (indexFromProgress !== currentIndex) {
          if (direction > 0) {
            currentIndex = nextIndex(currentIndex);
            xoCarousel.next(carouselName, 1);
          } else if (direction < 0) {
            currentIndex = prevIndex(currentIndex);
            xoCarousel.prev(carouselName, 1);
          } else {
            xoCarousel.goTo(carouselName, currentIndex);
          }
          console.log("hêh", currentIndex);
        }
      },
    });

    // console.log(totalSlides);
  } else {
    // tl.kill();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  runGsapAnimation();
});

window.addEventListener("resize", () => {
  // console.log(window.innerWidth);
  runGsapAnimation();
});
