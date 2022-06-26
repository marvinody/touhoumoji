// stolen from https://gomakethings.com/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/
// Show an element
const show = function (elem) {

  // Get the natural height of the element
  const getHeight = function () {
    elem.style.display = 'block'; // Make it visible
    const height = elem.scrollHeight + 'px'; // Get it's height
    elem.style.display = ''; //  Hide it again
    return height;
  };

  const height = getHeight(); // Get the natural height
  elem.classList.add('is-visible'); // Make the element visible
  elem.style.height = height; // Update the max-height

  // Once the transition is complete, remove the inline max-height so the content can scale responsively
  window.setTimeout(function () {
    elem.style.height = '';
  }, 250);

};

// Hide an element
const hide = function (elem) {

  // Give the element a height to change from
  elem.style.height = elem.scrollHeight + 'px';

  // Set the height back to 0
  window.setTimeout(function () {
    elem.style.height = '0';
  }, 1);

  // When the transition is complete, hide it
  window.setTimeout(function () {
    elem.classList.remove('is-visible');
  }, 250);

};

// Toggle element visibility
const toggle = function (elem) {

  // If the element is visible, hide it
  if (elem.classList.contains('is-visible')) {
    hide(elem);
    return;
  }

  // Otherwise, show it
  show(elem);

};
// end stolen
// stolen from https://stackoverflow.com/questions/2450954
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const CE = (t) => document.createElement(t)

const getCharacters = (cb) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "characters.json", true);
  xhr.setRequestHeader("Content-type", "application/json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      cb(data);
    }
  }
  xhr.send(null);
}

const findParentMatchingClass = (el, wantedClass) => {
  if (el.classList.contains(wantedClass)) {
    return el;
  }

  if (!el.parentElement) {
    return false;
  }

  return findParentMatchingClass(el.parentElement, wantedClass)
}

const addCharacters = (data) => {

  shuffle(data)
  
  const entries = data.map(char => {
    const emote = CE('div')
    emote.classList.add('emote')
    const emoteSpan = CE('span')
    emoteSpan.textContent = char.emote
    emote.appendChild(emoteSpan)

    const answer = CE('div')
    answer.classList.add('answer')
    answer.textContent = char.name

    const entryBody = CE('div')
    entryBody.classList.add('entry-body')
    entryBody.appendChild(emote)
    entryBody.appendChild(answer)


    const entry = CE('div')
    entry.classList.add('toggable', 'entry')
    entry.appendChild(entryBody)

    twemoji.parse(entry)

    return entry;    
  })

  const content = document.querySelector('.content');
  entries.forEach(entry => content.appendChild(entry))
}

document.addEventListener('DOMContentLoaded', () => {

  getCharacters(addCharacters);

  console.log('helll')

  document.getElementsByClassName('content')[0].addEventListener('click', (evt) => {
    console.log(evt)

    const clickedEntry = findParentMatchingClass(evt.target, 'entry');

    const answer = clickedEntry.querySelector('.answer')
    toggle(answer)
  })
});