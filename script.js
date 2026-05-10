const scriptURL = 'YOUR_SCRIPT_URL_HERE';
const form = document.forms['submit-to-google-sheet'];
const waitlistSection = document.getElementById('waitlist'); // The section to hide
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('.btn-submit');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Joining...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // 1. Show success message
            submitBtn.innerHTML = "Welcome to the Team!";
            msg.innerHTML = "Success! Redirecting you back...";
            msg.style.color = "green";

            // 2. Wait 2 seconds so they see the success message, then hide the form
            setTimeout(() => {
                // Option A: Smooth scroll them back to the top (Hero section)
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Option B: Hide the waitlist section entirely so they can't sign up twice
                waitlistSection.style.display = 'none';
                
                // Optional: Update Hero button text to show they are registered
                document.querySelector('.btn-primary').innerHTML = "You're on the list! ✓";
            }, 2000);
        })
        .catch(error => {
            msg.innerHTML = "Something went wrong. Please try again.";
            msg.style.color = "var(--red)";
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Submit Registration →";
        });
});
