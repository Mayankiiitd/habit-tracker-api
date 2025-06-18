const Habit = require('../models/Habit');
const User = require('../models/User');
const calculateStreak = require('../utils/streak');

exports.createHabit = async (req, res) => {
  try {
    const { name, description, frequency, category, tags } = req.body;
    const habit = await Habit.create({
      name,
      description,
      frequency: frequency?.toLowerCase() || 'daily',
      category: category || 'General',
      tags: Array.isArray(tags) ? tags : [],
      user: req.user._id
    });

    // ✅ Track creation in user model
    req.user.createdHabits.push(habit._id);
    await req.user.save();

    res.status(201).json(habit);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

exports.updateHabit = async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(habit);
};

exports.deleteHabit = async (req, res) => {
  await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  // ✅ Track deletion in user model
  req.user.deletedHabits.push(req.params.id);
  await req.user.save();

  res.json({ message: 'Habit deleted' });
};

exports.markHabit = async (req, res) => {
  const { date = new Date() } = req.body;
  const habit = await Habit.findById(req.params.id);

  if (!habit) return res.status(404).json({ error: 'Habit not found' });

  const exists = habit.completionHistory.some(
    entry => new Date(entry.date).toDateString() === new Date(date).toDateString()
  );

  if (!exists) habit.completionHistory.push({ date, completed: true });
  await habit.save();

  // ✅ Track completion in user model
  if (!req.user.completedHabits.includes(habit._id)) {
    req.user.completedHabits.push(habit._id);
    await req.user.save();
  }

  res.json(habit);
};

exports.getHistory = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
  if (!habit) return res.status(404).json({ error: 'Not found' });

  const streak = calculateStreak(habit.completionHistory);
  res.json({ history: habit.completionHistory, streak });
};

exports.getDailySummary = async (req, res) => {
  // only habits created by the logged-in user
  const habitIds = req.user.createdHabits.map(h => h._id);
  const habits = await Habit.find({ _id: { $in: habitIds } });

  const today = new Date().toDateString();
  const summary = habits.map(habit => {
    const completed = habit.completionHistory.some(
      entry => new Date(entry.date).toDateString() === today
    );
    return {
      name: habit.name,
      completed
    };
  });

  res.json(summary);
};


exports.getAnalytics = async (req, res) => {
  const habitIds = req.user.createdHabits.map(h => h._id);
  const habits = await Habit.find({ _id: { $in: habitIds } });

  const totalHabits = habits.length;
  let totalCompletions = 0;
  let longestStreak = 0;

  for (const habit of habits) {
    const history = habit.completionHistory
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    totalCompletions += history.length;

    // Calculate longest streak
    let currentStreak = 0;
    let maxStreak = 0;
    let prevDate = null;

    for (const record of history) {
      const date = new Date(record.date);
      if (!prevDate) {
        currentStreak = 1;
      } else {
        const diff = (date - prevDate) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      maxStreak = Math.max(maxStreak, currentStreak);
      prevDate = date;
    }

    longestStreak = Math.max(longestStreak, maxStreak);
  }

  const completionRate = totalHabits === 0 ? 0 : Math.round((totalCompletions / totalHabits) * 100);

  res.json({
    totalHabits,
    totalCompletions,
    longestStreak,
    completionRate: `${completionRate}%`
  });
};

