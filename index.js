// code here
document.addEventListener("DOMContentLoaded", function(){
  showShows();
  searchBtnClick();
  })
 
const baseUrl = 'http://localhost:3000'

//node getters
let searchId = document.getElementById("search")
let searchBtn = document.getElementById("search-button")
let queuedShowUl = document.getElementById("queued")
let showListUl = document.getElementById("list")
let queuedList = []
 
//resets
const resetShowList = () => {showListUl.innerHTML = ''}
const resetQueuedShows = () => {queuedShowUl.innerHTML = '' }


const showShows = () => {
 fetch(baseUrl + '/shows')
 .then(resp => resp.json())
 //.then(resp => console.log("resp", resp))
 .then(resp => {shows = resp;
    listShows(resp) 
 })
}

//create element so that you can render and show show titles +add click event, some function
const addShow = show => {
  const li = document.createElement('li');
  li.textContent = show.title;
  li.addEventListener('click', addToQueue);
  showListUl.append(li);
}

//render list of show names under h3 "Shows" + reset 
const listShows = shows => {
  resetShowList();
    shows.forEach(show => addShow(show)); 
}

//What is the click e doing? adds show lists to Queued Shows--e targets refers to the clicked li element
//add to empty array...need to create li? 
const addToQueue = e => {queuedList.push(e.target.innerText);
    addQueued();
}

//render the show names + click event to remove show name
const addQueued = () => {
    resetQueuedShows();

    queuedList.forEach(show => {

    const li = document.createElement("li");
    li.textContent = show;
    li.addEventListener("click", removeFromQueued);
    queuedShowUl.append(li);
    }
    )}
 
//what does the click do when clicked? !--not equal/strict inequality operator
const removeFromQueued = e => {
    queuedList = queuedList.filter(show => show !== e.target.textContent);
    addQueued();
}

//what do we want our search to do? search for movie that have certain values. toLowerCase???
//includes--does it include a certain value amongst its entries
const searchForShow = e => {
    listShows (shows.filter(show => show.title.toLowerCase().includes(searchId.value.toLowerCase())))
}

//add event listener to search button 
const searchBtnClick = () => {searchBtn.addEventListener('click', searchForShow);
}


