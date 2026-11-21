const sampleArticles = [
    {
        title: "Safaricom Launches New M-Pesa Feature",
        source: "Business Daily",
        date: "2026-05-03",
        url: "#",
        category: "technology"
    },
    {
        title: "Kenya's Tech Hub Growth Surges in 2026",
        source: "TechCrunch",
        date: "2026-05-02",
        url: "#",
        category: "technology"
    },
    {
        title: "Nairobi Startup Raises $20M",
        source: "TechCabal",
        date: "2026-05-01",
        url: "#",
        category: "technology"
    },
    {
        title: "Kenyan Banks Report Higher Profits",
        source: "The Standard",
        date: "2026-04-29",
        url: "#",
        category: "business"
    },
    {
        title: "Stock Market Gains Continue",
        source: "Business Daily",
        date: "2026-04-28",
        url: "#",
        category: "business"
    },
    {
        title: "Gor Mahia Wins League Match",
        source: "Nation",
        date: "2026-04-27",
        url: "#",
        category: "sports"
    },
    {
        title: "Kenya Prepares for Regional Tournament",
        source: "ESPN",
        date: "2026-04-26",
        url: "#",
        category: "sports"
    },
    {
        title: "New Hospital Opens in Mombasa",
        source: "Citizen",
        date: "2026-04-25",
        url: "#",
        category: "health"
    },
    {
        title: "Health Ministry Launches Vaccine Drive",
        source: "Nation",
        date: "2026-04-24",
        url: "#",
        category: "health"
    },
    {
        title: "Nutrition Awareness Campaign Expanded",
        source: "WHO",
        date: "2026-04-23",
        url: "#",
        category: "health"
    }
];

const newsContainer =
    document.getElementById("newsContainer");

const loading =
    document.getElementById("loading");

window.addEventListener("load", () => {
    displayNews(sampleArticles);
});

function filterNews(category) {
    loading.textContent = "Loading...";

    setTimeout(() => {
        if (category === "all") {
            displayNews(sampleArticles);
        } else {
            const filtered =
                sampleArticles.filter(
                    article => article.category === category
                );

            displayNews(filtered);
        }

        loading.textContent = "";
    }, 500);
}

function displayNews(articles) {
    newsContainer.innerHTML = "";

    articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("news-card");

        card.innerHTML = `
      <h3>${article.title}</h3>
      <p><strong>${article.source}</strong></p>
      <p>${new Date(article.date).toDateString()}</p>
      <a href="${article.url}" target="_blank">
        Read More
      </a>
    `;

        newsContainer.appendChild(card);
    });
}