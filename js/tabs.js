// Implement accessibility for tabs
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

// Keyboard event (e)
tabList.addEventListener('keydown', changeTabFocus);

// Activating the tab to show content
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    // When keydown change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1);

        // If the right key is pushed, move to the next tab on the right
        if (e.keyCode === keydownRight) {
            tabFocus++;
            // If the tabFocus is greater than the number of tabs, move to the first tab
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        // If the left key is pushed, move to the next tab on the left
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            // If the tabFocus is less than 0, move to the last tab
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image');

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', false);
        tab.classList.add('text-white'); // Set inactive tab text color
    });

    targetTab.classList.add('active');
    targetTab.setAttribute('aria-selected', true);
    targetTab.classList.remove('text-white'); // Remove inactive tab text color

    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    // Hide the current panel
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}
