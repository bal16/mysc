import { clsx } from "clsx";

interface IndicatorsProps {
  children: React.ReactNode;
}

export const Indicators = ({ children }: IndicatorsProps) => {
  return (
    <div
      className={clsx(
        "absolute bottom-4 left-4 z-40 flex items-center gap-2",
        "animate-in fade-in slide-in-from-bottom-2 duration-300"
      )}
    >
      {children}
    </div>
  );
};
