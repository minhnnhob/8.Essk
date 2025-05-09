const images = Array.from(document.images);
const links = Array.from(
  document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]')
);

const banner_title = document.querySelectorAll(".banner__title");
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

gsap.ticker.add(() => {
  counter.value += (targetProgress - counter.value) * 0.05;

  const current = Math.floor(counter.value);
  //   document.querySelector(".num-test-2").textContent = current + "%";
  //   document.querySelector(".line-test-2").style.width = current - 10 + "%";

  gsap.to(".num-test-2", {
    textContent: current + "%",
    duration: 0.1,
    snap: "textContent",
    ease: "power2.out",
  });

  gsap.to(".line-test-2", {
    width: current - 10 + "%",
    duration: 0.1,
    ease: "power2.out",
  });

  // Nếu đã loaded hết và đạt 100% hiển thị
  if (loaded === total && current >= 100) {
    const elapsed = performance.now() - startTime;

    if (elapsed >= 1500) {
      gsap.ticker.remove(updateProgress);
      // tween số trong object counter về targetProgress

      gsap.to(".num-test-2", {
        opacity: 0,
        y: 100,
        duration: 0.9,

        ease: "power2.out",
      });

      gsap.to(".line-test-2", {
        opacity: 0,
        duration: 0.1,

        ease: "power2.out",
      });

      //   gsap.to(".loader-test-2");
      const tl = gsap.timeline({});
      tl.to(".block-test-21", {
        x: "-50vw",
        duration: 1,
        ease: "power2.out",
      }).to(
        ".block-test-22",
        {
          x: "50vw",
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      tl.add(() => {
        document.querySelector(".banner").classList.remove("banner--hide");
        void document.querySelector(".banner").offsetHeight;
        // document.querySelector(".banner").classList.add("banner--ready")
        document.querySelector(".loader-test-2").style.display = "none";
        banner_title.forEach((title) => {
          title.classList.remove("banner__title--hide");
        });
        // document.querySelector(".header").classList.remove("header--hide");
      }, "-=0.4");

      tl.to(
        ".header__logo-icon",
        {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "+=1"
      );

      tl.to(
        ".header__logo-description",
        {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          //   delay: 0.1,
        },
        ">-=0.2"
      );

      tl.to(
        ".header__menu-page-item",
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        ">-=0.4"
      );

      tl.to(
        ".header__menu-end-cart",
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        ">-=0.2"
      );

      tl.to(
        ".banner__slide-num-item",
        {
          y: "0%",
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
          stagger: {
            amount: 0.2,
            from: "end",
          },
        },
        ">-=0.6"
      );
    }
  }
  if (loaded === total && targetProgress === 100 && counter.value >= 99.5) {
    counter.value = 100;
  }
});
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

document.addEventListener("DOMContentLoaded", function() {
    // Chọn phần tử cần theo dõi
    const title = document.querySelector(".more-about__title");

    // Tạo đối tượng SplitText để chia văn bản thành các ký tự
    const split = new SplitText(title, { type: "words, chars" });

    console.log(split.words);

    // Sử dụng ScrollTrigger để kích hoạt animation khi phần tử vào 30% viewport
    gsap.from(split.words, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: .4,
      ease: "power2.out",  // Ease cho animation
      scrollTrigger: {
        trigger: title,
        start: "top 70%",
        end: "top 30%",

        // markers: true,
      },
    });
    const lineBreaks = title.querySelectorAll("br");
    lineBreaks.forEach((br) => {
        br.style.display = 'block'; // Đảm bảo <br /> được hiển thị như một dòng mới
    });
  });

// document.addEventListener("DOMContentLoaded", function () {
//   const title = document.querySelector(".more-about__title");

//   const content = title.innerHTML.split(/(<br\s*\/?>)/);

//   title.innerHTML = "";

//   console.log(content);

//   content.forEach((segment) => {
//     if (segment === "<br>") {
//     } else {
//       const lineDiv = document.createElement("div");
//       lineDiv.classList.add("line");

//       const words = segment.split(/\s+/);
//       words.forEach((word) => {
//         const span = document.createElement("div");

//         span.innerText = word;
//         lineDiv.appendChild(span);
//       });

//       title.appendChild(lineDiv);
//     }
//   });

//   gsap.from(".more-about__title .line", {
//     opacity: 0,
//     y: 50,
//     stagger: 0.2,
//     duration: 1,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: ".more-about__title",
//       start: "top 80%",
//       end: "top 20%",
//       markers: true,
//     },
//   });
// });
