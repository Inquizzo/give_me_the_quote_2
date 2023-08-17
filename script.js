document.addEventListener("DOMContentLoaded", function () {
    let currentCategory = ""; // Определение currentCategory здесь
    
    const womenButton = document.getElementById("women-button");
    const menButton = document.getElementById("men-button");
    const teenButton = document.getElementById("teen-button");

    const quoteText = document.getElementById("quote-text");
    const nextQuoteButton = document.getElementById("next-quote");
    const returnHomeButton = document.getElementById("return-home");
    
    async function loadQuotes(category) {
        try {
            const response = await fetch(`quotes/${category}-quotes.txt`);
            const data = await response.text();
            const quotes = data.split('\n').filter(quote => quote.trim() !== '');
            return quotes;
        } catch (error) {
            console.error("Ошибка загрузки цитат:", error);
            return [];
        }
    }
    
    async function showQuotes(category) {
        const quotes = await loadQuotes(category);
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteText.textContent = quotes[randomIndex];
            currentCategory = category; // Обновление текущей категории
        } else {
            quoteText.textContent = "Нет доступных цитат";
        }
    }

    womenButton.addEventListener("click", () => showQuotes("women"));
    menButton.addEventListener("click", () => showQuotes("men"));
    teenButton.addEventListener("click", () => showQuotes("teen"));

    nextQuoteButton.addEventListener("click", () => showQuotes(currentCategory));
    returnHomeButton.addEventListener("click", () => {
        quoteText.textContent = "";
        document.body.style.backgroundImage = "none";
        currentCategory = "";
        showHomePage();
    });

    function showHomePage() {
        document.querySelector(".app").style.display = "flex";
        document.querySelector(".quote-page").style.display = "none";
    }

    function showQuotePage() {
        document.querySelector(".app").style.display = "none";
        document.querySelector(".quote-page").style.display = "flex";
    }
});
