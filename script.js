const firstSection = document.getElementById("firstsection");
const secondSection = document.getElementById("secondsection");
const thirdSection = document.getElementById("thirdsection");
const fourthSection = document.getElementById("fourthsection");

const firstButton = document.getElementById("button_first");
const secondButton = document.getElementById("second_button");
const thirdButton = document.getElementById("third_button");

secondSection.style.display = "none";
thirdSection.style.display = "none";
fourthSection.style.display = "none";

secondSection.style.opacity = "0";
thirdSection.style.opacity = "0";
fourthSection.style.opacity = "0";

function switchSection(currentSection, nextSection) {
  // Start next section invisible
  nextSection.style.opacity = "0";
  nextSection.style.display = "block";

  // Fade current section out
  currentSection.style.opacity = "0";

  setTimeout(() => {
    // Remove old section from layout
    currentSection.style.display = "none";

    // Now tell the browser to animate next section in
    requestAnimationFrame(() => {
      nextSection.style.opacity = "1";
    });
  }, 500);
}

firstButton.addEventListener("click", () => {
  switchSection(firstSection, secondSection);
});

secondButton.addEventListener("click", () => {
  switchSection(secondSection, thirdSection);
});

thirdButton.addEventListener("click", () => {
  switchSection(thirdSection, fourthSection);
});
