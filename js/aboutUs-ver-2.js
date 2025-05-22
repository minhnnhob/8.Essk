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
      const sec1Tl = gsap.timeline({});

      sec1Tl.addLabel("start", 0);

      const sec1Title = new SplitText(".about-us-banner__title", {
        type: "lines, words, chars",
        tagName: "span",
        // mask: "lines",
      });

      sec1Tl.from(
        sec1Title.chars,
        {
          opacity: 0,
          y: "50%",
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(2)",
        },
        "<+=0.2"
      );

      const sec1Img = document.querySelector(".about-us-banner__content-image");

      sec1Tl.from(sec1Img, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      });

      const sec1ImgSub = document.querySelector(
        ".about-us-banner__content-description-img"
      );

      sec1Tl.from(
        sec1ImgSub,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.6"
      );

      const sec1Desc = new SplitText(
        ".about-us-banner__content-description-text",
        {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        }
      );

      sec1Tl.from(
        sec1Desc.lines,
        {
          // opacity: 0,
          y: "100%",
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1)",
        },
        "-=0.4"
      );

      /////////////////////////////////////Section-2/////////////////////////////////
      const sec2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-us-luxury",
          start: "top 65%",
          end: "end end",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      const sec2Title = new SplitText(".about-us-luxury__title", {
        type: "lines, words, chars",
        tagName: "span",
        // mask: "lines",
      });

      sec2Tl.from(
        sec2Title.lines,
        {
          opacity: 0,
          y: "50%",
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(2)",
        },
        "0"
      );

      const sec2ContentItem = document.querySelectorAll(
        ".about-us-luxury__content-description-item"
      );

      sec2ContentItem.forEach((item, index) => {
        const title = item.querySelector(
          ".about-us-luxury__content-description-title"
        );
        const text = item.querySelector(
          ".about-us-luxury__content-description-text"
        );

        const titleSplit = new SplitText(title, {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        });

        const textSplit = new SplitText(text, {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            // scrub: true,
            // markers: true,
            toggleActions: "play none none reverse",
          },
        });

        timeline.from(
          titleSplit.lines,
          {
            opacity: 0,
            y: "50%",
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(2)",
          },

          "<+=0.2"
        );

        timeline.from(
          textSplit.lines,
          {
            opacity: 0,
            y: "50%",
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(2)",
          },
          "<+=0.2"
        );
      });

      const sec2Imgs = Array.from(
        document.querySelectorAll(".about-us-luxury__content-slider-image")
      ).slice(0, 3);

      const sec2ImgsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-us-luxury__content-slider",
          start: "top 95%",
          end: "bottom 20%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      sec2ImgsTl.from(sec2Imgs, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: {
          each: 0.2,
          from: "end",
        },
        ease: "back.out(2)",
      });

      /////////////////////////////////line////////////////////////////
      const lines = document.querySelectorAll(".line-div");

      lines.forEach((line) => {
        // const lineTl = gsap.timeline({});

        gsap.from(line, {
          scaleX: 0,
          duration: 1,
          transformOrigin: "center",
          //  transfromOrigin

          ease: "power4.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            // markers: true,
            toggleActions: "play none none reverse",
          },
        });
      });

      ////////////////////////////////End-line////////////////////////

      //////////////////////Section-3///////////////////////////

      const sec3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".customer-say",
          start: "top 80%",
          end: "bottom 20%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
      const sec3Img = document.querySelector(".customer-say__image");
      const sec3Title = new SplitText(".customer-say__content-title", {
        type: "lines, words, chars",
        tagName: "span",
        mask: "lines",
      });
      const sec3Message = new SplitText(".customer-say__content-message", {
        type: "lines, words, chars",
        tagName: "span",
        // mask: "lines",
      });

      sec3Tl.from(
        sec3Img,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        ""
      );

      sec3Tl.from(
        sec3Title.words,
        {
          opacity: 0,
          y: "50%",
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(2)",
        },
        ""
      );
      sec3Tl.from(
        sec3Message.lines,
        {
          opacity: 0,
          y: "50%",
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(2)",
        },
        ""
      );
      //////////////////////////////////////End / Section-3///////////////////////

      /////////////////////////Section-4////////////////////////
      const sec4Img = document.querySelector(".about-us-banner-image__warp");

      gsap.from(sec4Img, {
        filter: "blur(10px)",
        scale: 1.5,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-us-banner-image",
          start: "top 60%",

          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
      /////////////////////////End / Section-4////////////////////////

      ///////////////////////////Section 5////////////////////////
      const sec5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-misson",
          start: "top 60%",
          end: "bottom 20%",
          // scrub: true,
          markers: true,
          toggleActions: "play none none reverse",
        },
      });

      const sec5Title = new SplitText(".about-misson__title", {
        type: "lines, words, chars",
        tagName: "span",
        mask: "lines",
      });

      sec5Tl.from(sec5Title.words, {
        opacity: 0,
        y: "50%",
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
      });

      const sec5Desc1 = new SplitText(".about-misson__description-1", {
        type: "lines, words, chars",
        tagName: "span",
        mask: "lines",
      });
      const sec5Desc2 = new SplitText(".about-misson__description-2", {
        type: "lines, words, chars",
        tagName: "span",
        mask: "lines",
      });

      sec5Tl.from([sec5Desc1.lines, sec5Desc2.lines], {
        opacity: 0,
        y: "50%",
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(1.5)",
      });

      const sec5Feature = document.querySelectorAll(
        ".about-misson__feature-item"
      );

      sec5Feature.forEach((item, index) => {
        const icon = item.querySelector(
          ".customer-favorites__product-infor-icon"
        );
        const text = item.querySelector(
          ".customer-favorites__product-infor-title"
        );
        const splitText = new SplitText(text, {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        });

        const featureTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            // scrub: true,
            // markers: true,
            toggleActions: "play none none reverse",
          },
        });

        featureTl.from(item, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.6,
          ease: "back.out(1)",
        });

        featureTl.from(
          icon,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(0.7)",
          },
          "+=0.2"
        );

        featureTl.from(
          splitText.words,
          {
            opacity: 0,
            y: "50%",
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(2)",
          },
          "-=0.2"
        );
      });

      sec5Tl.from(".about-misson__banner",{
        xPercent: 130,
        duration: 1,
        ease: "back.out(0.4)",
      
      },"-=0.5")

      //////////////////////////End / Section-5///////////////////

      ///////////////////////////////////////////Timeline/////////////////////////////////
      mainTl.add(sec1Tl, "0");
      mainTl.add(headerTl, "<+=1");
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

// Collapse toggle
const collapseItems = document.querySelectorAll(".collapse-content__item");

collapseItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isActive = item.hasAttribute("active");
    if (isActive) {
      item.removeAttribute("active");
    } else {
      item.setAttribute("active", "");
    }
  });
});
