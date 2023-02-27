const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData);
  } catch 
    (error) { console.log(error.message) };
  }


async function getContactById(id) {
  try {
    const getContactsList = await listContacts();
    return getContactsList.find((contact) => String(contact.id) === String(id));
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(id) {
  try {
    const getContactsList = await listContacts();
    const newContactsList = getContactsList.filter(
      (contact) => String(contact.id) !== id);
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 3));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = crypto.randomUUID();
    const getContactsList = await listContacts();
    const newContact = { id, name, email, phone };
    getContactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(getContactsList, null, 4));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
