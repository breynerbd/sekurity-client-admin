import { useZoneStore } from "../store/useZoneStore.js";

export const useZoneActions = () => {
    const createZoneAction = useZoneStore((state) => state.createZone);
    const deleteZoneAction = useZoneStore((state) => state.deleteZone);

    const addZone = async (data) => {
        try {
            return await createZoneAction(data);
        } catch (error) {
            console.error("Error en addZone:", error);
            throw error;
        }
    };

    const removeZone = async (id) => {
        try {
            await deleteZoneAction(id);
        } catch (error) {
            console.error("Error en removeZone:", error);
            throw error;
        }
    };

    return { addZone, removeZone };
};