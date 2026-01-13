const preloader = document.getElementById("preloader");
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");
const logo = document.getElementById("logo");

// Disable scroll while preloader is active
document.body.classList.add("loading");

// Step 1: Logo fade & scale in with ultra-smooth animation
gsap.set(logo, {
  opacity: 0,
  scale: 0.95,
  force3D: true,
});

gsap.to(logo, {
  opacity: 1,
  scale: 1,
  duration: 2.5,
  ease: "power4.out",
  force3D: true,
  clearProps: "transform",
});

// Counter animation from 0 to 100
let count = 0;
const targetCount = 100;
const duration = 1000; // 2 seconds for counter (faster)
let animationStartTime = null;

function updateCounter(timestamp) {
  if (!animationStartTime) animationStartTime = timestamp;
  const elapsed = timestamp - animationStartTime;
  const progress = Math.min(elapsed / duration, 1);

  // Linear progress for consistent speed
  count = progress * targetCount;
  counter.textContent = Math.floor(count);
  progressBar.style.width = count + "%";

  if (progress < 1) {
    requestAnimationFrame(updateCounter);
  } else {
    // Step 2: When 100% complete, start the curved animation
    setTimeout(() => {
      startCurveAnimation();
    }, 300);
  }
}

function startCurveAnimation() {
  const timeline = gsap.timeline();

  // Logo moves up + fades
  timeline.to(logo, {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
  });

  // Counter, progress bar, and loading text fade out
  timeline.to(
    [counter, ".progress-container", ".loading-text"],
    {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    "<"
  );

  // Preloader wrapper curves up with background
  timeline.to(
    preloader,
    {
      y: "-100%",
      borderRadius: "0 0 50% 50% / 0 0 20% 20%",
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: () => {
        preloader.style.display = "none";
        // Enable scroll after preloader disappears
        document.body.classList.remove("loading");
      },
    },
    "-=0.4"
  );
}

// Start counter animation after logo reveal
setTimeout(() => {
  requestAnimationFrame(updateCounter);
}, 1000); // Start earlier for better flow

// hero slider

$("#hero_slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

$("#who_serve").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

$("#client_slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 2000,
  smartSpeed: 2000,
  autoplayHoverPause: false,
  autoplaySpeed: 2000,
  slideTransition: "linear",
  responsive: {
    0: { items: 3 },
    600: { items: 5 },
    1000: { items: 6 },
  },
});

$("#client_slider_two").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 2000,
  smartSpeed: 2000,
  autoplayHoverPause: false,
  autoplaySpeed: 2000,
  slideTransition: "linear",
  rtl: true,
  responsive: {
    0: { items: 3 },
    600: { items: 5 },
    1000: { items: 6 },
  },
});

$("#certificate_slider").owlCarousel({
  center: true,
  items: 3,
  loop: true,
  margin: -100,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: true,
  dots: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
      center: true,
      margin: 0,
    },
    480: {
      items: 2,
      center: true,
      margin: -10,
    },
    768: {
      items: 3,
      center: true,
      margin: -20,
    },
  },
});

let smoother;

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const isMobile = window.innerWidth < 768;

  // Only enable ScrollSmoother on desktop for better mobile performance
  if (!isMobile) {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      smoothTouch: 0.1,
      effects: true,
    });
  }
});


setTimeout(() => {
  ScrollTrigger.refresh();
  if (smoother) smoother.refresh();
}, 1200); // wait for preloader finish


gsap.registerPlugin();

const tl = gsap.timeline({
  defaults: { ease: "power2.inOut" },
});

/* Slow rise from bottom */
tl.to(".curve-svg", {
  bottom: "0%",
  duration: 2.2,
})

  /* Gentle curve bend */
  .to("#curve-path", {
    attr: {
      d: `
    M0,220 
    C360,160 720,120 1080,140 
    1440,160 1440,160 1440,160 
    L1440,0 L0,0 Z`,
    },
    duration: 1.8,
  })

  /* Curve flattens and exits */
  .to("#curve-path", {
    attr: {
      d: `
    M0,0 
    C360,0 720,0 1080,0 
    1440,0 1440,0 1440,0 
    L1440,0 L0,0 Z`,
    },
    duration: 1.4,
  })

  /* Remove preloader */
  .to("#preloader", {
    y: "-100%",
    duration: 1.2,
    onComplete: () => document.getElementById("preloader").remove(),
  });

//   about card rotating animation

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const radius = 230;
const radiusMobile = 180;
const cards = document.querySelectorAll(".gsap-circular-card");
const baseAngles = [-90, -18, 54, 126, 198];

const isMobileCircular = window.innerWidth < 900;

if (!isMobileCircular) {
  // DESKTOP – enable animation
  gsap.to({}, {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top center",
      end: "bottom top",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        const rotationAmount = progress * 360;

        cards.forEach((card, index) => {
          const currentAngle = baseAngles[index] + rotationAmount;
          const counterRotation = -currentAngle;

          gsap.set(card, {
            transform: `rotate(${currentAngle}deg) translate(${radius}px) rotate(${counterRotation}deg)`,
          });
        });
      },
    },
  });
} else {
  // MOBILE – completely disable animation, set static positions
  cards.forEach((card, index) => {
    gsap.set(card, {
      transform: `rotate(${baseAngles[index]}deg) translate(${radiusMobile}px) rotate(${-baseAngles[index]}deg)`,
      clearProps: "all" // Clear any animated properties
    });
  });
  
  // Kill any existing ScrollTriggers for these cards on mobile
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === ".about-section") {
      trigger.kill();
    }
  });
}


// Optional: Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
    if (smoother) smoother.resize();
  }, 250);
});

// aos animation - disable on mobile for better performance
if (window.innerWidth < 768) {
  AOS.init({
    disable: true
  });
} else {
  AOS.init({
    duration: 1000
  });
}


// text animation revealing - simplified for mobile

gsap.registerPlugin(ScrollTrigger);

// Function to apply text reveal animation
function initTextReveal(selector) {
  const elements = document.querySelectorAll(selector);
  const isMobileReveal = window.innerWidth < 768;

  elements.forEach((element) => {
    const text = element.textContent;
    element.innerHTML = "";

    // Wrap each word in two spans for the reveal effect
    text.split(" ").forEach((word) => {
      const wordWrapper = document.createElement("span");
      wordWrapper.className = "word";

      const wordInner = document.createElement("span");
      wordInner.className = "word-inner";
      wordInner.textContent = word;

      wordWrapper.appendChild(wordInner);
      element.appendChild(wordWrapper);
    });

    // Animate words on scroll with reset capability
    // Simpler animation on mobile for performance
    gsap.to(element.querySelectorAll(".word-inner"), {
      y: 0,
      opacity: 1,
      duration: isMobileReveal ? 0.8 : 1.2,
      ease: isMobileReveal ? "power2.out" : "power4.out",
      stagger: isMobileReveal ? 0.02 : 0.05,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 0%",
        toggleActions: "play reverse play reverse",
      },
    });
  });
}

// Initialize animation for all elements with 'text-reveal' class
initTextReveal(".text-reveal");

// bottom reveal text animation - Smooth fade + slide up with scrub
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const revealText = document.querySelector('.reveal-text');
    if (!revealText) return;
    
    const isMobileRevealText = window.innerWidth < 768;
    
    // Split text into words for animation
    const text = revealText.textContent;
    const words = text.split(' ');
    revealText.innerHTML = '';
    
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = '0.3em'; // Add gap between words
        wordSpan.className = 'reveal-word';
        revealText.appendChild(wordSpan);
    });
    
    // Set initial state - hidden
    gsap.set('.reveal-word', {
        opacity: 0,
        y: 50,
        force3D: true
    });
    
    // Animate on scroll with scrub for smooth bidirectional animation
    gsap.to('.reveal-word', {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: 'power3.out',
        stagger: {
            each: 0.02,
            from: 'start'
        },
        force3D: true,
        scrollTrigger: {
            trigger: '.text-reveal-sec',
            start: 'top 70%', // Start earlier
            end: 'bottom 40%', // End earlier - more compact animation window
            scrub: 2.5,
            markers: false
        }
    });
});



// project sticky - disable scrub on mobile for better performance

gsap.registerPlugin(ScrollTrigger);

const projectCards = document.querySelectorAll(".project-cards");
const isMobileProject = window.innerWidth < 768;

projectCards.forEach((card, index) => {
  const isLastCard = index === projectCards.length - 1;
  
  ScrollTrigger.create({
    trigger: card,
    start: "top top",
    end: isLastCard ? "bottom top" : "bottom top",
    pin: true,
    pinSpacing: false,
    scrub: isMobileProject ? false : true // Disable scrub on mobile
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const titleLimit = 8; // word limit for h1
  const paraLimit  = 25; // word limit for p

  // Trim titles
  document.querySelectorAll(".latest-news .card .content h1").forEach(h1 => {
    let words = h1.innerText.trim().split(/\s+/);
    if (words.length > titleLimit) {
      h1.innerText = words.slice(0, titleLimit).join(" ") + "...";
    }
  });

  // Trim paragraphs
  document.querySelectorAll(".latest-news .card .content p").forEach(p => {
    let words = p.innerText.trim().split(/\s+/);
    if (words.length > paraLimit) {
      p.innerText = words.slice(0, paraLimit).join(" ") + "...";
    }
  });
});