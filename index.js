// ✅ Wait until page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  /* ------------------ 1️⃣ Smooth scrolling for nav links ------------------ */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* ------------------ 2️⃣ Button "float" hover effect ------------------ */
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-5px)";
      btn.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      btn.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    });
  });

  /* ------------------ 3️⃣ Scroll reveal animations ------------------ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".hero, .info, .service").forEach(section => observer.observe(section));

  /* ------------------ 4️⃣ Download CV button action ------------------ */
  const cvBtn = document.querySelector(".cv");
  if (cvBtn) {
    cvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cvLink = document.createElement("a");
      cvLink.href = "files/Ukam_Joseph_CV.pdf";
      cvLink.download = "Ukam_Joseph_CV.pdf";
      cvLink.click();
    });
  }

  /* ------------------ 5️⃣ Smooth Single-Card Auto Slider (cards move inside) ------------------ */
  const container = document.querySelector(".service-net");
  const cards = document.querySelectorAll(".service-card");

  if (container && cards.length > 0) {
    let index = 0;
    const total = cards.length;

    // Prepare styles for sliding cards
    container.style.position = "relative";
    container.style.overflow = "hidden";

    cards.forEach((card, i) => {
      card.style.position = "absolute";
      card.style.top = "0";
      card.style.left = "0";
      card.style.width = "100%";
      card.style.transition = "transform 0.6s ease-in-out";
      card.style.transform = `translateX(${i * 100}%)`;
    });

    function showNextCard() {
      index = (index + 1) % total;

      cards.forEach((card, i) => {
        const offset = (i - index + total) % total;
        card.style.transform = `translateX(${offset * 100}%)`;
      });
    }

    let sliderInterval = setInterval(showNextCard, 2500);

    // Pause on hover
    container.addEventListener("mouseenter", () => clearInterval(sliderInterval));
    container.addEventListener("mouseleave", () => sliderInterval = setInterval(showNextCard, 2500));
  }

});
