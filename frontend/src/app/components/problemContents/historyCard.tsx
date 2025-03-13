"use client";

import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ISubmissionDetails } from "@/lib/types";

// Sample data
const submissions: Partial<ISubmissionDetails>[] = [
  {
    submissionId: "123456",
    language: "C++",
    submittedAt: "2025-03-12 14:30",
    verdict: "Accepted",
    passedTest: 10,
    totalTest: 10,
    time: 1.2,
    memory: 256,
  },
  {
    submissionId: "123457",
    language: "Python",
    submittedAt: "2025-03-12 14:35",
    verdict: "Wrong Answer",
    passedTest: 7,
    totalTest: 10,
    time: 1.8,
    memory: 300,
  },
  {
    submissionId: "123458",
    language: "Java",
    submittedAt: "2025-03-12 14:40",
    verdict: "Time Limit Exceeded",
    passedTest: 5,
    totalTest: 10,
    time: 5.0,
    memory: 512,
  },
];

// Define table columns
const columns: ColumnDef<Partial<ISubmissionDetails>>[] = [
  {
    accessorKey: "submissionId",
    header: "Submission ID",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
  },
  {
    accessorKey: "verdict",
    header: "Verdict",
    cell: ({ row }) => {
      const verdict = row.getValue("verdict") as string;
      let color = "text-gray-700";

      if (verdict === "Accepted") color = "text-green-500";
      else if (verdict === "Wrong Answer") color = "text-red-500";
      else if (verdict === "Time Limit Exceeded") color = "text-yellow-500";

      return <span className={`${color} font-semibold`}>{verdict}</span>;
    },
  },
  {
    accessorKey: "totalPassed",
    header: "Passed / Total Tests",
    cell: ({ row }) => {
      const { passedTest, totalTest } = row.original;
      return (
        <span>
          {passedTest} / {totalTest}
        </span>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "memory",
    header: "Memory",
  },
];

const SubmissionTable: React.FC = () => {
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 mt-8 bg-white dark:bg-gray-900 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Submission History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 dark:border-gray-700">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200 dark:bg-gray-800">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-gray-900 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
