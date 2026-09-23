document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // كلمة السر
  // =========================
  const PASSWORD = "اخوات";

  const loginScreen = document.getElementById("loginScreen");
  const site = document.getElementById("site");
  const passwordInput = document.getElementById("passwordInput");
  const enterBtn = document.getElementById("enterBtn");
  const errorMsg = document.getElementById("errorMsg");
  const togglePassword = document.getElementById("togglePassword");

  function enterSite() {
    const password = passwordInput.value.trim();

    if (password === PASSWORD) {
      errorMsg.textContent = "";

      loginScreen.classList.add("hidden");
      site.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      startFallingEmojis();
      revealElements();
    } else {
      errorMsg.textContent = "الباسورد غلط يا صاحبي 😭❤️";

      passwordInput.classList.add("shake");

      setTimeout(() => {
        passwordInput.classList.remove("shake");
      }, 500);
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", enterSite);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        enterSite();
      }
    });
  }

  // إظهار وإخفاء الباسورد
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
      } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁️";
      }
    });
  }


  // =========================
  // زر "تعالى أوريك"
  // =========================
  document.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // =========================
  // ظهور العناصر أثناء النزول
  // =========================
  function revealElements() {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }


  // =========================
  // رسالة صاحبك
  // =========================
  const letterBtn = document.getElementById("letterBtn");
  const letterCard = document.getElementById("letterCard");

  if (letterBtn && letterCard) {
    letterBtn.addEventListener("click", () => {
      letterCard.classList.toggle("open");

      if (letterCard.classList.contains("open")) {
        setTimeout(() => {
          letterCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 150);
      }
    });
  }


  // =========================
  // عارض الصور Lightbox
  // =========================
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");
  const prevPhoto = document.getElementById("prevPhoto");
  const nextPhoto = document.getElementById("nextPhoto");

  const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img")
  );

  let currentPhoto = 0;

  function showPhoto(index) {
    if (!galleryImages.length || !lightbox || !lightboxImage) {
      return;
    }

    currentPhoto =
      (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentPhoto];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "صورة من الذكريات";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");
  }

  function closePhotoViewer() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      if (lightboxImage) {
        lightboxImage.src = "";
      }
    }, 250);
  }

  galleryImages.forEach((image, index) => {
    const button = image.closest(".gallery-item");

    if (button) {
      button.addEventListener("click", () => {
        showPhoto(index);
      });
    }
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", closePhotoViewer);
  }

  if (prevPhoto) {
    prevPhoto.addEventListener("click", () => {
      showPhoto(currentPhoto - 1);
    });
  }

  if (nextPhoto) {
    nextPhoto.addEventListener("click", () => {
      showPhoto(currentPhoto + 1);
    });
  }

  // الضغط خارج الصورة يقفل العارض
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closePhotoViewer();
      }
    });
  }

  // التحكم من الكيبورد
  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closePhotoViewer();
    }

    if (event.key === "ArrowLeft") {
      showPhoto(currentPhoto - 1);
    }

    if (event.key === "ArrowRight") {
      showPhoto(currentPhoto + 1);
    }
  });


  // =========================
  // سحب الصور على الموبايل
  // =========================
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxImage) {
    lightboxImage.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightboxImage.addEventListener(
      "touchend",
      (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 50) {
          return;
        }

        if (difference > 0) {
          showPhoto(currentPhoto + 1);
        } else {
          showPhoto(currentPhoto - 1);
        }
      },
      { passive: true }
    );
  }


  // =========================
  // الإيموجيز النازلة 🫂
  // =========================
  const fallingLayer = document.getElementById("falling-layer");

  function startFallingEmojis() {
    if (!fallingLayer) {
      return;
    }

    // منع تشغيل أكثر من مرة
    if (fallingLayer.dataset.started === "true") {
      return;
    }

    fallingLayer.dataset.started = "true";

    const emojis = [
      "🫂",
      "♥️",
      "❤️",
      "🤞🏻",
      "❣️"
    ];

    function createEmoji() {
      const emoji = document.createElement("span");

      emoji.className = "falling-emoji";
      emoji.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

      emoji.style.left =
        Math.random() * 100 + "vw";

      emoji.style.fontSize =
        10 + Math.random() * 10 + "px";

      emoji.style.animationDuration =
        5 + Math.random() * 7 + "s";

      emoji.style.opacity =
        0.25 + Math.random() * 0.55;

      fallingLayer.appendChild(emoji);

      setTimeout(() => {
        emoji.remove();
      }, 13000);
    }

    // أول دفعة
    for (let i = 0; i < 12; i++) {
      setTimeout(createEmoji, i * 250);
    }

    // استمرار النزول
    setInterval(createEmoji, 650);
  }


  // =========================
  // تشغيل أولي
  // =========================
  revealElements();
});
