interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  value?: number;
}
export const DeButton = (props: Props) => {
  const { value = 1 } = props;
  return (
    <div className="relative z-20">
      <button
        className="group absolute inline-block focus:outline-none focus:ring"
        {...props}
      >
        <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 rounded-full"></span>
        <span className="rounded-full relative inline-block border-2 border-slate-50 px-8 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 ">
          -{value}
        </span>
      </button>
    </div>
  );
};
