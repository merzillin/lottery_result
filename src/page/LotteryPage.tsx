/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { downloadFile, generateLastNDates } from "../utils/helper";
import { PageCard } from "../components/PrizeCard";
import type { TLottery } from "../type/HomePage";
import { useDispatch } from "react-redux";
import { addLottery } from "../store/slice/Dashboard";

type TMessage = { message: string };

export default function LotteryPage() {
  const [lotteryData, setLotteryData] = useState<TLottery | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [messages, setMessage] = useState<TMessage[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const checkLotteryNumber = (
    number: string,
    data: { lottery_number: string }[],
    trim: boolean = false
  ) => {
    if (trim) return data.some((item) => item.lottery_number === number);
    else return data.some((item) => item.lottery_number.slice(-4) === number);
  };

  const handleSet = () => {
    if (!lotteryData) return;
    dispatch(addLottery(lotteryData));
  };

  const handleDownload = () => {
    if (!lotteryData) return;
    const { lottery_code, lottery_name, draw_date } = lotteryData;
    const name = lottery_code + lottery_name + draw_date;
    downloadFile({
      data: JSON.stringify(lotteryData),
      fileName: name,
      fileType: "json",
    });
  };

  const handleSearch = () => {
    if (!lotteryData) return;

    const message: TMessage[] = [];

    const PrizeType = [
      "first",
      "consolation",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
    ] as const;

    for (const type of PrizeType) {
      switch (type) {
        case "first":
          if (checkLotteryNumber(number, lotteryData.first.lottery, true)) {
            message.push({ message: `First Prize for ${number}` });
          }
          break;
        case "consolation":
          if (
            checkLotteryNumber(number, lotteryData.consolation.lottery, true)
          ) {
            message.push({ message: `Consolation Prize for ${number}` });
          }
          break;
        case "second":
          if (checkLotteryNumber(number, lotteryData.second.lottery, true)) {
            message.push({ message: `2nd Prize for ${number}` });
          }
          break;
        case "third":
          if (checkLotteryNumber(number, lotteryData.third.lottery, true)) {
            message.push({ message: `3rd Prize for ${number}` });
          }
          break;
        case "fourth":
          if (
            checkLotteryNumber(number.slice(-4), lotteryData.fourth.lottery)
          ) {
            message.push({ message: `4th Prize for ${number}` });
          }
          break;
        case "fifth":
          if (checkLotteryNumber(number.slice(-4), lotteryData.fifth.lottery)) {
            message.push({ message: `5th Prize for ${number}` });
          }
          break;
        case "sixth":
          if (checkLotteryNumber(number.slice(-4), lotteryData.sixth.lottery)) {
            message.push({ message: `6th Prize for ${number}` });
          }
          break;
        case "seventh":
          if (
            checkLotteryNumber(number.slice(-4), lotteryData.seventh.lottery)
          ) {
            message.push({ message: `7th Prize for ${number}` });
          }
          break;
        case "eighth":
          if (
            checkLotteryNumber(number.slice(-4), lotteryData.eighth.lottery)
          ) {
            message.push({ message: `8th Prize for ${number}` });
          }
          break;
        case "ninth":
          if (checkLotteryNumber(number.slice(-4), lotteryData.ninth.lottery)) {
            message.push({ message: `9th Prize for ${number}` });
          }
          break;
      }
    }

    if (message.length === 0) {
      message.push({ message: `No Prize for ${number}` });
    }

    setMessage(message);
  };

  const handleChange = (input: string) => {
    setNumber(input);
  };

  const fetchLotteryData = async (date: string) => {
    try {
      setLoading(true);
      setNumber("");
      setMessage([]);
      const response = await fetch(
        `https://indialotteryapi.com/wp-json/klr/v1/by-date?date=${date}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const formattedLotteryData: TLottery = {
        lottery_name: data.draw_name,
        lottery_code: data.draw_code,
        draw_date: data.draw_date,
        first: {
          count: 1,
          prize: data.prizes.amounts["1st"],
          lottery: [
            {
              lottery_number: data.first.ticket,
              agent_code: data.first.agency_code,
              agent_name: data.first.agent,
              location: data.first.location,
            },
          ],
        },
        consolation: {
          count: data.prizes.consolation.length,
          prize: data.prizes.amounts["consolation"],
          lottery: data.prizes.consolation.map((item: string) => ({
            lottery_number: item,
          })),
        },
        second: {
          count: data.prizes["2nd"].length,
          prize: data.prizes.amounts["2nd"],
          lottery: data.prizes["2nd"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        third: {
          count: data.prizes["3rd"].length,
          prize: data.prizes.amounts["3rd"],
          lottery: data.prizes["3rd"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        fourth: {
          count: data.prizes["4th"].length,
          prize: data.prizes.amounts["4th"],
          lottery: data.prizes["4th"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        fifth: {
          count: data.prizes["5th"].length,
          prize: data.prizes.amounts["5th"],
          lottery: data.prizes["5th"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        sixth: {
          count: data.prizes["6th"].length,
          prize: data.prizes.amounts["6th"],
          lottery: data.prizes["6th"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        seventh: {
          count: data.prizes["7th"].length,
          prize: data.prizes.amounts["7th"],
          lottery: data.prizes["7th"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        eighth: {
          count: data.prizes["8th"].length,
          prize: data.prizes.amounts["8th"],
          lottery: data.prizes["8th"].map((item: string) => ({
            lottery_number: item,
          })),
        },
        ninth: {
          count: data.prizes["9th"].length,
          prize: data.prizes.amounts["9th"],
          lottery: data.prizes["9th"].map((item: string) => ({
            lottery_number: item,
          })),
        },
      };

      setLotteryData(formattedLotteryData);
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
    setDates(generateLastNDates(20));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  //console.log("lotteryData", lotteryData);

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 mt-10">
        <h2 className="text-xl font-semibold text-black">Lottery Results</h2>
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
                  onChange={(e) => handleChange(e.target.value)}
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
                  {lotteryData.lottery_name + " " + [lotteryData.lottery_code]}
                </div>
                <div>
                  {messages.map((item: { message: string }, index) => (
                    <p key={index} className="text-green-400">
                      {item.message}
                    </p>
                  ))}
                </div>
                <div className="flex justify-around">
                  <button
                    className="border rounded border-black px-1"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <button
                    className="border rounded  border-gray-700 px-1"
                    onClick={handleSet}
                  >
                    Add to Dashboard
                  </button>
                </div>
              </div>

              <div className="">
                <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto my-4">
                  <div className="text-lg font-semibold mb-4">
                    1st Prize -{lotteryData.first.prize}
                  </div>
                  <hr className="border-t-2 border-gray-300 my-4" />
                  <div className="flex flex-row flex-wrap space-x-2">
                    <p className="text-gray-700 text-sm mb-2">
                      {lotteryData.first.lottery[0].lottery_number}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      [{lotteryData.first.lottery[0].location}]
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    Agent - {lotteryData.first.lottery[0].agent_name}
                  </p>
                </div>

                <div>
                  <PageCard
                    label={`Consolation Prize ${lotteryData.consolation.prize}`}
                    data={lotteryData.consolation.lottery}
                    count={lotteryData.consolation.count}
                  />
                </div>
                <div>
                  <PageCard
                    label={`2nd Prize ${lotteryData.second.prize}`}
                    data={lotteryData.second.lottery}
                  />
                </div>
                <div>
                  <PageCard
                    label={`3rd Prize ${lotteryData.third.prize}`}
                    data={lotteryData.third.lottery}
                  />
                </div>
                <div>
                  <PageCard
                    label={`4th Prize ${lotteryData.fourth.prize}`}
                    data={lotteryData.fourth.lottery}
                    count={lotteryData.fourth.count}
                  />
                </div>
                <div>
                  <PageCard
                    label={`5th Prize ${lotteryData.fifth.prize}`}
                    data={lotteryData.fifth.lottery}
                    count={lotteryData.fifth.count}
                  />
                </div>
                <div>
                  <PageCard
                    label={`6th Prize ${lotteryData.sixth.prize}`}
                    data={lotteryData.sixth.lottery}
                    count={lotteryData.sixth.count}
                  />
                </div>
                <div>
                  <PageCard
                    label={`7th Prize ${lotteryData.seventh.prize}`}
                    data={lotteryData.seventh.lottery}
                    count={lotteryData.seventh.count}
                  />
                </div>
                <div>
                  <PageCard
                    label={`8th Prize ${lotteryData.eighth.prize}`}
                    data={lotteryData.eighth.lottery}
                    count={lotteryData.eighth.count}
                  />
                </div>
                <div>
                  <PageCard
                    label={`9th Prize ${lotteryData.ninth.prize}`}
                    data={lotteryData.ninth.lottery}
                    count={lotteryData.ninth.count}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
