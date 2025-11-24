import express from "express";
import { ContactModel } from "../models/contact.model";

export const getContacts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.user?.id;
    const contacts = await ContactModel.find({ belongsTo: userId });
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.user?.id;
    const { name, email, phone, address, favorite, notes } = req.body;

    if (!name || !phone || !email) {
      return res
        .status(401)
        .json({ error: "Name, Phone or Email is required" });
    }

    const contact = new ContactModel({
      name,
      email,
      phone,
      address,
      favorite,
      notes,
      belongsTo: userId,
    });

    await contact.save();
    res.status(201).json({ success: true, contact });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const contactId = req.params.id;
    const userId = req.user?.id;

    const contactBelongsToUser = await ContactModel.findOne({
      _id: contactId,
      belongsTo: userId,
    });

    if (!contactBelongsToUser) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const contact = await ContactModel.findOneAndUpdate(
      { _id: contactId, belongsTo: userId },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ success: true, contact });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const contactId = req.params.id;
    const userId = req.user?.id;

    const contactBelongsToUser = await ContactModel.findOne({
      _id: contactId,
      belongsTo: userId,
    });

    if (!contactBelongsToUser) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await ContactModel.deleteOne({ _id: contactId, belongsTo: userId });

    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
