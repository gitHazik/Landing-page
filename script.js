const scriptURL =
    'https://script.google.com/macros/s/AKfycbwj1xpuZRZLj9lPTkdzbHnCMZYo5Lq-HrzCwQn13USkUZtfiKbLPMOMYBgJr3ak1mujOg/exec'

const form =
    document.forms['submit-to-google-sheet'];

const overlay =
    document.getElementById('waitlist-overlay');

const skipBtn =
    document.getElementById('skip-btn');

const msg =
    document.getElementById('msg');

function hideOverlay() {
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.1)';

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const btn =
        document.getElementById('submit-btn');

    btn.disabled = true;
    btn.innerHTML = 'Registering...';

    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(() => {
            msg.innerHTML =
                'Welcome! Opening site...';

            msg.style.color = 'green';

            setTimeout(hideOverlay, 1500);
        })
        .catch(() => {
            msg.innerHTML =
                'Error. Please try again.';

            btn.disabled = false;

            btn.innerHTML =
                'Join Waitlist →';
        });
});

skipBtn.addEventListener(
    'click',
    hideOverlay
);

const reveals =
    document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    reveals.forEach(reveal => {
        const top =
            reveal.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            reveal.classList.add('visible');
        }
    });
});
