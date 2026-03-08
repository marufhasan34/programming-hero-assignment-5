const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="badge badge-success">${el}</span>`,
  );
  return htmlElements.join(" ");
};

const cardContainer = document.getElementById("cardContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
let allCards = [];
const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.innerHTML = "";
};
const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
};

const toggleBtn = (id) => {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");
  const selected = document.getElementById(id);
  selected.classList.add("btn-primary");
};

const handleFilter = (btn) => {
  if (btn === "all") {
    toggleBtn("allBtn");
    displayAllCards(allCards);
  }
  if (btn === "open") {
    toggleBtn("openBtn");

    const openCards = allCards.filter(function (card) {
      return card.status === "open";
    });

    displayAllCards(openCards);
  }

  if (btn === "closed") {
    toggleBtn("closedBtn");

    const closedCards = allCards.filter(function (card) {
      return card.status === "closed";
    });

    displayAllCards(closedCards);
  }
};

const loadAllCards = async () => {
  showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allCards = data.data;
  hideLoading();
  displayAllCards(data.data);
};

// labels
// :
// (2) ['enhancement', 'help wanted']
// priority
// :
// "high"
// status
// :
// "open"

const displayAllCards = async (cards) => {
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "card card-body w-full shadow-xl";
    div.innerHTML = `
       <div class="flex justify-between items-center">
            <img src="./assets/Open-Status.png" alt="" />
            <div>
              <p>${card.priority}</p>
            </div>
          </div>
          <h3 class="font-semibold text-sm py-2">
            ${card.title}
          </h3>
          <p class="font-normal text-xs line-clamp-2 text-[#64748b]">
            ${card.description}
          </p>
          <p class="font-normal text-xs py-3">
            ${card.status}
          </p>
          <div class="flex gap-1 py-3">
           <div class="">
           ${createElement(card.labels)}
           </div>
            
          </div>
          <hr />
          <span class="text-[#64748b]">${card.author}</span>
          <span class="text-[#64748b]">${card.createdAt}</span>
     `;
    cardContainer.appendChild(div);
  });
};

loadAllCards();
