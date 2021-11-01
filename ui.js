class UI {
    constructor() {
      this.initSaveTab = this.initSaveTab.bind(this);
      this.initForm = this.initForm.bind(this);
      this.addItem = this.addItem.bind(this);
      this.updateDomNode = this.updateDomNode.bind(this);
      this.initRemoveItem = this.initRemoveItem.bind(this);
      this.initClearAll = this.initClearAll.bind(this);
    }
  
    MyLeads = new Leads();
  
    initSaveTab() {
      const saveTabBtn = document.getElementById('save-tab-btn');
      //Add the url of the current or active tabs to our array variable when saveTab button is clicked.
      saveTabBtn.addEventListener('click', () => {
        const lead = { id: Date.now(), value: window.location.toString() };
        this.MyLeads.saveLead(lead);
        this.addItem(lead);
        this.initRemoveItem();
      });
    }
  
    initForm() {
      console.log('Form init...');
      const inputValue = document.getElementById('input-el');
      const saveBtn = document.getElementById('save-btn');
  
      saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!inputValue.value) return false;
        const lead = { id: Date.now(), value: inputValue.value.trim() };
        this.addItem(lead);
        this.MyLeads.saveLead(lead);
        this.initRemoveItem();
      });
    }
  
    addItem(item) {
      let listItem = '';
      if (
        item.value.includes('@', 0) ||
        item.value.includes('.', 0) ||
        item.value.includes('www.', 0) ||
        item.value.includes('https', 0) ||
        item.value.includes('http', 0) ||
        item.value.includes('/', 0) ||
        item.value.includes(':', 0) ||
        item.value.includes('|', 0)
      ) {
        listItem += `
        <button class="delete-item-btn">
          <i class="fas fa-trash-alt" class="delete-item-btn"></i>
            </button>
            <a target='_blank' href=${item.value}>
              ${item.value}
            </a>`;
      } else {
        listItem += `
        <button class="delete-item-btn">
          <i class="fas fa-trash-alt" class="delete-item-btn"></i></button>
            ${item.value}`;
      }
      let li = document.createElement('li');
      li.setAttribute('data-id', item.id);
      li.innerHTML = listItem;
      document
        .querySelector('#list-container')
        .insertAdjacentElement('afterbegin', li);
    }
  
    updateDomNode() {
      const leads = this.MyLeads.getLeads();
      console.log(leads);
      if (!(leads || leads.length)) return false;
      leads.map((lead) => this.addItem(lead));
    }
  
    initRemoveItem() {
      const delBtn = document.querySelectorAll('.delete-item-btn');
      delBtn.forEach((btn) =>
        btn.addEventListener('click', (e) => {
          this.MyLeads.removeLead(parseInt(e.target.closest('li').dataset.id));
          e.target.closest('li').remove();
        })
      );
    }
  
    initClearAll() {
      const clearBtn = document.querySelector('#clear-btn');
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all entries?')) {
          this.MyLeads.clearLeads();
          document.querySelector('#list-container').innerHTML = '';
        }
      });
    }
  
    init() {
      this.initForm();
      this.initClearAll();
      this.updateDomNode();
      this.initRemoveItem();
      this.initSaveTab();
    }
  }
  
  new UI().init();
  