export const SettingsSelectOption = (
  props: React.OptionHTMLAttributes<HTMLOptionElement>
) => {
  const { children, value, ...rest } = props;
  return (
    <option value={value} {...rest} className="text-foreground bg-surface">
      {children ?? value}
    </option>
  );
};
