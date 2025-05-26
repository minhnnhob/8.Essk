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

      ///////////////////////////////lineTop/////////////////////
      const headerLineDiv = document.querySelector(".line-div--hide-sm");

      headerTl.from(
        headerLineDiv,
        {
          scaleX: 0,
          duration: 0.7,
          transformOrigin: "left",
          ease: "backout.out(0.75)",
        },
        "<-=0.04"
      );

      ///////////////////////////////////////Section-1//////////////////////////////////////
      const sec1Tl = gsap.timeline({});

    const sec1Title = new SplitText(".order-h-header__title", {
      types: "lines, words, chars",
      tagName: "span",
      mask: "lines",
    })

      sec1Tl.from(
        sec1Title.chars,{
          opacity: 0,
          y: "150%",
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1)",
        }
      )

      sec1Tl.from("#logout-btn",{
        opacity: 0,
        x: "-50%",
        duration: 0.6,
        ease: "back.out(1)",
      }, "+=0")

      ///////////////////////////////////////Section-3////////////////////////
      const sec3Tl = gsap.timeline({});

      sec3Tl.from(
        ".address-list-container__title",{
          opacity: 0,
          y: "150%",
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1)",
        }
      ) 
         sec3Tl.from(
        ".address-list-default__title",{
          opacity: 0,
          y: "150%",
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1)",
        }
      )

      const tableTitle = document.querySelectorAll('#table-title th');

      sec3Tl.from(
        tableTitle, 
        {
          opacity: 0,
          y: "150%",
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1)",
        },
        "<+=0.2"
      )

      const tableLine = document.querySelectorAll('td .line-div');
      const tableDfLine = document.querySelector('.address-list-default .line-div');
        console.log(tableDfLine);
      
      sec3Tl.from(
        tableLine, 
        {
          scaleX: 0,
          duration: 1,
          transformOrigin: "left",
          stagger: 0.1,
          ease: "backout.out(0.75)",
        },
        "<+=0.2"
      ) 
      sec3Tl.from(
        tableDfLine, 
        {
          scaleX: 0,
          duration: 1,
          transformOrigin: "left",
          stagger: 0.1,
          ease: "backout.out(0.75)",
        },
        "<"
      )
      const tableRow = document.querySelectorAll('tr td');
      const tableDfRow = document.querySelectorAll('.address-list-default__content-item');
      sec3Tl.from(
        tableRow, 
        {
          opacity: 0,
          y: "150%",
          duration: 0.4,
          stagger: 0.02,
          ease: "back.out(1)",
        },
        "<+=0.2")
      sec3Tl.from(
        tableDfRow, 
        {
          opacity: 0,
          y: "150%",
          duration: 0.4,
          stagger: 0.02,
          ease: "back.out(1)",
        },
        "<"
      )


      



      ///////////////////////////////////////////Timeline/////////////////////////////////
  
      mainTl.add(sec1Tl, "<+=0.08");
      mainTl.add(headerTl, 
        "-=1"
      );
      mainTl.add(sec3Tl, "<+=0.08");
    });
  }
};

document.addEventListener("bullet-ready", (e) => {
  const nav = e.target;

  let paginations = nav.querySelectorAll(".pagination-num-box__number-item");
  // Carosel number
  const caroselNumLen = paginations.length;

  paginations.forEach((item, index) => {
    if (index !== paginations.length - 2 && index < caroselNumLen) {
      let total = index + 1;

      item.textContent = "0" + total;
    } else if (index === caroselNumLen - 1) {
    } 
    else {
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
