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
  autoplayTimeout: 2000, // Duration between transitions
  smartSpeed: 2000, // Duration of the transition itself
  autoplayHoverPause: false,
  autoplaySpeed: 2000, // Ensures the slide moves at a constant rate
  slideTransition: "linear", // Key for smooth constant movement
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
  autoplayTimeout: 2000, // Duration between transitions
  smartSpeed: 2000, // Duration of the transition itself
  autoplayHoverPause: false,
  autoplaySpeed: 2000, // Ensures the slide moves at a constant rate
  slideTransition: "linear", // Key for smooth constant movement
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
  margin: -100, // Reduced from -50
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

  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: isMobile ? 0.5 : 1,     // mobile smoother
    smoothTouch: isMobile ? 0.05 : 0.1, // lighter touch scroll on mobile
    effects: true,
  });
});


window.addEventListener("load", () => {
  ScrollTrigger.refresh(true);
  smoother.refresh();
});

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

// Configuration
const radius = 230; // Radius of the circle
const radiusMobile = 180; // Radius for mobile

// Detect screen size
const isMobile = window.innerWidth < 992;
const currentRadius = isMobile ? radiusMobile : radius;

// Get all cards
const cards = document.querySelectorAll(".gsap-circular-card");

// Base angles for 5 cards (72 degrees apart, starting at -90 degrees for top position)
const baseAngles = [-90, -18, 54, 126, 198];

// Create ScrollTrigger animation
gsap.to(
  {},
  {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top center",
      end: "bottom top",
      scrub: 2, // Smooth scrubbing
      // markers: true, // Uncomment to see markers
      onUpdate: (self) => {
        const progress = self.progress;
        // Rotate 360 degrees clockwise as you scroll
        const rotationAmount = progress * 360;

        cards.forEach((card, index) => {
          // Calculate new position angle
          const currentAngle = baseAngles[index] + rotationAmount;

          // Keep cards upright by counter-rotating
          const counterRotation = -currentAngle;

          // Apply transformation
          gsap.set(card, {
            transform: `rotate(${currentAngle}deg) translate(${currentRadius}px) rotate(${counterRotation}deg)`,
            ease: "none",
          });
        });
      },
    },
  }
);

// Optional: Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
    if (lenis) lenis.resize();
  }, 250);
});

// aos animation
if (window.innerWidth < 768) {
  AOS.init({
    disable: true
  });
} else {
  AOS.init({
    duration: 1000
  });
}


// text animation revealing

gsap.registerPlugin(ScrollTrigger);

// Function to apply text reveal animation
function initTextReveal(selector) {
  const elements = document.querySelectorAll(selector);

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
    gsap.to(element.querySelectorAll(".word-inner"), {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.05,
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




// bottom reveal text animation
gsap.registerPlugin(ScrollTrigger);

        // Function to split text into lines automatically based on natural wrapping
        function splitIntoLines(element) {
            const text = element.textContent;
            const words = text.split(' ');
            element.innerHTML = '';
            
            let tempLine = document.createElement('div');
            tempLine.style.display = 'inline';
            element.appendChild(tempLine);
            
            let lines = [];
            let currentLine = [];
            let previousTop = null;
            
            words.forEach((word, index) => {
                const testSpan = document.createElement('span');
                testSpan.textContent = word + ' ';
                testSpan.style.display = 'inline';
                tempLine.appendChild(testSpan);
                
                const rect = testSpan.getBoundingClientRect();
                const currentTop = rect.top;
                
                if (previousTop !== null && currentTop !== previousTop) {
                    lines.push(currentLine.join(' '));
                    currentLine = [word];
                } else {
                    currentLine.push(word);
                }
                
                previousTop = currentTop;
            });
            
            if (currentLine.length > 0) {
                lines.push(currentLine.join(' '));
            }
            
            // Clear and rebuild with wrapped structure
            element.innerHTML = '';
            lines.forEach(lineText => {
                const lineWrapper = document.createElement('div');
                lineWrapper.className = 'reveal-line';
                
                const lineInner = document.createElement('div');
                lineInner.className = 'reveal-line-inner';
                lineInner.textContent = lineText;
                
                lineWrapper.appendChild(lineInner);
                element.appendChild(lineWrapper);
            });
        }

        // Wait for fonts and layout to be ready
        document.fonts.ready.then(() => {
            const revealText = document.querySelector('.reveal-text');
            splitIntoLines(revealText);
            
            // Animate all lines simultaneously from bottom to top
            gsap.to(".reveal-line-inner", {
                clipPath: "inset(0% 0 0 0)",
                ease: "none",
                scrollTrigger: {
                    trigger: ".text-reveal-sec",
                    start: "top 50%",
                    end: "center center",
                    scrub: 2,
                    toggleActions: "play reverse play reverse",
                    markers: false
                }
            });
            
            // Re-split on window resize to maintain responsiveness
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    splitIntoLines(revealText);
                    ScrollTrigger.refresh();
                }, 250);
            });
        });



// project sticky 

gsap.registerPlugin(ScrollTrigger);

const projectCards = document.querySelectorAll(".project-cards");

projectCards.forEach((card, index) => {
  const isLastCard = index === projectCards.length - 1;
  
  ScrollTrigger.create({
    trigger: card,
    start: "top top",
    end: isLastCard ? "bottom top" : "bottom top", // Reduced scroll distance
    pin: true,
    pinSpacing: false,
    scrub: true
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
