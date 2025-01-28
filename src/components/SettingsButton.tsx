import { GoGear } from "react-icons/go";
import { SlideButton } from "./SlideButton";

export const SettingsButton = () => {
  return (
    <SlideButton target="/settings" className="bg-yellow-300">
      <GoGear />
    </SlideButton>
  );
};
