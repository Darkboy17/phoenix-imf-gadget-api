import { generateUniqueCodename } from '../utils/uniqueCodename.js';
import { generateProbability } from '../utils/probability.js';
import { getRandomStatus, gadgetStatuses } from '../utils/status.js';
import { PrismaClient } from '@prisma/client';

// Prisma Client instance to interact with the database
const prisma = new PrismaClient();

// Function to get all gadgets or filter by status
export const getGadgets = async (req, res) => {

  // Check if the request has a query parameter for status
  const status = req.query.status;

  // If status is provided, filter the gadgets by status
  // If status is not provided, return all gadgets
  const gadgets = await prisma.gadget.findMany({
    where: status ? { status } : undefined,
  });

  // return the gadgets with "decommissionedAt" key only when status is "Decommissioned"
  res.json(gadgets.map(({ decommissionedAt, status, ...g }) => ({
    ...g,
    status,
    ...(status === "Decommissioned" && { decommissionedAt }),
    successProbability: generateProbability()
  })));
};

// Function to add a new gadget 
// This function generates a unique codename for the gadget and assigns it a random status
export const addGadget = async (req, res) => {
  try {

    const uniqueName = await generateUniqueCodename(prisma);

    const gadget = await prisma.gadget.create({
      data: {
        name: uniqueName,
        status: getRandomStatus()
      }
    });
    const { decommissionedAt, ...g } = gadget;
    res.status(201).json(g); // return the gadget without decommissionedAt field

  } catch (err) {

    console.error("Error creating gadget:", err);
    res.status(500).json({ error: "Internal server error" });

  }
};

// update gadget information
export const updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  // Check if ID exists in the database
  const gadget = await prisma.gadget.findUnique({ where: { id } });

  // If the gadget does not exist, return a 404 Not Found response
  if (!gadget) {
    return res.status(404).json({ error: `Gadget with id ${id} does not exist ` });
  }

  // Prevent updating decommissioned gadgets
  if (gadget.status === 'Decommissioned') {
    return res.status(400).json({ error: 'Decommissioned gadgets cannot be updated' });
  }

  // Check if the request body contains at least one field to update
  if (!name && !status) {
    return res.status(400).json({ error: 'No fields to update!' });
  }

  // If the user tries to decommission the gadget from here, return an error
  if (status === "Decommissioned") {
    return res.status(400).json({ error: 'Can only decommission the gadget by deleting it!' });
  }

  // Check status is valid if it's provided
  if (status && !gadgetStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value!' });
  }

  try {

    // Perform update
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(status && { status }),
      },
    });

    const { decommissionedAt, ...g } = updatedGadget;
    // Return the updated gadget without decommissionedAt field
    res.status(200).json({ message: "Gadget updated successfully", gadget: g });
  } catch (err) {
    console.error('Error updating gadget:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a gadget 
// This function marks the gadget as "Decommissioned" instead of actually deleting it
// This is a soft delete approach
export const deleteGadget = async (req, res) => {

  // Check if the request body contains all required fields
  const { id } = req.params;

  // Check if ID exists in the database
  const gadgetExists = await prisma.gadget.findUnique({ where: { id } });

  // If the gadget does not exist, return a 404 Not Found response
  if (!gadgetExists) {
    return res.status(404).json({ error: 'Cannot decommission a non-existing gadget!' });
  }

  // Prevent decommissioning already decommissioned gadgets
  if (gadgetExists.status === 'Decommissioned') {
    return res.status(400).json({ error: 'Gadget already decommissioned!' });
  }

  // Check if the gadget exists in the database
  const gadget = await prisma.gadget.update({
    where: { id },
    data: {
      status: "Decommissioned",
      decommissionedAt: new Date()
    }
  });

  // If the gadget does not exist, return a 404 Not Found response
  if (!gadget) {
    return res.status(404).json({ error: 'Gadget not found' });
  }

  // Return a 200 OK response with the updated gadget
  res.json({ message: "Gadget decommissioned successfully!", gadget });
};

// Function to self-destruct a gadget
// This function simulates a self-destruct sequence by generating a random confirmation code
export const selfDestruct = async (req, res) => {

  // Check if the request body contains all required fields
  const { id } = req.params;

  // Check if the gadget exists in the database
  const gadget = await prisma.gadget.findUnique({ where: { id } });

  // If the gadget does not exist, return a 404 Not Found response
  if (!gadget) {
    return res.status(404).json({ error: 'Gadget not found' });
  }

  // Generate a random confirmation code for the self-destruct sequence
  const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  // simulate triggering
  res.json({ message: `Self-destruct initiated. Code: ${confirmationCode}` });
};