import { Button } from "@material-tailwind/react";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <Button variant="outlined" size="sm" color="red">
        Log Out
      </Button>
    </div>
  );
}
