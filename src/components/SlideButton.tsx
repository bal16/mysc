// import { Link } from "react-router";

type Props = {
  children: React.ReactNode;
  target: string;
  className?: string;
};
export const SlideButton = ({ children, target, className = "" }: Props) => {
  return (
    <a
      href={target}
      className={
        "absolute z-20 lg:mx-auto lg:my-0 text-4xl lg:text-6xl xl:text-7xl text-slate-800 py-5 px-5 rotate-90 lg:rotate-0  rounded-t-full top-0 left-0 right-0 bottom-0 my-auto size-20  lg:size-28 xl:size-32 flex items-center justify-center lg:mb-0 lg:mt-auto" +
        ` ${className}`
      }
    >
      {children}
    </a>
  );
};
