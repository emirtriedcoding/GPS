export const columns = [
  {
    accessorKey: "index",
    header: "",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "gps_number",
    header: "شماره GPS",
  },
  {
    accessorKey: "serial_number",
    header: "شماره سریال",
  },
  {
    accessorKey: "battery_percent",
    header: "باطری",
    cell: ({ row }) => <span>%{row.original.battery_percent}</span>,
  },
  {
    accessorKey: "position",
    header: "موقعیت",
    cell: ({ row }) => {
      return (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${row.original.latitude},${row.original.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-blue-500 underline"
        >
          مشاهده
        </a>
      );
    },
  },
  {
    accessorKey: "driver",
    header: "راننده فعلی",
    cell: ({ row }) => row?.original?.driver?.driver_name || "نامشخص",
  },
];
