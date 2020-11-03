function AddressBook()  {
  this.contacts = [];
  this.currentId = 0;
}
//Adds contact to address book
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}
// Assigns each contact a unique ID
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
//Finds a contact using ID
AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if(this.contacts[i]) {
      if(this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

// Deletes Contact using ID
AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if(this.contacts[i]) {
      if(this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}
// Creates contact
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
// Combine first and last name of contact
Contact.prototype.fullName = function()  {
  return this.firstName + " " + this.lastName + ": " + this.phoneNumber;
}
// User Interface Logic
let addressBook = new AddressBook();

function displayContactDetails(addressBooktoDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBooktoDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

$(document).ready(function() {
  attachContactListeners();
  $("form#newContact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#newFirstName").val();
    const inputtedLastName = $("input#newLastName").val();
    const inputtedPhoneNumber = $("input#newPhoneNumber").val()
    
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});