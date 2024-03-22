"use client";
import React from "react";
import CardMenu from "@/components/dash_components/card";
import Card from "@/components/dash_components/card";
import { FaRegEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

type RowObj = {
  brand: string;
  model: string;
  image: string;
  matricule: string;
  num_of_res: number;
  status: string;
  id: string;
};

function CarsTable(props: { tableData: any; tabletitle: any }) {
  const { tableData, tabletitle } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("image", {
      id: "image",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">IMAGE</p>
      ),
      cell: (info: any) => (
        // <p className="text-sm uppercase flex items-center font-bold text-navy-700 dark:text-white">
        //   {info.getValue()}
        // </p>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${info.getValue()}`}
          alt="Car"
          width={80}
          height={80}
        />
      ),
    }),
    columnHelper.accessor("model", {
      id: "model",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">MODEL</p>
      ),
      cell: (info: any) => (
        <p className="text-sm uppercase flex items-center font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("brand", {
      id: "brand",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">BRAND</p>
      ),
      cell: (info) => (
        <p className="text-sm uppercase font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("matricule", {
      id: "matricule",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CAR PLATE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm uppercase font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("num_of_res", {
      id: "num_of_res",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          N RESERVATIONS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white ">SHOW</p>
      ),
      cell: (info) => (
        <Link href={`/dashboard/cars/${info.getValue()}`}>
          <IoEyeOutline className="text-1xl" />
        </Link>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {tabletitle}
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CarsTable;
const columnHelper = createColumnHelper<RowObj>();
