function initialSearch() {
    var defaultSearchQuery = "latest news";
    search(defaultSearchQuery);
}

function search(searchQuery) {
    fetch('https://newsapi.org/v2/everything?q=' + searchQuery + '&apiKey=1bf1863ca26d4edd82e21157bfd1fe25')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('API request failed with status: ' + response.status);
            }
        })
        .then(data => {
            let articles = data.articles;
            let articlesContainer = document.getElementById("articles-container");

            if (!articles || articles.length === 0) {
                console.warn('No articles found.');
                return;
            }

            let maxArticles = 12;
            let displayedArticles = 0;

            for (const element of articles) {
                let articleDiv = document.createElement("div");
                articleDiv.classList.add("article-div");

                let img = document.createElement("img");
                img.src = element.urlToImage;
                img.style.height = "40vh";
                img.style.width = "40vh";
                img.style.padding = "10px";

                let titleElement = document.createElement("h1");
                titleElement.innerHTML = element.title;
                titleElement.classList.add("article-title");

                let description = document.createElement("p");
                description.innerHTML = element.description;
                description.classList.add("article-description");

                articleDiv.appendChild(img);
                articleDiv.appendChild(titleElement);
                articleDiv.appendChild(description);

                articlesContainer.appendChild(articleDiv);

                displayedArticles++;

                if (displayedArticles >= maxArticles) {
                    break;
                }
            };

            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

cwindow.addEventListener('load', initialSearch);