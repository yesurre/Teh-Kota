if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    document.body.classList.add("page-loaded");
});

const sliderTyping = document.querySelector(".slider-typing");
if (sliderTyping && sliderTyping.dataset.text) {
    const fullText = sliderTyping.dataset.text;
    let index = 0;
    sliderTyping.textContent = "";

    const typeNext = () => {
        if (index <= fullText.length) {
            sliderTyping.textContent = fullText.slice(0, index);
            index += 1;
            setTimeout(typeNext, 75);
        }
    };

    typeNext();
}

var slides = document.querySelectorAll(".slide");
var buttons = document.querySelectorAll(".slider-btn");
let currentSlide = 1;

//Manual images slider 
var manualNav = function(manual) {
    slides.forEach(function (slide) {
        slide.classList.remove("active");

    buttons.forEach((btn) => {
        btn.classList.remove("active");
    });
});

slides[manual].classList.add("active"); 
buttons[manual].classList.add("active");
}

buttons.forEach(function(btn, i) {
    console.log("test");
    btn.addEventListener("click", function() {
        manualNav(i);
        currentSlide = i;
    })
})

var repeat = function(activeClass) {
    let active = document.getElementsByClassName("active");

    let i = 1;
    var repeater = function() {
        setTimeout(function() {
            [...active].forEach(function(activeSlide) {
                activeSlide.classList.remove("active");
            });

            slides[i].classList.add("active");
            buttons[i].classList.add("active");
            i++;

            if (slides.length == i) {
                i = 0;
            }
            if(i >= slides.length) {
                return;
            }
            repeater();
        }, 5000);
    }
    repeater();
}
if (slides.length && buttons.length) {
    repeat();
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const parallaxWrap = document.querySelector(".image-slider");
const parallaxLayers = document.querySelectorAll(".slider-headline, .slide-text");
const parallaxImages = document.querySelectorAll(".slide img");

if (parallaxWrap && parallaxLayers.length) {
    const maxOffset = 24;

    const applyParallax = () => {
        const rect = parallaxWrap.getBoundingClientRect();
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.bottom < 0 || rect.top > viewHeight) {
            return;
        }
        const progress = (rect.top - viewHeight) / (rect.height + viewHeight);
        const offset = Math.max(-1, Math.min(1, progress)) * maxOffset;

        parallaxLayers.forEach((layer, index) => {
            const depth = index % 2 === 0 ? 0.6 : 0.35;
            layer.style.setProperty("--parallax-offset", `${offset * depth}px`);
            layer.classList.add("parallax-layer");
        });

        parallaxImages.forEach((image) => {
            image.style.setProperty("--parallax-offset", `${offset * 0.2}px`);
            image.classList.add("parallax-layer");
        });
    };

    applyParallax();
    window.addEventListener("scroll", applyParallax, { passive: true });
    window.addEventListener("resize", applyParallax);
}

const reviewCards = document.querySelectorAll(".review-card");
const reviewModal = document.querySelector(".review-modal");
const reviewModalImage = document.querySelector(".review-modal__image");
const reviewModalTitle = document.querySelector(".review-modal__title");
const reviewModalDesc = document.querySelector(".review-modal__desc");

if (reviewCards.length && reviewModal && reviewModalImage && reviewModalTitle && reviewModalDesc) {
    const closeModal = () => {
        reviewModal.classList.remove("is-open");
        reviewModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const openModal = (card) => {
        const image = card.querySelector("img");
        const title = card.querySelector("h3");
        const desc = card.querySelector(".review-quote");

        reviewModalImage.src = image ? image.src : "";
        reviewModalImage.alt = image ? image.alt : "";
        reviewModalTitle.textContent = title ? title.textContent : "";
        reviewModalDesc.textContent = desc ? desc.textContent : "";

        reviewModal.classList.add("is-open");
        reviewModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    reviewCards.forEach((card) => {
        card.addEventListener("click", () => openModal(card));
    });

    reviewModal.addEventListener("click", (event) => {
        if (event.target.matches("[data-review-close]")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && reviewModal.classList.contains("is-open")) {
            closeModal();
        }
    });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    const phoneElement = document.querySelector(".contact-phone");

    const getWhatsappNumber = () => {
        if (phoneElement && phoneElement.dataset.whatsapp) {
            return phoneElement.dataset.whatsapp.replace(/\D/g, "");
        }
        if (!phoneElement) {
            return "";
        }
        const digits = phoneElement.textContent.replace(/\D/g, "");
        if (!digits) {
            return "";
        }
        if (digits.startsWith("0")) {
            return `62${digits.slice(1)}`;
        }
        return digits;
    };

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const waNumber = getWhatsappNumber();
        if (!waNumber) {
            return;
        }
        const name = document.querySelector("#name")?.value.trim();
        const email = document.querySelector("#email")?.value.trim();
        const topic = document.querySelector("#topic")?.value.trim();
        const message = document.querySelector("#message")?.value.trim();

        const lines = [
            "Halo Teh Kota,",
            name ? `Nama: ${name}` : "",
            email ? `Email: ${email}` : "",
            topic ? `Topik: ${topic}` : "",
            message ? `Pesan: ${message}` : "",
        ].filter(Boolean);

        const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank", "noopener");
    });
}
