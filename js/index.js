const createMonsterDiv = document.getElementById('create-monster');
const monsterContainer = document.getElementById('monster-container');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const limit = 50;
let page = 1;

// Function to fetch monsters from the API
function fetchMonsters() {
  fetch(`http://localhost:3001/monsters?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(data => {
      // Clear the current monster container
      monsterContainer.innerHTML = '';

      // Loop through the data and create a new div for each monster
      data.forEach(monster => {
        const div = document.createElement('div');
        div.innerHTML = `<h2>${monster.name}</h2><p>Age: ${monster.age}</p><p>Description: ${monster.description}</p>`;
        monsterContainer.appendChild(div);
      });
    });
}

// Function to create a new monster
function createMonster(name, age, description) {
  fetch('http://localhost:3001/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ name, age, description })
  })
  .then(response => response.json())
  .then(data => {
    // Add the new monster to the container
    const div = document.createElement('div');
    div.innerHTML = `<h2>${data.name}</h2><p>Age: ${data.age}</p><p>Description: ${data.description}</p>`;
    monsterContainer.appendChild(div);

    // Clear the form inputs
    nameInput.value = '';
    ageInput.value = '';
    descriptionInput.value = '';
  });
}

// Function to load the previous page of monsters
function loadPreviousMonsters() {
  if (page > 1) {
    page--;
    fetchMonsters();
  }
}

// Function to load the next page of monsters
function loadMoreMonsters() {
  page++;
  fetchMonsters();
}

// Add event listener to the create monster button
createMonsterDiv.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const age = e.target.age.value;
  const description = e.target.description.value;

  if (!name || !age || !description) {
    alert('Please fill in all fields');
    return;
  }

  createMonster(name, age, description);
});

// Add event listener to the back button
back.addEventListener('click', loadPreviousMonsters);

// Add event listener to the forward button
forward.addEventListener('click', loadMoreMonsters);

// Fetch the first page of monsters when the page loads
fetchMonsters();