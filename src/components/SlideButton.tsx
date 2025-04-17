import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  target?: string;
  className?: string;
  htmlClassName?: string;
}
export const SlideButton = (props: Props) => {
  const { className, children, ...rest } = props;
  return (
    <button
      className={clsx(
        "absolute z-20 landscape:mx-auto landscape:my-0 text-4xl lg:text-6xl xl:text-7xl text-black rotate-90 landscape:rotate-0  rounded-t-full top-0 left-0 right-0 bottom-0 my-auto h-12 w-24 lg:h-24 lg:w-48 flex items-center justify-center landscape:mb-0 portrait:-ml-6 landscape:mt-auto",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
