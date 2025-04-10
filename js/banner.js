const sig_items = document.querySelectorAll(".signature__item");
const sections2 = document.querySelector("#signature__item-2");
const sections3 = document.querySelector("#signature__item-3");
const sections4 = document.querySelector("#signature__item-4");

console.log(sig_items);

options_sig = {
  root: null,
  rootMargin: "0px 0px -100% 0px",
  thrreshold: 0,
};

const observer_sig = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (entry.isIntersecting) {
      entry.target.classList.add("absolute");
      entry.target.classList.remove("fixed");
      //   sections2.classList.remove("fixed");
    } else {
      entry.target.classList.remove("absolute");
      //   sections2.classList.add("fixed");
      entry.target.classList.remove("fixed");
    }
  });
}, options_sig);

sig_items.forEach((item) => {
  observer_sig.observe(item);
});

optionsImg = {
  root: null,
  rootMargin: "0px 0px 0% 0px",
  thrreshold: 1,
};

const observerImg = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);

    const currentIndex = Array.from(sig_items).indexOf(entry.target);
    console.log(currentIndex);
    if (entry.isIntersecting) {
      entry.target.classList.add("fixed");
      if (currentIndex > 1 && currentIndex <= sig_items.length) {
        sig_items[currentIndex - 2].classList.add("bruh");
      }
    } else {
      entry.target.classList.remove("fixed");
      if (currentIndex > 0 && currentIndex <= sig_items.length) {
        sig_items[currentIndex - 2].classList.remove("bruh");
      }
    }
  });
}, optionsImg);

observerImg.observe(sections2);
observerImg.observe(sections3);
observerImg.observe(sections4);
