// helper.ts

import type {
  CountTypes,
  InputType,
  MaxEntry,
  TSumOfNumbers,
} from "../type/Helper";

export function analyzeNumbers(numbers: string[]) {
  let even = 0;
  let odd = 0;
  let prime = 0;

  for (const str of numbers) {
    const num = parseInt(str, 10);
    if (isNaN(num)) continue;

    if (num % 2 === 0) {
      even++;
    } else {
      odd++;
    }

    if (isPrime(num)) {
      prime++;
    }
  }

  return { even, odd, prime };
}

export const sumOfNumbers = (numbers: string[]) => {
  const output: Record<string, TSumOfNumbers> = {};

  output["whole"] = analyzeNumbers(numbers);
  output["firstDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(0)));
  output["secondDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(1)));
  output["thirdDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(2)));
  output["fourthDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(3)));

  output["firstTwoDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(0, 2))
  );
  output["lastTwoDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(2, 4))
  );

  output["firstThreeDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(0, 3))
  );
  output["lastThreeDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(1, 4))
  );

  output["secondThreeDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(1, 3))
  );

  const total = Object.values(output).reduce(
    (acc, curr) => {
      acc.even += curr.even;
      acc.odd += curr.odd;
      acc.prime += curr.prime;
      return acc;
    },
    { even: 0, odd: 0, prime: 0 } as TSumOfNumbers
  );
  output["total"] = total;

  return output;
};

export const totalCount = (input: InputType): CountTypes => {
  const result: CountTypes = { even: 0, odd: 0, prime: 0 };

  for (const key in input) {
    if (key === "total") continue;

    const counts = input[key as keyof InputType]; // Cast key properly

    const maxValue = Math.max(counts.even, counts.odd, counts.prime);

    for (const type of ["even", "odd", "prime"] as const) {
      if (counts[type] === maxValue) {
        result[type]++;
      }
    }
  }

  return result;
};

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export function filteredNum(
  input: string[],
  type: "even" | "odd" | "prime"
): string[] {
  return input.filter((str) => {
    const num = parseInt(str, 10);

    switch (type) {
      case "even":
        return num % 2 === 0;
      case "odd":
        return num % 2 !== 0;
      case "prime":
        return isPrime(num);
      default:
        return false;
    }
  });
}

export const countFilteredNumber = (numbers: string[]) => {
  const output: Record<string, TSumOfNumbers> = {};
  output["firstDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(0)));
  output["secondDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(1)));
  output["thirdDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(2)));
  output["fourthDigit"] = analyzeNumbers(numbers.map((item) => item.charAt(3)));

  output["firstTwoDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(0, 2))
  );
  output["lastTwoDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(2, 4))
  );

  output["firstThreeDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(0, 3))
  );
  output["lastThreeDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(1, 4))
  );

  output["secondThreeDigit"] = analyzeNumbers(
    numbers.map((num) => num.slice(1, 3))
  );

  const total = Object.values(output).reduce(
    (acc, curr) => {
      acc.even += curr.even;
      acc.odd += curr.odd;
      acc.prime += curr.prime;
      return acc;
    },
    { even: 0, odd: 0, prime: 0 } as TSumOfNumbers
  );
  output["total"] = total;
  return output;
};

export function findAllMaxCounts(
  data: Record<string, TSumOfNumbers>
): MaxEntry[] {
  let maxCount = -1;

  // First pass: find max count
  for (const [, counts] of Object.entries(data)) {
    for (const type of ["even", "odd", "prime"] as const) {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
      }
    }
  }

  const result: MaxEntry[] = [];

  // Second pass: collect all entries with that max count
  for (const [key, counts] of Object.entries(data)) {
    for (const type of ["even", "odd", "prime"] as const) {
      if (counts[type] === maxCount) {
        result.push({
          key,
          type,
          count: counts[type],
          values: counts,
        });
      }
    }
  }

  return result;
}

export function getResultByPrize(input: { lottery_number: string }[]) {
  const numbers: string[] = input.map((item) => item.lottery_number);
  const num = analyzeNumbers(numbers);
  const max = Math.max(num.even, num.odd, num.prime);
  const result: string[] = [];

  if (num.even === max) {
    result.push("even");
  }
  if (num.odd === max) {
    result.push("odd");
  }
  if (num.prime === max) {
    result.push("prime");
  }
  const output = [];
  for (const type of result) {
    const result = [];
    switch (type) {
      case "even": {
        const filteredEvenNumbers = filteredNum(numbers, type);
        const eventOutput = countFilteredNumber(filteredEvenNumbers);
        delete eventOutput["total"];
        const evenData = findAllMaxCounts(eventOutput);
        result.push([...evenData]);
        break;
      }
      case "odd": {
        const filteredOddNumbers = filteredNum(numbers, type);
        const oddOutput = countFilteredNumber(filteredOddNumbers);
        delete oddOutput["total"];
        const oddData = findAllMaxCounts(oddOutput);
        result.push([...oddData]);
        break;
      }
      case "prime": {
        const filteredPrimeNumbers = filteredNum(numbers, type);
        const primeOutput = countFilteredNumber(filteredPrimeNumbers);
        delete primeOutput["total"];
        const primeData = findAllMaxCounts(primeOutput);
        result.push([...primeData]);
        break;
      }
      default: {
        console.error(type);
        break;
      }
    }
    output.push({ type: type, result: result });
  }
  return output;
}

export function getRangeCount(input?: string[]) {
  const ranges = [
    "0-1000",
    "1000-2000",
    "2000-3000",
    "3000-4000",
    "4000-5000",
    "5000-6000",
    "6000-7000",
    "7000-8000",
    "8000-9000",
    "9000-10000",
  ];

  // initialize output array
  const output = ranges.map((label) => ({ label, value: 0 }));

  if (!input) return output;

  for (const n of input) {
    const value = parseInt(n, 10);

    for (const rangeObj of output) {
      const [min, max] = rangeObj.label.split("-").map(Number);
      if (value >= min && value < max) {
        rangeObj.value++;
        break;
      }
    }
  }

  return output;
}
