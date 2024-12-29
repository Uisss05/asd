import Sidebar from "../Components/sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-100">{children}</div>
    </div>
  );
}
