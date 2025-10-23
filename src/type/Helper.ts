export type CountTypes = {
  even: number;
  odd: number;
  prime: number;
};

export type InputKeys =
  | "whole"
  | "firstDigit"
  | "secondDigit"
  | "thirdDigit"
  | "fourthDigit"
  | "firstTwoDigit"
  | "lastTwoDigit"
  | "firstThreeDigit"
  | "lastThreeDigit"
  | "secondThreeDigit"
  | "total";

export type InputType = Record<InputKeys, CountTypes>;

export type TSumOfNumbers = {
  even: number;
  odd: number;
  prime: number;
};

export type MaxEntry = {
  key: string;
  type: keyof CountTypes;
  count: number;
  values: CountTypes;
};
