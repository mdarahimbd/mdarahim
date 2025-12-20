$(document).ready(function () {

    // --- EASY UPLOAD PROJECTS START ---
    // Just change the strings here to add your files.
    // Ensure images are in assets/images/projects/
    const myProjects = [
        { img: "project1.jpg", title: "Project1", desc: "RAHIM LOGO" },
        { img: "project2.png", title: "Project 2", desc: "Design work" },
        { img: "project3.jpg", title: "Project 3", desc: "Design Work" },
        { img: "project4.jpg", title: "Project 4", desc: "Creative Art" },
        { img: "project5.jpg", title: "Project 5", desc: "AR Logo Design" },
        { img: "project6.jpg", title: "Project 6", desc: "AR Logo Design" },
        { img: "project7.jpg", title: "Project 7", desc: "AR Logo Design" },
        { img: "project8.jpg", title: "Project 8", desc: "AR Logo Design" },
        { img: "project9.jpg", title: "Project 9", desc: "R Logo Design" },
        { img: "project10.jpg", title: "Project 10", desc: "AR Logo Design" }
    ];

    let projectHTML = "";
    myProjects.forEach(proj => {
        projectHTML += `
        <div class="box tilt">
            <img src="project/${proj.img}" alt="${proj.title}">
            <div class="content">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
                <a href="#" class="btn">View</a>
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
        strings: ["logo designer", "video editor", "web designer", "Photo editor", "HTML programmer", " CSS Programmer","JAVA Script Programmer","C Programmer"],
        loop: true,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 500,
    });
    // <!-- typed js effect ends -->

    // <!-- tilt js effect starts -->
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