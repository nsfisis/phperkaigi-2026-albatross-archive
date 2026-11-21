import { BASE_PATH } from "../config";

type Props = {
  iconPath: string;
  displayName: string;
  className: string;
};

export default function UserIcon({ iconPath, displayName, className }: Props) {
  return (
    <img
      src={`${BASE_PATH}${iconPath}`}
      alt={`${displayName} のアイコン`}
      className={`rounded-full border-4 border-white ${className}`}
    />
  );
}
