// code here

const baseUrl = 'http://localhost:3000'

const listUl = () => document.getElementById("list")
const queuedUl = () => document.getElementById("queued")
const searchInput = () => document.getElementById("search");
const searchBtn = () => document.getElementById("search-button");

let shows = []
let queued = []

const loadShows = () => {
  fetch(baseUrl + '/shows')
    .then(resp => resp.json())
    .then(data => {
      shows = data;
      renderShows(data)
    })
}

const renderShows = data => {
  resetList();

  data.forEach(show => renderShow(show));
}

const renderQueued = () => {
  resetQueued();
  queued.forEach(show => queueShow(show))
}

const queueShow = show => {
  const li = document.createElement("li");

  li.textContent = show;

  li.addEventListener("click", removeFromQueue);

  queuedUl().appendChild(li);
}

const renderShow = show => {
  const li = document.createElement('li');

  li.textContent = show.title;

  li.addEventListener('click', addToQueue);

  listUl().appendChild(li);
}

const addToQueue = e => {
  queued.push(e.target.innerText);
  renderQueued();
}

const removeFromQueue = e => {
  queued = queued.filter(show => show !== e.target.textContent);
  
  renderQueued();
}

const resetList = () => {
  listUl().innerHTML = ''
}

const resetQueued = () => {
  queuedUl().innerHTML = ''
}

const search = e => {
  renderShows(shows.filter(show => show.title.toLowerCase().includes(searchInput().value.toLowerCase())))
}

const addClickToSearchButton = () => {
  searchBtn().addEventListener('click', search);
}

document.addEventListener('DOMContentLoaded', () => {
  loadShows();
  addClickToSearchButton();
})
