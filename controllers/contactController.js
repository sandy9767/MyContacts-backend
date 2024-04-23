const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    // res.send("Get all contacts")
    // for json and status code
    // 200 status code for normal success
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts)
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    // won't work, require body parser in the server.js
    console.log("The req body is", req.body);
    const { name, phone, email } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    // status 201 for creation
    res.status(201).json(contact)
})

//@desc Get contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!")
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("Unauthorized!")
    }
    res.status(200).json({ contact })
})

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!")
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("Unauthorized!")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedContact)
})

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!")
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("Unauthorized!")
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact)
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }

// for every async, we need try catch
// instead use express error handler
// wrap every async request with asyncHandler