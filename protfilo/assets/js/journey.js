// CONFIGURATION: 10 Images
const slides = [
    { title: "MATTERHORN", desc: "The jewel of the Swiss Alps.", image: "assets/swiss/swiss1.jpg" },
    { title: "LUCERNE", desc: "Medieval architecture.", image: "assets/swiss/swiss2.jpg" },
    { title: "INTERLAKEN", desc: "Adventure capital.", image: "assets/swiss/swiss3.jpg" },
    { title: "GRINDELWALD", desc: "Base of the Eiger.", image: "assets/swiss/swiss4.jpg" },
    { title: "LAUTERBRUNNEN", desc: "Valley of waterfalls.", image: "assets/swiss/swiss5.jpg" },
    { title: "LAKE GENEVA", desc: "Alpine grandeur.", image: "assets/swiss/swiss6.jpg" },
    { title: "BERN", desc: "Capital city.", image: "assets/swiss/swiss7.jpg" },
    { title: "ST. MORITZ", desc: "Luxury resort.", image: "assets/swiss/swiss8.jpg" },
    { title: "RHINE FALLS", desc: "Powerful waters.", image: "assets/swiss/swiss9.jpg" },
    { title: "LUGANO", desc: "Italian flair.", image: "assets/swiss/swiss10.jpg" }
];

// Elements
const bgImage = document.getElementById('bg-image');
const title = document.getElementById('slide-title');
const desc = document.getElementById('slide-desc');
const previewList = document.getElementById('preview-list');
const progressBar = document.getElementById('progress-bar');
const counterNum = document.getElementById('current-slide-num');

let currentIndex = 0;
let autoPlayTimer;

// INITIALIZE
updateContent(0);
startAutoPlay();

// BUTTON EVENTS
document.getElementById('next-btn').addEventListener('click', () => {
    resetAutoPlay();
    let nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    resetAutoPlay();
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
});

// ANIMATION LOGIC
function changeSlide(index) {
    if (index === currentIndex) return;

    // GSAP Timeline for Cinematic Transition
    const tl = gsap.timeline();

    // 1. Fade Text OUT
    tl.to([title, desc], { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" })
      
      // 2. SWAP IMAGE & UPDATE CONTENT
      .call(() => {
          currentIndex = index;
          updateContent(index);
          
          // Reset background zoom so we can animate it
          gsap.set(bgImage, { scale: 1.2 }); 
      })

      // 3. Zoom Background IN & Fade Text IN
      .to(bgImage, { scale: 1, duration: 1.5, ease: "power2.out" }) // Cinematic Zoom effect
      .to([title, desc], { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=1.0"); // Start text anim before zoom finishes
}

// UPDATE CONTENT & PREVIEW CARDS
function updateContent(index) {
    // Update Background
    bgImage.style.backgroundImage = `url('${slides[index].image}')`;
    
    // Update Text
    title.innerText = slides[index].title;
    desc.innerText = slides[index].desc;

    // Update Number (01, 02, etc.)
    let num = index + 1;
    counterNum.innerText = num < 10 ? `0${num}` : num;

    // Update Progress Bar
    // We animate the width so it looks smooth
    gsap.to(progressBar, { width: `${(num / slides.length) * 100}%`, duration: 0.5 });

    // UPDATE PREVIEW CARDS (The Next 3)
    previewList.innerHTML = "";
    
    for (let i = 1; i <= 3; i++) {
        // Wrap around logic
        let nextSlideIndex = (index + i) % slides.length;
        let slideData = slides[nextSlideIndex];
        
        let card = document.createElement('div');
        card.classList.add('mini-card');
        
        // Allow clicking preview to jump there
        card.onclick = () => {
            resetAutoPlay();
            changeSlide(nextSlideIndex);
        };
        
        card.innerHTML = `
            <img src="${slideData.image}" loading="lazy">
            <div class="card-info">
                <h4>${slideData.title}</h4>
            </div>
        `;
        
        // Small entry animation for cards
        gsap.fromTo(card, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, delay: i * 0.1 });
        
        previewList.appendChild(card);
    }
}

// AUTO PLAY LOGIC
function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        changeSlide(nextIndex);
    }, 3000); // Changes every 3 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay(); // Restart timer
}