window.addEventListener("load", function () {
    let introHeadings = document.querySelectorAll(".intro");
    introHeadings.forEach((heading) => {
        let text = heading.textContent;
        heading.textContent = "";
        [...text].forEach((char) => {
            if (char === " ") {
                heading.appendChild(document.createTextNode(" "));
            } else {
                let span = document.createElement("span");
                span.textContent = char;
                span.addEventListener("mouseenter", function () {
                    span.classList.add("hovered-letter");
                });
                span.addEventListener("mouseleave", function () {
                    span.classList.remove("hovered-letter");
                });
                heading.appendChild(span);
            }
        });
    });
});

(function () {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let prevBtn = document.querySelector(".prev-slide");
    let nextBtn = document.querySelector(".next-slide");
    let ghostPrev = document.querySelector(".ghost-prev");
    let ghostNext = document.querySelector(".ghost-next");
    let currentIndex = 0;
    function updateGhosts(index) {
        if (!ghostPrev || !ghostNext || slides.length === 0) return;
        let prevIndex = (index - 1 + slides.length) % slides.length;
        let nextIndex = (index + 1) % slides.length;
        let prevImg = slides[prevIndex].querySelector("img");
        let nextImg = slides[nextIndex].querySelector("img");
        ghostPrev.style.backgroundImage = `url('${prevImg.src}')`;
        ghostNext.style.backgroundImage = `url('${nextImg.src}')`;
    }
    function showSlide(index) {
        if (slides.length === 0) return;

        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentIndex = index;
        updateGhosts(currentIndex);
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            showSlide(currentIndex - 1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            showSlide(currentIndex + 1);
        });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });
    // start on first slide
    showSlide(0);
})();