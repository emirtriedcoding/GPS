export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.original.index + 1,
  },
  {
    accessorKey: "gps_number",
    header: "شماره GPS",
  },
  {
    accessorKey: "driver",
    header: "نام راننده",
    cell: ({ row }) => row.original.driver?.driver_name,
  },
  {
    accessorKey: "battery_percent",
    header: "باطری",
    cell: ({ row }) => <span>%{row.original?.battery_percent}</span>,
  },
];
