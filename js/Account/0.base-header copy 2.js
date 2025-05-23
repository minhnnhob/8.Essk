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
      lenis.on("scroll", ScrollTrigger.update);

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
      headerTl.set(headerLogo[2], { y: "42%" });

      headerTl.fromTo(
        headerLogo,
        { opacity: 0, y: "100%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(2.5)",
        },
        "<"
      );

      //Description-header
      const headerDes = new SplitText(".header__logo-description", {
        types: "lines ,words, chars",
        tagName: "span",
        mask: "lines",
      });

      headerTl.fromTo(
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
        },
        "<+=0.2"
      );

      // menu-header
      let menu_shop = document.querySelectorAll(".header__menu-page-item");
      let menu_cart = document.querySelectorAll(".header__menu-end-cart");
      let menu_lg = document.querySelector(".header__menu-end-language");

      let menuArr = Array.from(menu_cart);
      menuArr.push(menu_lg);

      headerTl.fromTo(
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
        },
        "<+=0.2"
      );

      headerTl.fromTo(
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
        },
        "<+=0.2"
      );

      ///////////////////////////////////////Section-1//////////////////////////////////////
      




      ///////////////////////////////////////////Timeline/////////////////////////////////
      mainTl.add(productDetailTl, "+=0.3");
      mainTl.add(headerTl, "-=4.9");
    });
  }
};

// document.addEventListener("bullet-ready", (e) => {
//   const nav = e.target;

//   let paginations = nav.querySelectorAll(".pagination-num__item");
//   // Carosel number
//   const caroselNumLen = paginations.length;

//   paginations.forEach((item, index) => {
//     if (index !== paginations.length - 2 && index < caroselNumLen) {
//       item.textContent = index + 1;
//     } else if (index === caroselNumLen - 1) {
//     } else {
//       item.textContent = "...";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  runGsapAnimation();
});

window.addEventListener("resize", () => {
  runGsapAnimation();
});

// Collapse toggle
// const collapseItems = document.querySelectorAll(".collapse-content__item");

// collapseItems.forEach((item) => {
//   item.addEventListener("click", () => {
//     const isActive = item.hasAttribute("active");
//     if (isActive) {
//       item.removeAttribute("active");
//     } else {
//       item.setAttribute("active", "");
//     }
//   });
// });
