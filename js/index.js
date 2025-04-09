const products = document.querySelectorAll(".product__image");
const more_about__image = document.querySelectorAll(".more-about__image");
const more_about__banner = document.querySelectorAll(".more-about-banner");

const footer__image = document.querySelectorAll(".footer__thumbnail-item");

// console.log(products);
// console.log(more_about__image);
// console.log(more_about__banner);

const options = {
  root: null,
  rootMargin: "0px 0px -5% 0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, options);

const option_banner = {
  root: null,
  rootMargin: "0px 0px 20% 0px",
  threshold: 0,
};

const observer_banner = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, option_banner);

products.forEach((product) => {
  observer.observe(product);
});

more_about__image.forEach((hehe) => {
  observer.observe(hehe);
});

footer__image.forEach((hehe) => {
  observer.observe(hehe);
});

more_about__banner.forEach((hehe) => {
  observer_banner.observe(hehe);
});

// Banner section sinature

const banner = document.querySelector("#signature__item-2");
const banner3 = document.querySelector("#signature__item-3");
const banner4 = document.querySelector("#signature__item-4");
// console.log(banner);

const option_signature = {
  root: null, 
  rootMargin: "0px 0px -20% 0px",
  threshold: .7,
};

const observer_signature = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry.isIntersecting);
    console.log(entry.target);
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer_signature.unobserve(entry.target);
    }
    // else{
    //     entry.target.classList.remove("animate");
    // }
  });
}, option_signature);

observer_signature.observe(banner);
observer_signature.observe(banner3);
observer_signature.observe(banner4);
