export const Sidebar = ({ activeTab, setActiveTab }) => {
    const items = [
        { id: "dashboard", label: "Dashboard" },
        { id: "reports", label: "Reportes" },
        { id: "comments", label: "Comentarios" },
        { id: "users", label: "Usuarios" },
        { id: "zones", label: "Zonas" },
        { id: "ratings", label: "Calificaciones" },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] p-4">
            <ul className="space-y-1">
                {items.map((item) => {
                    const isActive = activeTab === item.id;

                    return (
                        <li key={item.id}>
                            <div
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    group flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer
                                    ${isActive
                                        ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-50"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                                `}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all ${isActive ? "bg-blue-600 scale-100" : "bg-transparent scale-0"
                                    }`}></span>
                                {item.label}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};