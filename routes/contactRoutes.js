const express = require("express")
const contactRouter = express.Router()
const { getContact, getContacts, createContact, updateContact, deleteContact } = require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")

// user of validateToken middleware
contactRouter.use(validateToken);

// contactRouter.route('/').get(getContacts);

// contactRouter.route('/').post(createContact);

contactRouter.route('/').get(getContacts).post(createContact);

// contactRouter.route('/:id').get(getContact);

// contactRouter.route('/:id').put(updateContact);

// contactRouter.route('/:id').delete(deleteContact);

contactRouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = contactRouter;