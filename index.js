let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

//Add item from the input when saveInput button is clicked.
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
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
      leads[i].includes("@", 0) ||
      leads[i].includes(".", 0) ||
      leads[i].includes("www.", 0) ||
      leads[i].includes("https", 0) ||
      leads[i].includes("http", 0) ||
      leads[i].includes("/", 0) ||
      leads[i].includes(":", 0) ||
      leads[i].includes("|", 0)
    ) {
      listItems += `
      <li>
      <button id="delete-item-btn">
          <i class="fas fa-trash-alt" id="delete-item" onclick="deleteItem('${i}')"></i>
          </button>
          <a target='_blank' href='${leads[i]}'>
              ${leads[i]}
          </a>
          
      </li>
  `;
    } else {
      listItems += `
      <li>
      <button id="delete-item-btn">
          <i class="fas fa-trash-alt" id="delete-item" onclick="deleteItem('${i}')"></i>
          </button>
              ${leads[i]} 
      </li>
  `;
    }
  }
  ulEl.innerHTML = listItems;
    }

  //Delete individual items
const deleteItem = (i) => {
    myLeads.splice(i, 1);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

//Delete all saved url when delete button is double clicked.
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
