import type React from "react";

type Props = {
  headers: React.ReactNode[];
  children: React.ReactNode;
};

export default function DataTable({ headers, children }: Props) {
  return (
    <div className="overflow-x-auto border-2 border-brand-600 rounded-xl">
      <table className="min-w-full divide-y divide-gray-400 border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">{children}</tbody>
      </table>
    </div>
  );
}

export function DataTableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{children}</td>
  );
}

// Formats in JST so that the prerendered HTML does not depend on the timezone.
export function formatUnixTimestamp(timestamp: number): string {
  const date = new Date((timestamp + 9 * 60 * 60) * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
