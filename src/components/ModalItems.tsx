import clsx from "clsx";

type Props = {
  title: string;
  disabled?: boolean;
  children?: React.ReactNode;
};
export const ModalItem = ({ title, disabled, children }: Props) => {
  disabled = disabled || false;
  return (
    <section className={clsx(disabled ? "text-gray-400": "text-gray-300",disabled && "cursor-not-allowed")}>
      <h4 className="font-medium sm:text-lg mb-1">
        <span className={clsx(!disabled && "hover:underline")}>{title}</span>
      </h4>
      {disabled && (
        <p className="line-clamp-2 text-sm">
          This setting is will available soon
        </p>
      )}
      {children}
    </section>
  );
};
