import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 ml-64 p-4 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
};
