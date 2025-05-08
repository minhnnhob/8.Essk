gsap.registerPlugin(CustomEase);
CustomEase.create("custom", "0.9,0,0.1,1");

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

window.addEventListener("load", function () {
    console.log("All assets loaded");
  
    const tl = gsap.timeline({ defaults: { ease: "custom" } });
    const counts = document.querySelectorAll(".count");
  
    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(".digit h1");
      const baseTime = index * 1;
  
      tl.to(digits, {
        y: "0%",
        duration: 1,
        stagger: 0.075,
      }, baseTime);
  
      tl.to(digits, {
        y: "-100%",
        duration: 1,
        stagger: 0.075,
      }, baseTime + 1);
    });
  
    tl.to(".spinner", {
      opacity: 0,
      duration: 0.3,
    });
  
    tl.to(".loader", {
      y: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        this.document.body.classList.remove("preloading");
        document.querySelector(".loader").style.display = "none";
        
        

      }
    });
  });
  

