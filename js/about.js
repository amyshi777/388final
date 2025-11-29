(function () {
    let items = document.querySelectorAll(".timeline-item");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }
    let observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.25,
        }
    );
    items.forEach((item) => {
        observer.observe(item);
    });
})();