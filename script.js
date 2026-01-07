document.addEventListener("DOMContentLoaded", function () {
    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();

    if (hour < 5) greeting.textContent = "You are up late. One short video.";
    else if (hour < 12) greeting.textContent = "Good morning. Start with one video.";
    else if (hour < 18) greeting.textContent = "Good afternoon. Small progress is fine.";
    else greeting.textContent = "Good evening. One video before scrolling.";

    const continueBtn = document.getElementById("continueBtn");
    const currentCard = document.getElementById("currentCard");

    continueBtn.addEventListener("click", function () {
        currentCard.scrollIntoView({ behavior: "smooth", block: "center" });
        currentCard.classList.add("pulse");
        setTimeout(() => currentCard.classList.remove("pulse"), 500);
    });

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchText = document.getElementById("searchText");

    function runSearch() {
        const value = searchInput.value.trim();
        searchText.textContent = value
            ? `Search is not real yet. You typed: "${value}"`
            : 'Try typing "Java" or "OS".';
    }

    searchBtn.addEventListener("click", runSearch);
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") runSearch();
    });
});
