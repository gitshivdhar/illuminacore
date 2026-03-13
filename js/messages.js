/* =========================================================================
   CONTACT FORM HANDLER (EMAILJS)
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("#contactForm");
    if (!forms.length) return;

    if (!window.emailjs) {
        console.error("EmailJS is not loaded.");
        return;
    }

    emailjs.init("8y2AjvO-rI5GkXZxX");

    forms.forEach((form) => {
        const submitButton = form.querySelector('button[type="submit"]');

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;

            const name = (form.querySelector("#name")?.value || "").trim();
            const email = (form.querySelector("#email")?.value || "").trim();
            const organization = (form.querySelector("#org")?.value || "").trim();
            const message = (form.querySelector("#message")?.value || "").trim();

            const payload = { name, email, organization, message };

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            try {
                await emailjs.send("service_5krhj38", "template_rjgihml", payload);
                alert(`Thank you, ${name}. Your message has been sent successfully.`);
                form.reset();
            } catch (error) {
                console.error(error);
                alert("Failed to send message. Please try again.");
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                }
            }
        });
    });
});
