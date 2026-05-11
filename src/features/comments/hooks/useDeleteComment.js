import { useCommentStore } from "../store/useCommentStore.js";

export const useDeleteComment = () => {
    const deleteCommentAction = useCommentStore((state) => state.deleteComment);

    const removeComment = async (commentId) => {
        if (!commentId) return;

        try {
            await deleteCommentAction(commentId);
        } catch (error) {
            console.error("Error en useDeleteComment:", error);
            throw error; // Re-lanzamos para que el componente maneje el Toast
        }
    };

    return { removeComment };
};