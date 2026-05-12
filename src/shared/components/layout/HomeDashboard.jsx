import React, { useState, useEffect } from 'react';
import { HiOutlineMap, HiOutlineDocumentText, HiOutlineChatAlt2, HiOutlineUsers, HiOutlineStar } from "react-icons/hi";
import axios from 'axios';

const StatCard = ({ title, count, icon: Icon, colorClass }) => (
    /* Ajuste de p-4 en móvil para ahorrar espacio */
    <div className="bg-white p-5 lg:p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4 lg:gap-5 transition-all hover:shadow-md hover:scale-[1.02]">
        <div className={`p-3 lg:p-4 rounded-2xl ${colorClass}`}>
            <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
        </div>
        <div>
            <p className="text-gray-400 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.15em] mb-1">{title}</p>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{count}</h3>
        </div>
    </div>
);

export const HomeDashboard = () => {
    const [stats, setStats] = useState({
        zones: 0, reports: 0, comments: 0, users: 0, ratings: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:3005/sekurity/v1/zones');
                const totalZones = response.data.length;

                setStats(prev => ({
                    ...prev,
                    zones: totalZones
                }));
            } catch (error) {
                console.error("Error cargando estadísticas:", error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { id: 1, title: "Zonas", count: stats.zones, icon: HiOutlineMap, colorClass: "bg-blue-50 text-blue-600" },
        { id: 2, title: "Reportes", count: stats.reports, icon: HiOutlineDocumentText, colorClass: "bg-red-50 text-red-600" },
        { id: 3, title: "Comentarios", count: stats.comments, icon: HiOutlineChatAlt2, colorClass: "bg-amber-50 text-amber-600" },
        { id: 4, title: "Usuarios", count: stats.users, icon: HiOutlineUsers, colorClass: "bg-purple-50 text-purple-600" },
        { id: 5, title: "Calificaciones", count: stats.ratings, icon: HiOutlineStar, colorClass: "bg-emerald-50 text-emerald-600" },
    ];

    return (
        <div className="animate-fadeIn">
            {/* Título responsivo: text-2xl en móvil, text-3xl en escritorio */}
            <div className="mb-8 lg:mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                    PANEL ADMINISTRATIVO
                </h2>
                <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
            </div>

            {/* 
                Grid Inteligente: 
                - 1 columna en móvil.
                - 2 columnas en tablets (sm).
                - 3 columnas en laptops (lg).
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {cards.map(card => <StatCard key={card.id} {...card} />)}
            </div>
        </div>
    );
};