// gsap.registerPlugin(CustomEase);
// CustomEase.create("custom", "0.9,0,0.1,1");

// const banner_title = document.querySelectorAll(".banner__title");

// const images = Array.from(document.images);
// const script = Array.from(document.scripts);
// const styleSheets = Array.from(document.styleSheets);
// const links = Array.from(
//   document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]')
// );

// console.log(styleSheets);
// console.log(links);

// const total = images.length + links.length;
// let loaded = 0;
// let counter = { value: 0 };

// console.log(total);

// images.forEach((image) => {
//   if (image.complete) {
//     updateProgress();
//   } else {
//     image.addEventListener("load", updateProgress);
//     image.addEventListener("error", updateProgress);
//   }
// });

// // Theo dõi quá trình tải của CSS và các tài nguyên preload
// links.forEach((link) => {
//   // Với các stylesheet đã tải xong
//   if (link.sheet) {
//     updateProgress();
//   } else {
//     // Với các stylesheet hoặc preload chưa tải xong
//     link.addEventListener("load", updateProgress);
//     link.addEventListener("error", updateProgress);
//   }
// });

// // % theo số lượng thành phần tải
// function updateProgress() {
//   loaded++;
//   const progress = Math.floor((loaded / total) * 100);

//   gsap.to(counter, {
//     value: progress,
//     duration: 0.5,
//     onUpdate: () => {
//       document.querySelector(".progress-bar__number").textContent =
//         Math.floor(counter.value) + "%";
//     },
//     ease: "custom",
//   });

//   if (total === 0) {
//     document.querySelector(".progress-bar__number").textContent = "100%";
//     finishLoading(); // gọi ngay nếu không có ảnh
//   }
//   console.log(progress);
//   if (loaded === total) finishLoading();
// }

//test first pre-load -> phải đợi không chạy theo thời gian
// document.addEventListener("DOMContentLoaded", function () {
// //   window.onload = (event) => {
// //     console.log("page is fully loaded");
// //   };

//   const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "custom" } });

//   const counts = document.querySelectorAll(".count");

//   counts.forEach((count, index) => {
//     const digits = count.querySelectorAll(".digit h1");

//     // console.log(digits);

//     tl.to(
//       digits,
//       {
//         y: "0%",
//         duration: 1,
//         stagger: 0.075,
//       },
//       index * 1
//     );

//     if (index < counts.length) {
//       tl.to(
//         digits,
//         {
//           y: "-100%",
//           duration: 1,
//           stagger: 0.075,
//         },
//         index * 1 + 1
//       );
//     }
//   });

//   tl.to(".spinner", {
//     opacity:.3,
//     duration: .3,
//   });

//   tl.to(".loader", {
//     hieght: "100svh",
//     duration: 1,
//     ease: "power2.inOut",
//     delay: 0.5,
//   });
// });

// window.addEventListener("load", function () {
//   console.log("All assets loaded");

//   const tl = gsap.timeline({ defaults: { ease: "custom" } });
//   const counts = document.querySelectorAll(".count");

//   counts.forEach((count, index) => {
//     const digits = count.querySelectorAll(".digit h1");
//     const baseTime = index * 1;

//     tl.to(
//       digits,
//       {
//         y: "0%",
//         duration: 1,
//         stagger: 0.075,
//       },
//       baseTime
//     );

//     tl.to(
//       digits,
//       {
//         y: "-100%",
//         duration: 1,
//         stagger: 0.075,
//       },
//       baseTime + 1
//     );
//   });

//   tl.to(".spinner", {
//     opacity: 0,
//     duration: 0.3,
//   });

//   //   tl.to(".loader", {
//   //     y: "-100%",
//   //     duration: .5,
//   //     ease: "circ.inOut",
//   //     onComplete: () => {
//   //     //   document.body.classList.remove("preloading");
//   //     //   document.querySelector(".loader").style.display = "none";
//   //     //   banner_title.forEach((title) => {
//   //     //     title.classList.remove("banner__title--hide");
//   //     //   })
//   //     //   banner_title.classList.remove("banner__title--hide");
//   //     },
//   //   });
// });

gsap.registerPlugin(CustomEase);
CustomEase.create("custom", "0.9,0,0.1,1");

const banner_title = document.querySelectorAll(".banner__title");
const counts = document.querySelectorAll(".count");

const images = Array.from(document.images);
const links = Array.from(
  document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]')
);

const total = images.length + links.length;
let loaded = 0;
let counter = { value: 0 };

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

function updateProgress() {
  loaded++;
  const progress = Math.floor((loaded / total) * 100);

  gsap.to(counter, {
    value: progress,
    duration: 0.5,
    onUpdate: () => {
      // document.querySelector(".progress-bar__number").textContent =
      //   Math.floor(counter.value) + "%";
    },
    ease: "custom",
  });

  if (total === 0) {
    document.querySelector(".progress-bar__number").textContent = "100%";
    finishLoading();
  }

  if (loaded === total) {
    finishLoading();
  }
}

function finishLoading() {
  const tl = gsap.timeline({ defaults: { ease: "custom" } });

  // Digit animation
  counts.forEach((count, index) => {
    const digits = count.querySelectorAll(".digit h1");
    const baseTime = index * 1;

    tl.to(
      digits,
      {
        y: "0%",
        duration: 1,
        stagger: 0.075,
      },
      baseTime
    );

    tl.to(
      digits,
      {
        y: "-100%",
        duration: 1,
        stagger: 0.075,
      },
      baseTime + 1
    );
  });

  // Spinner fade out
  tl.to(".spinner", {
    opacity: 0,
    duration: 0.3,
  });

  // Loader hide and show content
  tl.to(".loader", {
    y: "-100%",
    duration: 0.5,
    ease: "circ.inOut",
    onComplete: () => {
      document.querySelector(".loader").style.display = "none";
    },
  });

  tl.add(() => {
    document.querySelector(".banner").classList.remove("preloading");
    // document.querySelector(".loader").style.display = "none";
    banner_title.forEach((title) => {
      title.classList.remove("banner__title--hide");
    });
  }, "-=0.4");
}
