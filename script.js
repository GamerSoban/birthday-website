const firstSection = document.getElementById("firstsection");
const secondSection = document.getElementById("secondsection");
const thirdSection = document.getElementById("thirdsection");
const fourthSection = document.getElementById("fourthsection");
const fifthSection = document.getElementById("fifthsection");
const masterdiv = document.getElementById("masterdiv");

const firstButton = document.getElementById("button_first");
const secondButton = document.getElementById("second_button");
const thirdButton = document.getElementById("third_button");
const finalButton = document.getElementById("final_button");
const lilyCanvas = document.getElementById("lilyView");
const cursorTrail = document.getElementById("cursor-trail");
let lilyStarted = false;

const trailEnabled =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lastStarPosition = null;
let starSpawnIndex = 0;

function addTrailStar(x, y) {
  const star = document.createElement("span");
  const colors = ["#f6c945", "#fff8e7"];
  star.className = "trail-star";
  star.textContent = starSpawnIndex % 4 === 0 ? "★" : "✦";
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  star.style.setProperty("--star-color", colors[starSpawnIndex % colors.length]);
  star.style.setProperty("--star-size", `${10 + Math.random() * 9}px`);
  star.style.setProperty("--star-duration", `${650 + Math.random() * 350}ms`);
  star.style.setProperty("--star-drop", `${30 + Math.random() * 45}px`);
  star.style.setProperty("--star-drift", `${Math.random() * 36 - 18}px`);
  star.style.setProperty("--star-rotation", `${Math.random() * 180 - 90}deg`);
  cursorTrail.appendChild(star);
  star.addEventListener("animationend", () => star.remove(), { once: true });
  starSpawnIndex += 1;
}

if (trailEnabled) {
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const current = { x: event.clientX, y: event.clientY };
    if (lastStarPosition) {
      const distance = Math.hypot(
        current.x - lastStarPosition.x,
        current.y - lastStarPosition.y,
      );
      if (distance < 10) return;
    }

    addTrailStar(current.x, current.y);
    if (starSpawnIndex % 3 === 0) {
      addTrailStar(current.x + Math.random() * 12 - 6, current.y + Math.random() * 12 - 6);
    }
    lastStarPosition = current;
  });

  window.addEventListener("pointerleave", () => {
    lastStarPosition = null;
  });
}

secondSection.style.display = "none";
thirdSection.style.display = "none";
fourthSection.style.display = "none";
fifthSection.style.display = "none";

secondSection.style.opacity = "0";
thirdSection.style.opacity = "0";
fourthSection.style.opacity = "0";
fifthSection.style.opacity = "0";

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

finalButton.addEventListener("click", () => {
  fifthSection.setAttribute("aria-hidden", "false");
  finalButton.disabled = true;
  switchSection(fourthSection, fifthSection);
  if (!lilyStarted) {
    lilyStarted = true;
    window.setTimeout(() => initLilyAnimation(lilyCanvas), 500);
  }
});
