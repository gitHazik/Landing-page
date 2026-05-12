const scriptURL = 'https://script.google.com/macros/s/AKfycbxSOlVLJq04sHFcOiRhkGopIZny6xPB7wENvyuaDg170nJMKZdKyOla6kxWnqOzjOd_Ng/exec';
const form = document.forms['submit-to-google-sheet'];
const waitlistSection = document.getElementById('waitlist'); 
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('.btn-submit');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Joining...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            
            submitBtn.innerHTML = "Welcome to the Team!";
            msg.innerHTML = "Success! Redirecting you back...";
            msg.style.color = "green";

            
            setTimeout(() => {
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
                

                waitlistSection.style.display = 'none';
                
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
