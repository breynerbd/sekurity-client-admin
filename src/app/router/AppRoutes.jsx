import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layout/DashboardPage.jsx";

// Importaciones de Features (Sekurity)
import { Comments } from "../../features/comments/components/Comments.jsx";
import { Ratings } from "../../features/ratings/components/Ratings.jsx";
import { Reports } from "../../features/reports/components/Reports.jsx";
import { Users } from "../../features/users/components/Users.jsx";
import { Zones } from "../../features/zones/components/Zones.jsx";

// Asumiendo que sigues la estructura de modales/formularios para creación
import { UserModal } from "../../features/users/components/UserModal.jsx";
import { ZoneModal } from "../../features/zones/components/ZoneModal.jsx";
import { ReportModal } from "../../features/reports/components/ReportModal.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Públicas */}
            <Route path="/" element={<AuthPage />} />

            {/* Dashboard y Rutas Protegidas */}
            <Route path="/dashboard/*" element={<DashboardPage />}>

                {/* Users */}
                <Route path="users" element={<Users />} />
                <Route path="users/create" element={<UserModal />} />

                {/* Zones */}
                <Route path="zones" element={<Zones />} />
                <Route path="zones/create" element={<ZoneModal />} />

                {/* Reports */}
                <Route path="reports" element={<Reports />} />
                <Route path="reports/create" element={<ReportModal />} />

                {/* Comments & Ratings */}
                <Route path="comments" element={<Comments />} />
                <Route path="ratings" element={<Ratings />} />

            </Route>

            {/* 404 */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
};