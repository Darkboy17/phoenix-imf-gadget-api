/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Retrieve a list of all gadgets (optionally filtered by status)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: A list of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 * 
 *   post:
 *     summary: Add a new gadget to the inventory
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Gadget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update an existing gadget's information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: ""
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *                 example: ""
 *     responses:
 *       200:
 *         description: Gadget updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Remove a gadget from the inventory / Decommission a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Gadget decommissioned
 */

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger the self-destruct sequence for a specific gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Self-destruct triggered
 */


import express from 'express';
import {
  getGadgets, addGadget, updateGadget,
  deleteGadget, selfDestruct
} from '../controllers/gadget.controller.js';
import { authenticate } from '../middleware/auth.js';

// create a new router instance
const router = express.Router();

// Define routes for gadgets
// The authenticate middleware is applied to all routes in this router
router.get('/', authenticate, getGadgets);
router.post('/', authenticate, addGadget);
router.patch('/:id', authenticate, updateGadget);
router.delete('/:id', authenticate, deleteGadget);
router.post('/:id/self-destruct', authenticate, selfDestruct);

export default router;
