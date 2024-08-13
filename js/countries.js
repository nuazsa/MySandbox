const endpoind = "https://api.sampleapis.com/countries/countries";

const list = document.getElementById("countries");
const search = document.getElementById("search");
const searchInput = document.getElementById("topbar-search");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

// Array of data
let countriesData = [];
let filteredData = [];

// Pagination Counter
let offset = 0;
const itemsPerPage = 10;
let totalPages = 0;

// Fetch data from the API and store it in countriesData
async function hitApi() {
  const api = await fetch(endpoind);
  countriesData = await api.json();
  filteredData = countriesData;
  totalPages = Math.ceil(filteredData.length / itemsPerPage);
  renderList();
  updateButtons();
}

// Render the list based on the current offset and limit
function renderList() {
  list.innerHTML = "";
  const data = filteredData.slice(offset, offset + itemsPerPage);

  data.forEach((country, index) => {
    const population = country.population
      ? country.population.toLocaleString()
      : "N/A";

    list.innerHTML += `
    <div class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <!-- Card -->
      <div class="relative">
        <img class="rounded-t-lg h-24 sm:h-32 w-full"
          src="${country.media.flag}"
          alt="${country.abbreviation}" />
        <div class="absolute inset-0 flex justify-end items-start">
          <div class="flex w-full justify-between text-center m-2">
            <p class="text-white text-4xl font-bold opacity-50">${country.abbreviation}</p>
            <img class="w-10 h-10" src="${country.media.emblem}" alt="${country.abbreviation}">
          </div>
        </div>
      </div>
      <div class="p-2">
        <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ${country.name}
        </h5>
        <p class="mb-2 text-sm font-medium tracking-tight text-gray-900 dark:text-white">
          Capital city of ${country.capital}
        </p>
        <!-- Button to open modal -->
        <button onclick="openModal(${index})" class="text-blue-600 hover:underline">More details</button>
      </div>
    </div>

    <!-- Modal structure -->
    <div id="modal-${index}" class="hidden fixed inset-0 z-50 flex items-center justify-center">
      <!-- Modal backdrop -->
      <div class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
      
      <!-- Modal content -->
      <div class="relative z-50 p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              ${country.name}
            </h3>
            <button type="button" onclick="closeModal(${index})"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 space-y-4">
            <img src="${country.media.orthographic}" alt="">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ${country.name} has a population of around ${population} people, uses the currency (${country.currency}), and the international telephone code is +${country.phone}.
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  });
}

function openModal(index) {
  document.getElementById(`modal-${index}`).classList.remove("hidden");
}

function closeModal(index) {
  document.getElementById(`modal-${index}`).classList.add("hidden");
}


// Update the state of prev/next buttons
function updateButtons() {
  document.getElementById('page').innerText = `Showing ${offset + 1}-${offset + itemsPerPage} of ${filteredData.length}`;

  prev.disable = offset <= 0;
  next.disable = offset + itemsPerPage >= filteredData.length;
}

// Handle the previous button click
prev.addEventListener("click", function () {
  if (offset > 0) {
    offset -= itemsPerPage;
    renderList();
    updateButtons();
  }
});

// Handle the next button click
next.addEventListener("click", function () {
  if (offset + itemsPerPage < filteredData.length) {
    offset += itemsPerPage;
    renderList();
    updateButtons();
  }
});

// Handle search input
searchInput.addEventListener("keyup", function () {
  const searchTerm = searchInput.value.toLowerCase();
  offset = 0; // Reset pagination on search

  filteredData = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchTerm)
  );

  renderList();
  updateButtons();
});

hitApi();
