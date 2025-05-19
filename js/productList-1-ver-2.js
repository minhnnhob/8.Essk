const runGsapAnimation = () => {
  const preload = () => {
    const images = Array.from(document.images);
    const links = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]')
    );

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

    // const preloadT1 = gsap.timeline({ paused: true });
    const preloadT1 = gsap.timeline();

    let lastProgress = -1;

    const onTick = () => {
      counter.value += (targetProgress - counter.value) * 0.05;
      const current = Math.floor(counter.value);

      if (current !== lastProgress) {
        preloadT1.to(".number-home-2", {
          textContent: current + "%",
          duration: 0.1,
          snap: "textContent",
          ease: "power2.out",
        });
      }
      if (loaded === total && current >= 100) {
        const elapsed = performance.now() - startTime;
        // performance.now() ~ date.now()

        if (elapsed >= 1500) {
          //ddamr bao thoi gian load toi thieu 1.5s
          gsap.ticker.remove(onTick);

          preloadT1.to(".number-home-2", {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "none",
          });

          preloadT1.to(".number-home-2", {
            scale: 0.6,
            opacity: 0,
            duration: 0.4,
            ease: "none",
          });

          preloadT1.to(".block-home-2", {
            height: "0",
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              each: 0.05,
              from: "start",
            },
          });

          preloadT1.add(() => {
            document.querySelector(".loader-home-2").style.display = "none";
          });
        }
      }
      if (loaded === total && targetProgress === 100 && counter.value >= 99.5) {
        counter.value = 100;
      }
    };

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

    gsap.ticker.add(onTick);

    return preloadT1;
  };

  const enablePreload = false;

  if (window.innerWidth > 768) {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

      //Timeline Main:
      const mainTl = gsap.timeline();

      //   Preloading
      if (enablePreload) {
        const preloadTl = preload();
        mainTl.add(preloadTl);
      }
      // Header
      const headerTl = gsap.timeline({
        // scrollTrigger: {
        //   trigger: ".header-home-2",
        //   start: "top top",
        //   end: "+=200%",
        //   scrub: true,
        //   pin: true,
        //   pinSpacing: false,
        // },
      });
      //Logo-header
      const headerLogo = document.querySelectorAll(".header__logo-icon path");
      gsap.set(headerLogo[2], { y: "42%" });

      gsap.fromTo(
        headerLogo,
        { opacity: 0, y: "100%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(2.5)",
        }
      );

      //Description-header
      const headerDes = new SplitText(".header__logo-description", {
        types: "lines ,words, chars",
        tagName: "span",
        mask: "lines",
      });

      gsap.fromTo(
        headerDes.words,
        {
          opacity: 0,
          y: "50%",
          duration: 0.5,
          stagger: 0.02,
          ease: "back.out",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          stagger: 0.02,
          ease: "back.out",
        }
      );

      // menu-header
      let menu_shop = document.querySelectorAll(".header__menu-page-item");
      let menu_cart = document.querySelectorAll(".header__menu-end-cart");
      let menu_lg = document.querySelector(".header__menu-end-language");

      let menuArr = Array.from(menu_cart);
      menuArr.push(menu_lg);

      gsap.fromTo(
        menu_shop,
        {
          opacity: 0,
          y: "100%",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(2)",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(2)",
        }
      );

      gsap.fromTo(
        menuArr,
        {
          opacity: 0,
          y: "100%",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(2)",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(2)",
        }
      );

      // Banner
      let bannerTitle_1 = new SplitText(".title-1", {
        types: "lines ,words, chars",
        tagName: "span",
        // mask: "lines",
      });
      let bannerTitle_2 = new SplitText(".title-2", {
        types: "lines ,words, chars",
        tagName: "span",
        // mask: "lines",
      });

      gsap.fromTo(
        [bannerTitle_1.chars],
        {
          opacity: 0,
          y: "50%",
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out",
        }
      );
      gsap.fromTo(
        [bannerTitle_2.chars],
        {
          opacity: 0,
          y: "50%",
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out",
        }
      );

      // Line
      const line_gradient = document.querySelectorAll(".line-gradient");
      //   console.log(line_gradient);
      gsap.fromTo(
        line_gradient,
        { scaleX: 0, scaleY: 10 },
        {
          scaleX: 1,
          duration: 3,
          scaleY: 1,
          ease: "power4.out",
        }
      );

      // Filter
      const filterTitle = new SplitText(".filter__title", {
        types: "lines ,words, chars",
        tagName: "span",
        mask: "lines",
      });
      const filterCollapseItem = document.querySelectorAll(
        ".collapse-content__item"
      );

      gsap.fromTo(
        filterTitle.chars,
        {
          opacity: 0,
          y: "50%",
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 1,
          stagger: 0.08,
          ease: "back.out",
        }
      );
      // Filter Item
      const filterItems = document.querySelectorAll(".collapse-header");

      const filterItemTl = gsap.timeline({
        // scrollTrigger: {
        //   trigger: ".filter__title",
        //   start: "top 80%",
        //   // markers: true,
        //   toggleActions: "play none none reverse",
        // },
      });

      filterItems.forEach((item, index) => {
        const icon = item.querySelector(".collapse-header__icon");
        const title = item.querySelector(".collapse-header__title");
        const title_text = new SplitText(title, {
          types: "lines ,words, chars",
          tagName: "span",
          mask: "lines",
        });

        const headerTl = gsap.timeline({
          //   scrollTrigger: {
          //     trigger: item,
          //     start: "top 80%",
          //     // markers: true,
          //     toggleActions: "play none none reverse",
          //   },
        });

        headerTl.fromTo(
          icon,
          { rotate: -90 },
          { rotate: 0, duration: 1, ease: "back.out(1)" }
        );

        headerTl.fromTo(
          title_text.words,
          { opacity: 0, y: "100%" },
          {
            opacity: 1,
            y: "0%",
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1)",
          },
          "<"
        );
      });

      filterItemTl.fromTo(
        filterItems,
        { opacity: 0, y: "50%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(5)",
          onComplete: () => {
            // let collapseFilter = filterItems[6].nextElementSibling;
            // filterItems[6].setAttribute("xo-active", "");
            // gsap.to(collapseFilter, {
            //   height: "auto",
            //   duration: 1,
            //   ease: "back.out(1)",
            //   onComplete: () => {
            //     collapseFilter.setAttribute("xo-active", "");
            //   },
            // });
          },
        }
      );

      //Filter Item Content

      gsap.fromTo(
        filterCollapseItem,
        { opacity: 0, y: "50%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(5)",
        },
        "<-=1.8"
      );

      //////////////////////////
    });
  }
};

document.addEventListener("bullet-ready", (e) => {
  const nav = e.target;

  let paginations = nav.querySelectorAll(".pagination-num__item");
  // Carosel number
  const caroselNumLen = paginations.length;

  paginations.forEach((item, index) => {
    if (index !== paginations.length - 2 && index < caroselNumLen) {
      item.textContent = index + 1;
    } else if (index === caroselNumLen - 1) {
    } else {
      item.textContent = "...";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  runGsapAnimation();
});

window.addEventListener("resize", () => {
  runGsapAnimation();
});
