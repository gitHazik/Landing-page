document.addEventListener('DOMContentLoaded', () => {

    // Scroll Reveal Intersection Observer

    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

            }

        });

    }, { threshold: 0.1 });



    revealEls.forEach(el => observer.observe(el));



    // Smooth Scroll for Nav and Buttons

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {

                target.scrollIntoView({

                    behavior: 'smooth',

                    block: 'start'

                });

            }

        });

    });

});

const scriptURL = 'YOUR_SCRIPT_URL_HERE'
const form = document.forms['google-sheet']
const btn = document.getElementById('submit-btn')
const msg = document.getElementById('form-message')

form.addEventListener('submit', e => {
    e.preventDefault()
    btn.disabled = true
    btn.innerHTML = "Sending..."
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Success! You're on the list."
            msg.style.display = "block"
            msg.style.color = "green"
            form.reset()
            btn.disabled = false
            btn.innerHTML = "Join the Waitlist →"
        })
        .catch(error => {
            msg.innerHTML = "Error! Please try again."
            msg.style.display = "block"
            msg.style.color = "red"
            btn.disabled = false
        })
})
