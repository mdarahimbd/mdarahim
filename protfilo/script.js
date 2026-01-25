   $(document).ready(function () {

    // --- AUTOMATIC AGE CALCULATOR (For 27 May 2007) ---
    const birthYear = 2007;
    const birthMonth = 5;  // May
    const birthDay = 27;

    const today = new Date();
    const dob = new Date(birthYear, birthMonth - 1, birthDay); // Month is 0-indexed in JS
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    // If today is before May 27, subtract 1 year
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    $("#dynamic-age").text(age);
    // --------------------------------------------------
    // --- WELCOME POPUP WITH TYPING ---
    setTimeout(function() {
        // 1. Show the popup
        $('#welcome-popup').addClass('show-popup');

        // 2. Start Typing Animation inside the popup
        new Typed(".popup-text", {
            strings: ["Hey there👋 thanks for visiting my portfolio! "],
            typeSpeed: 40,
            showCursor: false // No blinking cursor after typing
        });

    }, 500); 

    setTimeout(function() {
        // 3. Hide after 5 seconds
        $('#welcome-popup').removeClass('show-popup');
    }, 5500); 
        // --- EASY UPLOAD PROJECTS START ---
    const myProjects = [
        { img: "project1.jpg", title: "RAHIM LOGO", desc: "project 1" },
        { img: "project2.png", title: "Design work", desc: "project 2" },
        { img: "project3.jpg", title: "Design work", desc: "project 3" },
        { img: "project4.jpg", title: "Creative art", desc: "project 4" },
        { img: "project5.jpg", title: "AR Logo Design", desc: "project 5" },
        { img: "project6.jpg", title: "AR Logo Design", desc: "project 6" },
        { img: "project7.jpg", title: "AR Logo Design", desc: "project 7" },
        { img: "project8.jpg", title: "AR Logo Design", desc: "project 8" },
        { img: "project9.jpg", title: "R Logo Design", desc: "project 9" },
        { img: "project10.jpg", title: "AR Logo Design", desc: "project 10" },
        { img: "project11.jpg", title: "Rahim Logo", desc: "project 11" }
        
    ];

   let projectHTML = "";
    myProjects.forEach(proj => {
        projectHTML += `
        <div class="box tilt">
            <img src="assets/project/${proj.img}" alt="${proj.title}">
            <div class="content">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
                <!-- FIXED: Now links directly to the image file -->
                <a href="assets/project/${proj.img}" target="_blank" class="btn">View</a>
            </div>
        </div>
        `;
    });
    $("#project-box-container").html(projectHTML);
    // --- EASY UPLOAD PROJECTS END ---


    // --- THEME SWITCHER LOGIC (3 Modes) ---
    // Click on toggle slider switches Default <-> Dark
    // Click on text switches to Light
    const toggle = document.getElementById('theme-toggle');
    const modeText = document.querySelector('.mode-text');
    const body = document.body;

    // Load saved theme
    if(localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggle.checked = true;
        modeText.innerText = "Dark Mode";
    } else if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        modeText.innerText = "Light Mode";
    }

    // Toggle Slider (Default vs Dark)
    toggle.addEventListener('change', () => {
        if(toggle.checked) {
            body.classList.remove('default-mode', 'light-mode');
            body.classList.add('dark-mode');
            modeText.innerText = "Dark Mode";
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode', 'light-mode');
            body.classList.add('default-mode');
            modeText.innerText = "Default";
            localStorage.setItem('theme', 'default');
        }
    });

    // Click Text to cycle Light Mode
    modeText.addEventListener('click', () => {
        body.classList.remove('default-mode', 'dark-mode');
        body.classList.add('light-mode');
        modeText.innerText = "Light Mode";
        toggle.checked = false; 
        localStorage.setItem('theme', 'light');
    });
    // --- END THEME LOGIC ---


    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- typed js effect starts -->
    var typed = new Typed(".typing-text", {
        strings: ["logo designer", "video editor", "Photo editor",],
        loop: true,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 500,
    });
     var typed = new Typed(".typing-text-2", {
        strings: ["Assalamualaikum, I'm MD. Abdur Rahim ",],
        typeSpeed: 60,
        loop: true,
    });
    // <!-- typed js effect ends -->

    // <!-- title js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL ANIMATIONS */
    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });

    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.projects .box', { interval: 200 }); /* Animates project boxes */

});

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}
