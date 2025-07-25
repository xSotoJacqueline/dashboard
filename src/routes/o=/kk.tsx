export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-lg font-bold">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {/* Content goes here */}
      </main>
    </div>
  );
}