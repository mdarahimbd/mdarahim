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

const bgImage = document.getElementById('bg-image');
const title = document.getElementById('slide-title');
const desc = document.getElementById('slide-desc');
const previewList = document.getElementById('preview-list');
const progressBar = document.getElementById('progress-bar');
const counterNum = document.getElementById('current-slide-num');

let currentIndex = 0;
let autoPlayTimer;

// Init
updateContent(0);
startAutoPlay();

// Events
document.getElementById('next-btn').addEventListener('click', () => {
    resetAutoPlay();
    changeSlide((currentIndex + 1) % slides.length);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    resetAutoPlay();
    changeSlide((currentIndex - 1 + slides.length) % slides.length);
});

function changeSlide(index) {
    if (index === currentIndex) return;

    const tl = gsap.timeline();
    
    // Animate text Out
    tl.to([title, desc], { y: -30, opacity: 0, duration: 0.3 })
      .call(() => {
          currentIndex = index;
          updateContent(index);
          gsap.set(bgImage, { scale: 1.15 }); // Reset zoom
      })
      // Animate In
      .to(bgImage, { scale: 1, duration: 1.5 })
      .to([title, desc], { y: 0, opacity: 1, duration: 0.5 }, "-=1.0");
}

function updateContent(index) {
    bgImage.style.backgroundImage = `url('${slides[index].image}')`;
    title.innerText = slides[index].title;
    desc.innerText = slides[index].desc;
    
    // Update Number
    let num = index + 1;
    counterNum.innerText = num < 10 ? `0${num}` : num;
    
    // Update Progress
    gsap.to(progressBar, { width: `${(num / slides.length) * 100}%`, duration: 0.5 });

    // Update Cards (Only visible on PC via CSS, but logic remains)
    previewList.innerHTML = "";
    if(window.innerWidth > 768) { // Performance: Only render cards if screen is big
        for (let i = 1; i <= 3; i++) {
            let nextIndex = (index + i) % slides.length;
            let card = document.createElement('div');
            card.classList.add('mini-card');
            card.onclick = () => { resetAutoPlay(); changeSlide(nextIndex); };
            card.innerHTML = `<img src="${slides[nextIndex].image}"><div class="card-info"><h4>${slides[nextIndex].title}</h4></div>`;
            gsap.fromTo(card, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, delay: i * 0.1 });
            previewList.appendChild(card);
        }
    }
}

function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
        changeSlide((currentIndex + 1) % slides.length);
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

// Re-render cards if resizing window from Mobile to Desktop
window.addEventListener('resize', () => updateContent(currentIndex));
