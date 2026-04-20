const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

const form = document.querySelector("form");
const toast = document.getElementById("toast");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json().catch(() => null);

        if (response.ok) {
            toast.classList.remove("translate-x-[150%]", "opacity-0");
            toast.classList.add("translate-x-0", "opacity-100");

            setTimeout(() => {
                toast.classList.remove("translate-x-0", "opacity-100");
                toast.classList.add("translate-x-[150%]", "opacity-0");
            }, 3000);

            form.reset();
        } else {
            console.log("Formspree error:", data);
            alert(data?.errors?.[0]?.message || "Submission failed");
        }

    } catch (error) {
        console.error("Network error:", error);
        alert("Network error 😅");
    }
});