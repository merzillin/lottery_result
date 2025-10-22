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

export function downloadFile({
  data,
  fileName,
  fileType,
}: {
  data: string;
  fileName: string;
  fileType: "csv" | "json" | "txt";
}) {
  const mimeTypes: Record<typeof fileType, string> = {
    csv: "text/csv",
    json: "application/json",
    txt: "text/plain",
  };

  // Ensure the file has the correct extension
  if (!fileName.endsWith(`.${fileType}`)) {
    fileName += `.${fileType}`;
  }

  const blob = new Blob([data], { type: mimeTypes[fileType] });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
