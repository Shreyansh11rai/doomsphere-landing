import { ICON_LIBRARY, type IconName } from "@/data/icons_data";

interface IconCompProps {
  className?: string;
  name: IconName;
}

/** Central icon renderer used across cards, navigation, and section headers. */
export function IconComp({ className, name }: IconCompProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {ICON_LIBRARY[name]}
    </svg>
  );
}
