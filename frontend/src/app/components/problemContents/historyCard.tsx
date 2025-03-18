"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ISubmission } from "@/lib/types";
import dayjs from "dayjs";
import axios from "axios";
import { getVerdictColor, getVerdictLabel } from "@/lib/utility_functions";


// Define table columns
const columns: ColumnDef<Partial<ISubmission>>[] = [
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
    cell : ({row}) => {
      const curtime = row.getValue('submittedAt') as Date;
      const [formattedDate, setFormattedDate] = useState<string | null>(null);

      useEffect(()=>{
        setFormattedDate(dayjs(curtime).format("YYYY-MM-DD HH:mm:ss"));
      }, [curtime]);

      if(!formattedDate) return <span> loading... </span>

      return <span> {formattedDate} </span>
    }
  },
  {
    accessorKey: "verdict",
    header: "Verdict",
    cell: ({ row }) => {
      const verdict = row.getValue("verdict") as string;
      let color = getVerdictColor(verdict);
      let label = getVerdictLabel(verdict);

      return <span className={`${color} font-semibold`}>{label}</span>;
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
    header: "Time(MS)",
  },
  {
    accessorKey: "memory",
    header: "Memory(KB)",
  },
];

const SubmissionTable  = ({problemId} : {problemId:string}) => {
  const [submissions, setSubmissions] = useState<Partial<ISubmission>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // if(submissions.length == 0 && loading == false) return <p className="m-12 p-12"> No Submission </p>

  useEffect(()=>{
    setLoading(true);
    const fetchSubmissions = async() => {
      try {
        const res = await axios.get(`http://localhost:3000/api/submissions/${problemId}`);
        const subs : ISubmission[] = res.data.submissions;
        const newsubs : Partial<ISubmission>[] = subs.map(({
          submissionId,
          language,
          submittedAt,
          verdict,
          passedTest,
          totalTest,
          time,
          memory
        }) => ({
          submissionId,
          language,
          submittedAt,
          verdict,
          passedTest,
          totalTest,
          time,
          memory
        }));

        setSubmissions((_)=>[...newsubs]);
      } catch(e){
        console.log("error", e);
      }
    }
    fetchSubmissions();
    setLoading(false);
  }, [problemId]);

  return (
    <div className="p-4 mt-8 bg-white dark:bg-gray-900 rounded-md shadow-md">
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
