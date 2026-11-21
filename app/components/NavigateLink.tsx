import { BASE_PATH } from "../config";

export default function NavigateLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`${BASE_PATH}${to.replace(/^\//, "")}`}
      className="text-lg text-white bg-brand-600 px-4 py-2 border-2 border-brand-50 rounded-sm transition duration-300 hover:bg-brand-500 focus:ring-3 focus:ring-brand-400 focus:outline-hidden"
    >
      {children}
    </a>
  );
}
