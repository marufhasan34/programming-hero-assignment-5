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

const loadCardDetail = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displayCardDetail(data.data);
};

const displayCardDetail = (cards) => {
  console.log(cards);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <h3 class="font-bold text-2xl">${cards.title}</h3>
            <div class="flex gap-5">
              <p class="badge badge-success">${cards.status}</p>
              <p> ${cards.author}</p>
              <p>${cards.createdAt}</p>
            </div>
            <div></div>
            <p>
              ${cards.description}
            </p>
            <div class="flex gap-10">
              <div>
                <p>Assignee:</p>
                <p>${cards.author}</p>
              </div>
              <div>
                <p>Priority:</p>
                <p class="badge badge-error">${cards.priority}</p>
              </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
              </form>
            </div>
  `;
  document.getElementById("cardDetailsModal").showModal();
};

const displayAllCards = async (cards) => {
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const icon =
      card.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed- Status .png";

    const div = document.createElement("div");
    div.className = "card card-body w-full shadow-xl";
    div.innerHTML = `
       <div onclick="loadCardDetail(${card.id})" class="flex justify-between items-center">
            <img src="${icon}" alt="" />
            <div>
              <p>${card.priority}</p>
            </div>
          </div>
          <h3 onclick="loadCardDetail(${card.id})" class="font-semibold text-sm py-2">
            ${card.title}
          </h3>
          <p onclick="loadCardDetail(${card.id})" class="font-normal text-xs line-clamp-2 text-[#64748b]">
            ${card.description}
          </p>
          <p onclick="loadCardDetail(${card.id})" class="font-normal text-xs py-3">
            ${card.status}
          </p>
          <div onclick="loadCardDetail(${card.id})" class="flex gap-1 py-3">
           <div class="">
           ${createElement(card.labels)}
           </div>
            
          </div>
          <hr />
          <span onclick="loadCardDetail(${card.id})" class="text-[#64748b]">${card.author}</span>
          <span onclick="loadCardDetail(${card.id})" class="text-[#64748b]">${card.createdAt}</span>
     `;
    cardContainer.appendChild(div);
  });
};

loadAllCards();
