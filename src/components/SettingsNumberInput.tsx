export const SettingsNumberInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      type="number"
      className="w-full border border-slate-600 py-1 px-2 rounded-md lg:max-w-52"
      {...props}
    />
  );
};
