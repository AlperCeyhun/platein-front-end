// Utility to order weekly data by days of the week (Monday to Sunday)
// Input: [{ day_of_week: string; calorie_need: number; consumed_calories: number }]
// Output: [{ name: string; value: number; goalvalue: number }]
const WEEK_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export function orderWeeklyData(
  data: Array<{ day_of_week: string; calorie_need: number; consumed_calories: number }>
): Array<{ name: string; value: number; goalvalue: number }> {
  // Map input data by day_of_week for quick lookup (case-insensitive)
  const dataMap = new Map(
    data.map((item) => [item.day_of_week.trim().toUpperCase(), item])
  );
  // Return array ordered by WEEK_DAYS, filling missing days with zeros if needed
  return WEEK_DAYS.map((day) => {
    const entry = dataMap.get(day);
    return {
      name: day.toLowerCase(), // e.g. "monday"
      value: entry ? entry.consumed_calories : 0,
      goalvalue: entry ? entry.calorie_need : 0,
    };
  });
}