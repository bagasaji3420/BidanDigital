document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector(".article-content");
    const toc = document.getElementById("toc");
    const tocCard = document.getElementById("toc-card");

    if (!content || !toc) return;

    const headings = content.querySelectorAll("h2, h3");

    if (headings.length === 0) {
        tocCard.style.display = "none";
        return;
    }

    let tocHtml = "";
    headings.forEach((h, i) => {
        const id = "heading-" + i;
        h.setAttribute("id", id);
        const cls = h.tagName === "H3" ? "toc-h3" : "";
        tocHtml += `<a href="#${id}" class="${cls}">${h.textContent}</a>`;
    });
    toc.innerHTML = tocHtml;

    // Active link on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    toc.querySelectorAll("a").forEach((a) =>
                        a.classList.remove("active"),
                    );
                    const active = toc.querySelector(
                        `a[href="#${entry.target.id}"]`,
                    );
                    if (active) active.classList.add("active");
                }
            });
        },
        {
            rootMargin: "-20% 0px -70% 0px",
        },
    );

    headings.forEach((h) => observer.observe(h));
});
