const res = await fetch(
  `https://api.github.com/repos/Bookingjini-Labs/bookingjini-icons/contributors`
);

const contributors = await res.json();
console.log(contributors);

// User Cards and Content
const container = document.getElementById("contributors");

let html = "";
contributors.forEach((contributor) => {
  html += `
       <div class="user user-dark-mode">
            <img alt="user-avatar" class="user-image" src = "${contributor.avatar_url}"/>
            <h5>${contributor.login}</h5>
            <p class="contributions"><strong>Contributions:</strong> ${contributor.contributions} ✨</p>
            <a href="${contributor.html_url}" target="_blank"><button type="button"  class="btn btn-outline-primary"><strong>View Profile</strong></button></a>
       </div>
     `;
});

container.innerHTML = html;

//  Dark/Light functionality color change
const darkLightMode = document.getElementById("darkmode-toggle");
const userCard = [...document.getElementsByClassName("user")];

darkLightMode.addEventListener("change", () => {
  const isDarkmode = darkLightMode.checked;

  if (isDarkmode) {
    userCard.forEach((user) => {
      user.style.backgroundColor = "#1e1b22";
      user.style.color = "whitesmoke";
    });
  } else {
    userCard.forEach((user) => {
      user.style.backgroundColor = "#eef7fb";
      user.style.color = "black";
    });
  }
});
