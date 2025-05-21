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

      //////////////////////////////Scroll//////////////////

      // const prDetailLeft = document.querySelector(
      //   ".product-detail__scroll-left"
      // );

      // prDetailLeft.addEventListener("mouseenter", () => {
      //   lenis.stop();
      //   // console.log(prDetailLeft);
      // });
      // prDetailLeft.addEventListener("mouseleave", () => {
      //   lenis.start();
      // });

      /////scroll
      // prDetailLeft.addEventListener("wheel", (e) => {
      //   const isAtTop = prDetailLeft.scrollTop === 0;
      //   const isAtBottom =
      //     prDetailLeft.scrollTop + prDetailLeft.clientHeight >=
      //     prDetailLeft.scrollHeight;
      //   const isScrollingDown = e.deltaY > 0;

      //   const canScroll =
      //     (isScrollingDown && !isAtBottom) || (!isScrollingDown && !isAtTop);

      //   if (canScroll) {
      //     e.stopPropagation();
      //   } else {
      //     lenis.start();
      //   }
      // });

      // const prDetailRight = document.querySelector(
      //   ".product-detail__slider--lg"
      // );

      // prDetailRight.addEventListener("mouseenter", () => {
      //   lenis.stop();

      // console.log("stop" );
      // });
      // prDetailRight.addEventListener("mouseleave", () => {
      //   lenis.start();
      // });

      /////scroll
      // prDetailRight.addEventListener("wheel", (e) => {
      //   const isAtTop = prDetailRight.scrollTop === 0;
      //   const isAtBottom =
      //     prDetailRight.scrollTop + prDetailRight.clientHeight >=
      //     prDetailRight.scrollHeight;
      //   const isScrollingDown = e.deltaY > 0;

      //   const canScroll =
      //     (isScrollingDown && !isAtBottom) || (!isScrollingDown && !isAtTop);

      //   if (canScroll) {
      //     e.stopPropagation();
      //   } else {
      //     lenis.start();
      //   }
      // });
      //////////////////////////////////////ildflow//title position///////////////////////////
      // const wild_title = document.querySelector(".product-detail__infor-title");
      // const caculate = document.querySelector(".product-detail__infor-caculate");
      // caculate.style.paddingTop = `${wild_title.offsetHeight + 60}px`;
      ///////////////carosel//////////////////////
      // const proCarosel = document.querySelector("#carosel-product-detail");

      // if (!proCarosel) return;

      // const carouseName = proCarosel.xoName || "carousel";
      // const totalSlides = 6;
      // const min = 1;
      // const max = totalSlides;

      // let currentIndex = 1;
      // let isScrolling = false;

      // function nextIndex(current) {
      //   return current >= max ? min : current + 1;
      // }

      // function prevIndex(current) {
      //   return current <= min ? max : current - 1;
      // }

      // proCarosel.addEventListener(
      //   "wheel",
      //   (e) => {
      //     e.preventDefault();
      //     if (isScrolling) return;
      //     const isScrollingDown = e.deltaY > 0;
      //     const isScrollingUp = e.deltaY < 0;
      //     if (isScrollingDown) {
      //       currentIndex = nextIndex(currentIndex);
      //       xoCarousel.next(carouseName, 1);
      //       // console.log("down", currentIndex);
      //     } else if (isScrollingUp) {
      //       currentIndex = prevIndex(currentIndex);
      //       xoCarousel.prev(carouseName, 1);
      //       // console.log("up", currentIndex);
      //     } else {
      //       xoCarousel.goTo(carouseName, currentIndex);
      //     }
      //     // console.log("hêhê", currentIndex);
      //     isScrolling = true;
      //     setTimeout(() => {
      //       isScrolling = false;
      //     }, 600);
      //   },
      //   { passive: false }
      // );
      ///////////////////////////////////////Section-1//////////////////////////////////////
      const productDetailTl = gsap
        .timeline
        // {paused:true}
        ();

      ///////product-infor-title//////
      const prInforTitle = new SplitText(".product-detail__infor-title", {
        type: "lines, words, chars",
        tagName: "span",
      });

      productDetailTl.from(prInforTitle.chars, {
        opacity: 0,
        y: "100%",
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1)",
      });

      ///////Breadcrumb//////
      const prBreadCrumb = document.querySelectorAll(".breadcrumb__item");

      productDetailTl.from(
        prBreadCrumb,
        {
          opacity: 0,
          y: "200%",
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(.75)",
        },
        "<+=0.9"
      );

      ////product-caculate///
      const prCaculate = document.querySelectorAll(".line-container");

      productDetailTl.from(
        prCaculate,
        {
          opacity: 0,
          width: 0,
          transformOrigin: "left",
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(.5)",
        },
        "<+=0.2"
      );

      ////product- button/////
      const prButton = document.querySelectorAll(".button-2");
      productDetailTl.from(
        prButton,
        {
          opacity: 0,
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          stagger: 0.2,
          ease: "back.out(.5)",
        },
        "<-=0.01"
      );

      /////////////product-detail__descript////////////////
      const prDescriptTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".product-detail__description",
          start: "top 70%",
          // end: "+=200%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      const prDescriptTitle = new SplitText(
        ".product-detail__description-content-title",
        {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        }
      );
      prDescriptTl.from(
        prDescriptTitle.chars,
        {
          // opacity: 0,
          y: "150%",
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(0.75)",
        },
        "<-=0.1"
      );

      const prDescriptContent = new SplitText(
        ".product-detail__description-content-text",
        {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        }
      );

      prDescriptTl.from(
        prDescriptContent.lines,
        {
          opacity: 0,
          y: "100%",
          duration: 0.3,
          stagger: 0.08,
          ease: "back.out(1)",
        },
        "<-=0.01"
      );

      const prConatentTitle = new SplitText(
        ".product-detail__description-notes-title",
        {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        }
      );
      prDescriptTl.from(
        prConatentTitle.chars,
        {
          // opacity: 0,
          y: "150%",
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(0.75)",
        },
        "<-=0.1"
      );

      const prContentContent = document.querySelectorAll(
        ".product-detail__description-notes-item"
      );

      prDescriptTl.from(
        prContentContent,
        {
          opacity: 0,
          y: "200%",
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.75)",
        },
        "<-=0.01"
      );

      /////////////product-detail__customers feedback////////////////
      const prCustomersTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".product-detail-fb",
          start: "top 80%",
          // end: "+=200%",
          // scrub: true,
          markers: true,
          toggleActions: "play none none reverse",
        },
      });

      const prCustomerTitle = new SplitText(
        ".product-detail-fb__header-title",
        {
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        }
      );
      prCustomersTl.from(
        prCustomerTitle.chars,
        {
          // opacity: 0,
          y: "150%",
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(0.75)",
        },
        "<-=0.1"
      );

      const rateTing = document.querySelector(
        ".product-detail-fb__header-rate"
      );

      prCustomersTl.from(
        rateTing,
        {
          opacity: 0,
          y: "100%",
          duration: 0.5,
          ease: "back.out(0.75)",
        },
        "-=1"
      );

      const prCustomersTlIn = gsap.timeline();

      const cusFeedback = document.querySelector(".customer-feedback__image");

      prCustomersTlIn.from(cusFeedback, {
        opacity: 0,
        y: "100%",
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "back.out(0.75)",
      }, "<-=1");

      const start1 = document.querySelectorAll(
        ".customer-feedback__rating-icon svg"
      );

      prCustomersTlIn.from(
        start1,
        {
          opacity: 0,
          y: "100%",
          transformOrigin: "bottom",
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(0.75)",
        },
        "-=1"
      );

      const cusFeedbackText = new SplitText(
        ".customer-feedback__rating-message",{
          type: "lines, words, chars",
          tagName: "span",
          mask: "lines",
        }
      );

      prCustomersTlIn.from(cusFeedbackText.words, {
        opacity: 0,
        y: "100%",
        transformOrigin: "bottom",
        duration: 0.3,
        stagger: 0.02,
        ease: "back.out(0.75)",
      },"-=1");


      const cusFeedbackName = new SplitText(".customer-feedback__rating-name",{
        type: "lines, words, chars",
        tagName: "span",
        mask: "lines",
      })

      prCustomersTlIn.from(cusFeedbackName.words, {
        opacity: 0,
        y: "-100%",
        transformOrigin: "bottom",
        duration: 0.5,
        stagger: 0.04,
        ease: "back.out(0.75)",
      },"-=1");




      //////////////////////

      const cusFeedbackLast = document.querySelector(
        ".customer-feedback--last .customer-feedback__image"
      );

      prCustomersTlIn.from(cusFeedbackLast, {
        opacity: 0,
        y: "100%",
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "back.out(0.75)",
      });

      prCustomersTl.add(prCustomersTlIn, "-=1.5");

      // /////////////End/ product-detail__customers feedback////////////////

      ///////////////////////////////Image///////////////////////
      const prImage = document.querySelectorAll(
        ".product-detail__vertical-image-warp"
      );
      // console.log(prImage);

      productDetailTl.from(
        prImage,
        {
          opacity: 0,
          x: "100%",
          transformOrigin: "left",
          duration: 1,
          stagger: 0.2,
          ease: "back.out(.5)",
        },
        "<-=0.035"
      );

      ////////////////////////////////

      ////////////////////////////////section-2 Trigger//////////////////////

      // const section2tL = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".more-about--product-detail",
      //     start: "top center",
      //     // end: "+=200%",
      //     // scrub: true,
      //     // markers: true,
      //     toggleActions: "play none none reverse",
      //   },
      // });

      // const section2Title = new SplitText(".more-about__title", {
      //   type: "lines, words, chars",
      //   tagName: "span",
      //   // mask: "lines",
      // });

      // section2tL.from(
      //   section2Title.words,
      //   {
      //     opacity: 0,
      //     y: "100%",
      //     duration: 0.5,
      //     stagger: 0.08,
      //     ease: "back.out(0.75)",
      //   },
      //   "<-=0.3"
      // );

      // const section2Des1 = new SplitText(".more-about__description-1", {
      //   type: "lines, words, chars",
      //   tagName: "span",
      //   mask: "lines",
      // });
      // const section2Des2 = new SplitText(".more-about__description-2", {
      //   type: "lines, words, chars",
      //   tagName: "span",
      //   mask: "lines",
      // });

      // section2tL.from(
      //   [section2Des1.words, section2Des2.words],
      //   {
      //     opacity: 0,
      //     y: "100%",
      //     duration: 0.3,
      //     stagger: 0.04,
      //     ease: "back.out(0.75)",
      //   },
      //   "<-=0.3"
      // );

      ////////////////////section-3 Trigger/////////////////
      const section3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".related-product",
          start: "top 70%",
          // end: "+=200%",
          // scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      const section3Title = new SplitText(".related-product__title", {
        type: "lines,words, chars",
        tagName: "span",
        mask: "lines,",
      });

      section3Tl.from(section3Title.chars, {
        y: "-100%",
        duration: 0.4,
        stagger: 0.02,
        ease: "back.out(.75)",
      });

      const section3Img = document.querySelectorAll(".product");
      // console.log(section3Img)

      section3Tl.from(section3Img, {
        x: "320%",
        duration: 0.6,
        stagger: 0.04,
        ease: "back.out(0.5)",
      });

      ///////////////////////////////////////////Timeline/////////////////////////////////
      mainTl.add(productDetailTl, "<+=0.3");
      mainTl.add(headerTl, "-=1.1");
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
