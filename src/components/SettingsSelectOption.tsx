export const SettingsSelectOption = (
  props: React.OptionHTMLAttributes<HTMLOptionElement>
) => {
  return (
    <option value={props.value} {...props} className="text-foreground">
      {props.value}
    </option>
  );
};
