/* =========================================================================
   CONTACT FORM HANDLER (EMAILJS)
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("#contactForm");
    if (!forms.length) return;

    let emailJsReady;
    const loadEmailJs = () => {
        if (window.emailjs) return Promise.resolve(window.emailjs);
        if (emailJsReady) return emailJsReady;

        emailJsReady = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
            script.async = true;
            script.onload = () => {
                if (!window.emailjs) {
                    reject(new Error("EmailJS failed to load."));
                    return;
                }
                resolve(window.emailjs);
            };
            script.onerror = () => reject(new Error("Failed to load EmailJS script."));
            document.head.appendChild(script);
        });

        return emailJsReady;
    };

    const initEmailJs = async () => {
        const emailjsLib = await loadEmailJs();
        if (!initEmailJs.initialized) {
            emailjsLib.init("8y2AjvO-rI5GkXZxX");
            initEmailJs.initialized = true;
        }
        return emailjsLib;
    };

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
                const emailjsLib = await initEmailJs();
                await emailjsLib.send("service_5krhj38", "template_rjgihml", payload);
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
