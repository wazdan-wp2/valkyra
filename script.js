const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuWrapper = document.getElementById('menuWrapper');

const closeMenu = () => {
    menuWrapper.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', false);
};

hamburgerBtn.addEventListener('click', () => {
    const isOpen = menuWrapper.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

menuWrapper.querySelectorAll('a:not(#contactBtn)').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// contact btn
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    const email = contactBtn.dataset.email;
    const defaultTextEl = contactBtn.querySelector('[data-state="default"]');
    const emailTextEl = contactBtn.querySelector('[data-state="email"]');
    const tooltip = document.getElementById('copiedTooltip');
    let isHovered = false;
    let tooltipTimeout = null;

    const showEmail = () => {
        defaultTextEl.classList.remove('is-visible');
        emailTextEl.classList.add('is-visible');
    };
    const showDefault = () => {
        emailTextEl.classList.remove('is-visible');
        defaultTextEl.classList.add('is-visible');
    };

    contactBtn.addEventListener('mouseenter', () => {
        isHovered = true;
        showEmail();
    });
    contactBtn.addEventListener('mouseleave', () => {
        isHovered = false;
        showDefault();
    });

    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const copyToClipboard = () => {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(email);
            }
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            return Promise.resolve();
        };

        copyToClipboard().then(() => {
            tooltip.classList.add('is-visible');

            clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(() => {
                tooltip.classList.remove('is-visible');
            }, 1000);

            const isMobileMenuOpen = menuWrapper.classList.contains('active');
            if (isMobileMenuOpen) {
                setTimeout(closeMenu, 1500);
            }
        });
    });
}