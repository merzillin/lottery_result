/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { generateLastNDates } from "../utils/helper";

export const HomePage1 = () => {
  const [lotteryData, setLotteryData] = useState<any>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchLotteryData = async (date: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://indialotteryapi.com/wp-json/klr/v1/by-date?date=${date}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLotteryData(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setDates(generateLastNDates(10));
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const selected = event.target.value;
    setSelectedDate(selected);
    fetchLotteryData(selected);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 mt-50">
        <h2 className="text-xl font-semibold">Lottery Results</h2>
        <div className="mt-4">
          <label
            htmlFor="date-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select a Date:
          </label>
          <select
            id="date-select"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            value={selectedDate}
            onChange={handleDateChange}
          >
            <option value="">Select a date</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        {lotteryData && selectedDate && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">
              Results for {selectedDate}
            </h3>
            <div className="mt-4">
              {/* Render the lottery results here */}
              <p>Lottery Results:</p>
              <pre>{JSON.stringify(lotteryData, null, 2)}</pre>
              {/* You can format the results based on the structure of the data */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
