const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", fetchProfile);

async function fetchProfile() {
    profileDiv.innerHTML = "";

    const username =
        document.getElementById("username").value.trim();

    if (!username) return;

    try {
        loading.textContent = "Loading...";

        const userResponse =
            await fetch(`https://api.github.com/users/${username}`);

        if (userResponse.status === 404) {
            throw new Error("User not found");
        }

        const user = await userResponse.json();

        const repoResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`
        );

        const repos = await repoResponse.json();

        profileDiv.innerHTML = "";

        const profile = document.createElement("div");
        profile.classList.add("profile");

        const avatar = document.createElement("img");
        avatar.src = user.avatar_url;

        const name = document.createElement("h2");
        name.textContent = user.name || username;

        const bio = document.createElement("p");
        bio.textContent = user.bio || "No bio available";

        const stats = document.createElement("div");
        stats.classList.add("stats");

        stats.innerHTML = `
      <div>Followers: ${user.followers}</div>
      <div>Following: ${user.following}</div>
      <div>Repos: ${user.public_repos}</div>
    `;

        profile.appendChild(avatar);
        profile.appendChild(name);
        profile.appendChild(bio);
        profile.appendChild(stats);

        profileDiv.appendChild(profile);

        const repoTitle = document.createElement("h3");
        repoTitle.textContent = "Top Repositories";
        profileDiv.appendChild(repoTitle);

        repos.forEach(repo => {
            const repoCard = document.createElement("div");
            repoCard.classList.add("repo");

            repoCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank">
          <strong>${repo.name}</strong>
        </a>
        <p>${repo.description || "No description"}</p>
        <p>⭐ ${repo.stargazers_count}</p>
        <p>${repo.language || "Unknown"}</p>
      `;

            profileDiv.appendChild(repoCard);
        });

    } catch (error) {
        profileDiv.innerHTML =
            `<p class="error">${error.message}</p>`;
    }

    loading.textContent = "";
}