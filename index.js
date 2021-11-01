class Leads{
  constructor() {
    this.getLeads = this.getLeads.bind(this);
    this.saveLead = this.saveLead.bind(this);
    this.removeLead = this.removeLead.bind(this);
    this.clearLeads = this.clearLeads.bind(this);
  };

getLeads() {
 return JSON.parse(localStorage.getItem('leads')) ?? [];
}

saveLead(lead) {
  const leads = this.getLeads();
  leads.push(lead);
  localStorage.setItem('leads', JSON.stringify(leads));
}

  removeLead(leadId) {
    // console.log('Lead removed...', leadId);
    const newLeads = this.getLeads().filter(lead => lead.id !== leadId);
    localStorage.setItem('leads', JSON.stringify(newLeads));
  }

  clearLeads() {
    localStorage.removeItem('leads');
    console.log('Lead cleared.');
  }
}

var global = window || global;
global.Leads = Leads
