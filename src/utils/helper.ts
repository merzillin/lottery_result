export const generateLastNDates = (n: number): string[] => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i); // Subtract i days from today
    const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    dates.push(formattedDate);
  }

  return dates;
};
