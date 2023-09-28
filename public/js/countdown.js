document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("2023-10-11").getTime(); // Set your target date here

    updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").textContent = `${days} Päivää ${hours}h ${minutes}m ${seconds}s`;

        if (distance <= 0) {
            clearInterval(interval);
            document.getElementById("countdown").textContent = "Expired!";
        }
    }

    const interval = setInterval(updateCountdown, 1000);
});
