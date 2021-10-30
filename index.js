let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

//Add item from the input when saveInput button is clicked.
inputBtn.addEventListener("click", function () {
  myLeads.push({id: Date.now(), value: inputEl.value});
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//Checking if there is item in our array variable.
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//Add the url of the current or active tabs to our array variable when saveTab button is clicked.
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

//Render url as a list link
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    if (
      leads[i].value.includes("@", 0) ||
      leads[i].value.includes(".", 0) ||
      leads[i].value.includes("www.", 0) ||
      leads[i].value.includes("https", 0) ||
      leads[i].value.includes("http", 0) ||
      leads[i].value.includes("/", 0) ||
      leads[i].value.includes(":", 0) ||
      leads[i].value.includes("|", 0)
    ) {
      listItems += `
      <li>
      <button data-index=${leads[i].id} class="deleteItemBtn">
          <i class="fas fa-trash-alt" id="delete-item"></i>
          </button>
          <a target='_blank' href='${leads[i].value}'>
              ${leads[i].value}
          </a>
      </li>
  `;
    } else {
      listItems += `
      <li>
      <button data-index=${leads[i].id}  class="deleteItemBtn">
          <i class="fas fa-trash-alt" id="delete-item"></i>
          </button>
              ${leads[i].value} 
      </li>
  `;
    }
  }
  ulEl.innerHTML = listItems;
    }

  //Delete individual items
// deleteItem.addEventListener ("click", function () {
// const deleteItem = (i) => {
const delBtn = document.querySelectorAll(".deleteItemBtn");
delBtn.forEach(btn => btn.addEventListener("click", (e) => {
  const index = e.target.closest("li");
  console.log(index)
    let leads = localStorage.getItem("myLeads");
    leads = JSON.parse(leads);
    // let currentLeads = leads.filter(item => item.id =! e.target.dataset.index);
    // console.log(e.target.dataset.index)
    ulEl.removeChild(index);
    localStorage.setItem("myLeads", JSON.stringify(currentLeads));
    // render(currentLeads);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // render(myLeads);
}));

//Delete all saved url when delete button is double clicked.
deleteBtn.addEventListener("dblclick", function () {
  // console.log("double clicked")
  localStorage.removeItem("myLeads");
  myLeads = [];
  ulEl.innerHTML = "";
  // render();
});
