import { useUserStore } from "../store/useUserStore.js";

export const useUserActions = () => {
    const toggleStatusAction = useUserStore((state) => state.toggleUserStatus);

    const handleToggleStatus = async (userId) => {
        if (!userId) return;

        try {
            await toggleStatusAction(userId);
        } catch (error) {
            console.error("Error en useUserActions:", error);
            throw error;
        }
    };

    return { handleToggleStatus };
};