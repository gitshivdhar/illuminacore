// Form Messeging for whatsapp

// document.getElementById("contactForm").addEventListener("submit", function(e){
//     e.preventDefault();

//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let org = document.getElementById("org").value;
//     let message = document.getElementById("message").value;

//     let phone = "7439111930"; // replace with your WhatsApp number

//     let text = `New Contact Form Message:%0A
// Name: ${name}%0A
// Email: ${email}%0A
// Organization: ${org}%0A
// Message: ${message}`;

//     let url = `https://wa.me/${phone}?text=${text}`;

//     window.open(url, "_blank");
// });




//email sending js
(function () {
    emailjs.init("8y2AjvO-rI5GkXZxX");
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_5krhj38", "template_rjgihml", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        organization: document.getElementById("org").value,
        message: document.getElementById("message").value
    })
        .then(function (response) {
            let name = document.getElementById("name").value;
            alert("Thank you, " + name + ". Your message has been sent successfully.");
            document.getElementById("contactForm").reset();
            // refresh page after 2 seconds
            setTimeout(function () {
                window.location.href = "index.html";
            }, 500);
        }, function (error) {
            alert("Failed to send message. Please try again.");
        });
});
