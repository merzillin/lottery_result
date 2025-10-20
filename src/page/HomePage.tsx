/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { generateLastNDates } from "../utils/helper";
import { PageCard } from "./Card";

type TMessage = { message: string };
export const HomePage = () => {
  const [lotteryData, setLotteryData] = useState<any>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [message, setMessage] = useState<TMessage[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkLotteryNumber = (number: string, result: string): boolean => {
    return result.includes(number);
  };
  const handleSearch = () => {
    console.log("search");

    //first prize
    let message: TMessage[] = [];
    if (number === lotteryData.first.ticket) {
      message.push({ message: `First Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes.consolation)) {
      message.push({ message: `Consolation Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["2nd"])) {
      message.push({ message: `2nd Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["3rd"])) {
      message.push({ message: `3rd Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["4th"])) {
      message.push({ message: `4th Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["5th"])) {
      message.push({ message: `5th Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["6th"])) {
      message.push({ message: `6th Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["7th"])) {
      message.push({ message: `7th Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["8th"])) {
      message.push({ message: `7th Prize - ` });
    } else if (checkLotteryNumber(number, lotteryData.prizes["9th"])) {
      message.push({ message: `9th Prize - ` });
    } else {
      message = [{ message: `9th Prize - ` }];
    }

    setMessage(message);
  };
  const handleBlur = (input: string) => {
    setNumber(input);
  };

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

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const selected = event.target.value;
    setSelectedDate(selected);
    fetchLotteryData(selected);
  };

  useEffect(() => {
    setDates(generateLastNDates(10));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }

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

        {lotteryData && (
          <>
            <div className="mb-4">
              <label className="block text-lg font-semibold">
                Lottery Number
              </label>
              <div className="flex flex-row mx-2 gap-2 items-center justify-between ">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => handleBlur(e.target.value)}
                  className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  placeholder="Enter lottery number"
                />
                <button
                  className="mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="">
              <div>
                <h1>Details</h1>
                <div className="text-lg font-semibold mb-4">
                  {lotteryData.draw_name + " " + [lotteryData.draw_code]}
                </div>
              </div>
              <div>
                {message.map((item: { message: string }) => (
                  <p>{item.message}</p>
                ))}
              </div>
              <div className="">
                <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto my-4">
                  <div className="text-lg font-semibold mb-4">
                    1st Prize -{lotteryData.prizes.amounts["1st"]}
                  </div>
                  <hr className="border-t-2 border-gray-300 my-4" />
                  <div className="flex flex-row flex-wrap space-x-2">
                    <p className="text-gray-700 text-sm mb-2">
                      {lotteryData.first.ticket}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      [{lotteryData.first.location}]
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    Agent - {lotteryData.first.agent}
                  </p>
                </div>

                <div>
                  <PageCard
                    label={`Consolation Prize ${lotteryData.prizes.amounts["consolation"]}`}
                    data={lotteryData.prizes.consolation}
                  />
                </div>
                <div>
                  <PageCard
                    label={`2nd Prize ${lotteryData.prizes.amounts["2nd"]}`}
                    data={lotteryData.prizes["2nd"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`3rd Prize ${lotteryData.prizes.amounts["3rd"]}`}
                    data={lotteryData.prizes["3rd"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`4th Prize ${lotteryData.prizes.amounts["4th"]}`}
                    data={lotteryData.prizes["4th"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`5th Prize ${lotteryData.prizes.amounts["5th"]}`}
                    data={lotteryData.prizes["5th"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`6th Prize ${lotteryData.prizes.amounts["6th"]}`}
                    data={lotteryData.prizes["6th"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`7th Prize ${lotteryData.prizes.amounts["7th"]}`}
                    data={lotteryData.prizes["7th"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`8th Prize ${lotteryData.prizes.amounts["8th"]}`}
                    data={lotteryData.prizes["8th"]}
                  />
                </div>
                <div>
                  <PageCard
                    label={`9th Prize ${lotteryData.prizes.amounts["9th"]}`}
                    data={lotteryData.prizes["9th"]}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
