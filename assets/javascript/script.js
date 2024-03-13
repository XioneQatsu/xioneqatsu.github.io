const homeSrc = 'https://xioneqatsu.github.io/';

document.write(`
<nav>
  <div class="nav-text font-color">
    <h4>Xione Qatsu</h4>
  </div>
  <div class="drop-button">
    <input type="checkbox" id="drop-button">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <ul id="drop-content">
    <li><div class="card-btn font-color" id="home">Home</div></li>
    <li><div class="card-btn font-color" id="about">About</div></li>
  </ul>
</nav>
  <div class="container" id="content-load">
</div>
<footer>
  <p class="font-color">Xione Qatsu ~ 2024</p>
</footer>`);

document.querySelector('#drop-button').onclick = () => { document.querySelector('#drop-content').classList.toggle('drop'); };

const menu = [
  {
    id: 'home',
    url: `${homeSrc}index.html`,
  },
  {
    id: 'about',
    url: `${homeSrc}about.html`,
  },
];
for (let i = 0; i < menu.length; i++) openLink(menu[i], 'self');

function home_content() {
  fetch(`${homeSrc}assets/javascript/data.json`)
  .then(file => file.json())
  .then(data => {
    let home = data.home, content = '';
    home.forEach(data => {
    content += `
    <div class="card-column-auto" id="${data.id}">
      <div class="card radius-all box-shadow">
        <div class="card-text radius-tlr">
          <h4 class="font-color">${data.name}</h4>
        </div>
        <img class="border-blr" src="${data.image}">
      </div>
    </div>`;
    });
    document.querySelector('#content-load').innerHTML = content;
    home.forEach(data => { openLink(data, '_self'); });
  })
  .catch();
}

function about_content() {
  fetch(`${homeSrc}assets/javascript/data.json`)
  .then(file => file.json())
  .then(data => {
    let aboutData = data.about,
      description = aboutData.description,
      social = aboutData.social,
      changelogs = aboutData.changelogs,

    content = `
    <div class="card-column-2">
      <div class="card radius-all box-shadow">
        <div class="card-text radius-tlr">
          <h3 class="font-color">About me!</h3>
        </div>
        <div class="card-image-profile" style="margin-top: 10px">
          <img src="${homeSrc+aboutData.profile}">
        </div>
        <div class="card-text" style="margin-bottom: 10px">
          <h1 class="font-color font-acme">Xione Qatsu</h1>
        </div>
        <div class="card-text-block radius-tlr">`;
          description.forEach(data => { content += `<p class="font-color">${data.text}<br></p>`; });
          content += `<br><p class="font-color">${social[0].text}</p>`;
          for (let i = 1; i < social.length; i++)
            content += `<div class="font-color" id="${social[i].id}">- <a class="font-color">${social[i].name}</a></div>`;
          content += `
        </div>
      </div>
    </div>
    <div class="card-column-2">
      <div class="card radius-all box-shadow">
        <div class="card-text radius-tlr">
          <h3 class="font-color">Changelogs:</h3>
        </div>
        <div class="card-text-block-scroll-h2 radius-tlr">`;
          changelogs.forEach(data => {
            content += `<h4 class="font-color">${data.date}</h4>`;
            data.changelog.forEach(data => { content += `<p class="font-color">${data.text}<br></p>`; });
            content += '<br>';
          });
          document.querySelector('#content-load').innerHTML = content + `
        </div>
      </div>
    </div>`;

    for (let i = 1; i < social.length; i++) openLink(social[i], '_blank');
  })
  .catch();
}

function openLink(data, target) {
  document.getElementById(data.id).onclick = () => {
    let newElement = document.createElement('a');
    document.body.appendChild(newElement);
    newElement.target = open(data.url, target);
    document.body.removeChild(newElement);
  }
}
