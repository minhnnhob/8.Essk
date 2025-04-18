const checkSize = () => {
  const animates = document.querySelectorAll("xo-animate");
  const width_s = window.innerWidth;
  //   console.log(width_s);
  if (!animates) {
    console.warn("Không tìm thấy <xo-animate>");
    return;
  }
  if (width_s <= 992) {
    // console.log(width_s);v
    animates.forEach((item) => {
      item.setAttribute("xo-disabled", "");
    });
  } else {
    animates.forEach((item) => {
      item.removeAttribute("xo-disabled", "");
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  customElements.whenDefined("xo-animate").then(() => {
    checkSize();
  });
});

customElements.whenDefined("xo-animate").then(() => {
  checkSize();
});

window.addEventListener("resize", () => {
  // const width_s = window.innerWidth;
  // console.log(width_s);
  checkSize();
});
