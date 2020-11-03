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

$(document).ready(function() {
  let addressBook = new AddressBook();
  $("form#newContact").submit(function(event) {
    event.preventDefault();
    let contact = new Contact($("input#newFirstName").val(), $("input#newLastName").val(), $("input#newPhoneNumber").val());
    addressBook.addContact(contact);
    console.log(addressBook.contacts);
    $("#contacts").append(contact.fullName(contact) + "<br>");
  });
});