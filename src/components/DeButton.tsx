import { IoChevronDownCircleOutline } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  value?: number;
}
export const DeButton = (props: Props) => {
  return (
    <button
      className="group absolute inline-block focus:outline-none focus:ring mr-48 lg:mr-80 xl:mr-96 md:mr-72"
      {...props}
    >
      <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 rounded-full"></span>
      <span className="rounded-full relative inline-block border-2 border-slate-50 px-3 py-3 text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-widest text-slate-900 ">
        <IoChevronDownCircleOutline />
      </span>
    </button>
  );
};
