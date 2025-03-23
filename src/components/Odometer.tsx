import { useEffect, useState } from "react";

type Props = {
  value: number;
  digit?: number;
};

const Digit = ({ value }: Props) => {
  const [, setPreviousValue] = useState(value);

  useEffect(() => {
    setPreviousValue(value);
  }, [value]);

  return (
    <div className=" mb-3 overflow-hidden h-[1em]  relative ">
      <div
        className="relative transition-all duration-500 ease-in-out"
        style={{ top: `-${value}em` }}
      >
        {[...Array(10).keys()].map((i) => (
          <div
            key={i}
            className="after:absolute after:content-[''] after:top-[-1em] h-[1em] select-none"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Odometer = ({ value, digit }: Props) => {
  const digits = String(value).padStart(digit!, "0").split("").map(Number);

  return (
    <div className="w-full px-4 flex justify-center text-right text-8xl md:text-[14rem]">
      {digits.map((digit, i) => (
        <Digit key={i} value={digit} />
      ))}
    </div>
  );
};
