module.exports = function calculateStreak(history) {
  const sorted = history
    .filter(h => h.completed)
    .map(h => new Date(h.date).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  let streak = 0;
  let today = new Date().setHours(0, 0, 0, 0);

  for (let date of sorted) {
    if (date === today) {
      streak++;
      today -= 86400000; // 1 day in ms
    } else {
      break;
    }
  }
  return streak;
};
