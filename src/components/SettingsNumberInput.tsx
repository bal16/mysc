import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { RiEditLine } from "react-icons/ri";

interface SettingsNumberInputProps {
  label: string;
  value: number;
  onSave: (value: number) => void;
}

export const SettingsNumberInput = ({
  label,
  value,
  onSave,
}: SettingsNumberInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState<number | string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value);
    } else {
      // Focus when entering edit mode
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [value, isEditing]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (rawValue === "") {
      setLocalValue("");
      return;
    }

    const nextValue = Number(rawValue);

    if (Number.isNaN(nextValue)) {
      return;
    }

    setLocalValue(Math.min(100, Math.max(0, nextValue)));
  };

  const handleSave = () => {
    if (isEditing) {
      const finalValue = localValue === "" ? 0 : Number(localValue);
      onSave(finalValue);
      setLocalValue(finalValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur(); // Triggers handleSave via onBlur
    } else if (e.key === "Escape") {
      setLocalValue(value); // Revert on escape
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-1">
      <label 
        onClick={() => setIsEditing(true)}
        className="text-foreground font-medium cursor-pointer select-none"
      >
        {label}
      </label>
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          min={0}
          max={100}
          step={1}
          value={localValue}
          onChange={handleChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={clsx(
            "w-24 bg-surface text-foreground text-center border-b-2 border-primary outline-none",
            "px-2 py-1 font-semibold focus:ring-0 transition-all",
            "animate-in fade-in zoom-in-95 duration-150"
          )}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className={clsx(
            "group flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all",
            "hover:bg-muted active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20",
            "border border-transparent hover:border-border/50"
          )}
          aria-label={`Edit ${label}`}
        >
          <span className="font-semibold text-lg">{value}</span>
          <RiEditLine className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
        </button>
      )}
    </div>
  );
};
