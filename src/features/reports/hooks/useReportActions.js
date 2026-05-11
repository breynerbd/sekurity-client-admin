import { useReportStore } from "../store/useReportStore.js";

export const useReportActions = () => {
    const { deleteReport, updateReport, getReports } = useReportStore();

    const removeReport = async (reportId) => {
        if (!reportId) return;
        await deleteReport(reportId);
    };

    const changeStatus = async (reportId, newStatus) => {
        await updateReport(reportId, { status: newStatus });
    };

    return {
        removeReport,
        changeStatus,
        refreshReports: getReports
    };
};