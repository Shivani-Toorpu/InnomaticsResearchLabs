document.addEventListener("DOMContentLoaded", () => {
    const categories = {
        fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🥭", "🍍", "🍑"],
        emojis: ["😊", "😂", "😍", "😎", "😜", "😡", "😭", "🤩"],
        animals: ["🐶", "🐱", "🐭", "🐰", "🐵", "🦄", "🐼", "🐸"],
        planets: ["🪐", "🌍", "🌕", "☀️", "⭐", "🌑", "🌠", "🌋"],
        flags: ["🇺🇸", "🇬🇧", "🇫🇷", "🇩🇪", "🇮🇳", "🇨🇦", "🇧🇷", "🇯🇵"]
    };

    let selectedCategory = [];
    let firstCard = null;
    let secondCard = null;
    let score = 0;
    let timer = 30;
    let gameStarted = false;
    let interval;

    const landingPage = document.getElementById("landing-page");
    const gameContainer = document.getElementById("game-container");
    const grid = document.getElementById("grid");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const restartBtn = document.getElementById("restart-btn");
    const goBackBtn = document.getElementById("go-back-btn");

    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = categories[button.dataset.category];
            startGame();
        });
    });

    function startGame() {
        landingPage.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        resetGame();
        createGrid();
        startTimer();
    }

    function resetGame() {
        score = 0;
        timer = 30;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timer;
        grid.innerHTML = "";
        gameStarted = false;
        firstCard = null;
        secondCard = null;
        clearInterval(interval);
    }

    function createGrid() {
        let cardArray = [...selectedCategory, ...selectedCategory];
        cardArray.sort(() => Math.random() - 0.5);

        cardArray.forEach(symbol => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.symbol = symbol;
            card.innerHTML = "?";
            card.addEventListener("click", handleCardClick);
            grid.appendChild(card);
        });
    }

    function handleCardClick(event) {
        if (!gameStarted) return;
        let card = event.target;

        if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

        card.innerHTML = card.dataset.symbol;
        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    }

    function checkMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            score += 10;
            firstCard = null;
            secondCard = null;
        } else {
            setTimeout(() => {
                firstCard.innerHTML = "?";
                secondCard.innerHTML = "?";
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        scoreDisplay.textContent = score;
    }

    function startTimer() {
        gameStarted = true;
        interval = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer <= 0) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        alert(`Game Over! Your final score: ${score}`);
        goBackToHome();
    }

    goBackBtn.addEventListener("click", goBackToHome);

    function goBackToHome() {
        landingPage.classList.remove("hidden");
        gameContainer.classList.add("hidden");
    }

    restartBtn.addEventListener("click", startGame);
});
