const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// when someone clicks the hamburger button, the menu will appear
navToggle.addEventListener("click", () => {
	const visibility = nav.getAttribute("data-visible");

	// if the menu is closed, open it
	if (visibility === "false") {
		nav.setAttribute("data-visible", true);
		navToggle.setAttribute("aria-expanded", true);
	} else {
		nav.setAttribute("data-visible", false);
		navToggle.setAttribute("aria-expanded", false);
	}

	// console.log(navToggle.getAttribute("aria-expanded"));
});
