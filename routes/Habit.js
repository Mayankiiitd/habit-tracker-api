const express = require('express');
const auth = require('../middlewares/auth');
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  markHabit,
  getHistory,
  getDailySummary,
  getAnalytics
} = require('../controllers/Habit');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Habits
 *   description: API for managing daily habits
 */

/**
 * @swagger
 * /api/habits:
 *   post:
 *     summary: Create a new habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               frequency:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Habit created
 */
router.post('/', auth, createHabit);

/**
 * @swagger
 * /api/habits:
 *   get:
 *     summary: Get all habits for the logged-in user
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of habits
 */
router.get('/', auth, getHabits);

/**
 * @swagger
 * /api/habits/{id}:
 *   put:
 *     summary: Update a specific habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the habit
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Habit updated
 */
router.put('/:id', auth, updateHabit);

/**
 * @swagger
 * /api/habits/{id}:
 *   delete:
 *     summary: Delete a habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the habit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit deleted
 */
router.delete('/:id', auth, deleteHabit);

/**
 * @swagger
 * /api/habits/{id}/mark:
 *   post:
 *     summary: Mark a habit as completed for today
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habit marked as completed
 */
router.post('/:id/mark', auth, markHabit);

/**
 * @swagger
 * /api/habits/{id}/history:
 *   get:
 *     summary: Get history and streak of a habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History and streak
 */
router.get('/:id/history', auth, getHistory);

/**
 * @swagger
 * /api/habits/summary/today:
 *   get:
 *     summary: Get daily summary for today
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of today's completed/pending habits
 */
router.get('/summary/today', auth, getDailySummary);

/**
 * @swagger
 * /api/habits/analytics:
 *   get:
 *     summary: Get analytics for all habits
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Habit analytics (total, completions, streaks)
 */
router.get('/analytics', auth, getAnalytics);

module.exports = router;
