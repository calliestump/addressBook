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
  function displayContactDetails(addressBooktoDisplay) {
    let contactsList = $("ul#contacts");
    let htmlForContactInfo = "";
    addressBooktoDisplay.contacts.forEach(function(contact) {
      htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    });
    contactsList.html(htmlForContactInfo);
  };
  $("form#newContact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#newFirstName").val();
    const inputtedLastName = $("input#newLastName").val();
    const inputtedPhoneNumber = $("input#newPhoneNumber").val()
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
   //$("#contacts").append(newContact.fullName(newContact) + "<br>");
  });
});