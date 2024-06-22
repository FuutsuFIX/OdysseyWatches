
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number");
    const speed = 60;

    const animateNumber = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const suffix = counter.getAttribute("data-suffix") || "";
            let count = +counter.innerText.replace(suffix, "");


            const increment = target / speed;

            if (count < target) {
                count += increment;
                counter.innerText = `${Math.ceil(count)}${suffix}`;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = `${target}${suffix}`;
            }
        };

        updateCount();
    };

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach((counter) => {
        observer.observe(counter);
    });
});