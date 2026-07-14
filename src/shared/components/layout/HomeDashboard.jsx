import React, { useState, useEffect } from 'react';
import { HiOutlineMap, HiOutlineDocumentText, HiOutlineChatAlt2, HiOutlineUsers, HiOutlineStar } from "react-icons/hi";
import { axiosAdmin } from '../../../shared/api/api.js';

const StatCard = ({ title, count, icon: Icon, colorClass }) => (
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                const [
                    zonesRes,
                    usersRes,
                    reportsRes,
                    commentsRes,
                    ratingsRes
                ] = await Promise.allSettled([
                    axiosAdmin.get('/zones'),
                    axiosAdmin.get('/users'),
                    axiosAdmin.get('/reports'),
                    axiosAdmin.get('/comments'),
                    axiosAdmin.get('/ratings')
                ]);

                const totalZones = zonesRes.status === 'fulfilled' ? (zonesRes.value.data.length || 0) : 0;

                const totalUsers = usersRes.status === 'fulfilled'
                    ? (usersRes.value.data.users?.length || usersRes.value.data.length || 0)
                    : 0;

                const totalReports = reportsRes.status === 'fulfilled'
                    ? (reportsRes.value.data.reports?.length || reportsRes.value.data.length || 0)
                    : 0;

                const totalComments = commentsRes.status === 'fulfilled'
                    ? (commentsRes.value.data.comments?.length || commentsRes.value.data.length || 0)
                    : 0;

                const totalRatings = ratingsRes.status === 'fulfilled'
                    ? (ratingsRes.value.data.ratings?.length || ratingsRes.value.data.length || 0)
                    : 0;

                setStats({
                    zones: totalZones,
                    users: totalUsers,
                    reports: totalReports,
                    comments: totalComments,
                    ratings: totalRatings
                });

            } catch (error) {
                console.error("Error cargando estadísticas generales:", error);
            } finally {
                setLoading(false);
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
            <div className="mb-8 lg:mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                    PANEL ADMINISTRATIVO
                </h2>
                <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400 italic">
                    Cargando estadísticas de Sekurity...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {cards.map(card => <StatCard key={card.id} {...card} />)}
                </div>
            )}
        </div>
    );
};