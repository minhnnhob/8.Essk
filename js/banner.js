// const sig_items = document.querySelectorAll(".signature__item");
const sections2 = document.querySelector("#signature__item-2");
const sections3 = document.querySelector("#signature__item-3");
const sections4 = document.querySelector("#signature__item-4");

// console.log(sig_items);

options_sig = {
  root: null,
  rootMargin: "0px 0px -40% 0px",
  thrreshold: 0,
};

const observer_sig = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (entry.isIntersecting) {
      entry.target.classList.add("absolute");
      entry.target.classList.remove("fixed");
      //   sections2.classList.remove("fixed");
      //   observer_sig.unobserve(entry.target);
      observerImg.unobserve(entry.target);
    } else {
      entry.target.classList.remove("absolute");
      //   sections2.classList.add("fixed");
      entry.target.classList.remove("fixed");
    }
  });
}, options_sig);

options_sig_2 = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  thrreshold: 0,
};

const observer_sig_2 = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (entry.isIntersecting) {
      entry.target.classList.add("absolute");
      // entry.target.classList.add("fixed");
      entry.target.classList.remove("fixed");
      //   sections2.classList.remove("fixed");
      //   observer_sig.unobserve(entry.target);
      // observerImg.unobserve(entry.target);
    } else {
      entry.target.classList.remove("absolute");
      //   sections2.classList.add("fixed");
      entry.target.classList.remove("fixed");
    }
  });
}, options_sig_2);

// sig_items.forEach((item) => {
//   observer_sig.observe(item);
// });

observer_sig.observe(sections2);
observer_sig.observe(sections3);
observer_sig_2.observe(sections4);



optionsImg = {
  root: null,
  rootMargin: "0px 0px 0% 0px",
  thrreshold: 1,
};

const observerImg = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);

    const currentIndex = Array.from(sig_items).indexOf(entry.target);
    // console.log(currentIndex);
    // console.log(currentIndex - 1);
    if (entry.isIntersecting) {
      entry.target.classList.add("fixed");
    } else {
      entry.target.classList.remove("fixed");
    }
  });
}, optionsImg);

observerImg.observe(sections2);
observerImg.observe(sections3);
observerImg.observe(sections4); 


