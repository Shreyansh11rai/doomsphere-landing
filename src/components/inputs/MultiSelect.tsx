"use client";
import Select from "react-select";
import FieldError from "./FiledError";

interface OptionItem<T> {
  id: T;
  name: string;
}

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps<T extends string | number> {
  label: string;
  isLoading: boolean;
  isError: boolean;
  optionsArray: OptionItem<T>[] | undefined;
  value: T[];
  onChange: (selectedIds: T[]) => void;
  placeholder?: string;
  errorMessage?: string;
}

export default function MultiSelect<T extends string | number>({
  label,
  isLoading,
  isError,
  optionsArray,
  value,
  onChange,
  placeholder = "Choose options...",
  errorMessage,
}: MultiSelectProps<T>) {
  const options: Option[] = optionsArray
    ? optionsArray.map((item) => ({
        value: String(item.id),
        label: item.name,
      }))
    : [];

  const selectedOptions = options.filter((opt) =>
    value?.some((v) => String(v) === opt.value),
  );

  function handleChange(selected: readonly Option[]) {
    const selectedIds = selected.map((opt) => {
      const match = optionsArray?.find((item) => String(item.id) === opt.value);
      return match!.id;
    });
    onChange(selectedIds);
  }

  return (
    <label className="block text-sm text-muted">
      <span className="mb-2 block font-semibold text-foreground">{label}</span>
      <Select
        isMulti
        isLoading={isLoading}
        isDisabled={isLoading || isError}
        classNames={{
          menuList: () => "ui-input p-0 rounded-none bg-surface/50",
          menu: () =>
            "bg-background border border-border rounded-md mt-1 p-0 bg-zinc-500",
          option: ({ isFocused, isSelected }) =>
            `px-3 py-2 cursor-pointer bg-zinc-500 ${isSelected ? "bg-primary text-white" : isFocused ? "bg-muted" : ""}`,
          multiValue: () => "bg-muted rounded px-1 mr-1 bg-zinc-500",
        }}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <FieldError message={errorMessage} />
    </label>
  );
}
