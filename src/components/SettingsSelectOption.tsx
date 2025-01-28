export const SettingsSelectOption = (
  props: React.OptionHTMLAttributes<HTMLOptionElement>
) => {
  return (
    <option value={props.value} {...props} className="text-slate-900">
      {props.value}
    </option>
  );
};
