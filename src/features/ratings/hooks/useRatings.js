import { useEffect, useState } from "react";
import { useRatingStore } from "../store/useRatingStore";

export const useRatings = () => {
    const { ratings, loading, getRatings, getStats } = useRatingStore();
    const [sortBy, setSortBy] = useState("highest");

    useEffect(() => {
        getRatings();
    }, []);

    const sortedRatings = [...ratings].sort((a, b) => {
        if (sortBy === "highest") return b.average - a.average;
        if (sortBy === "lowest") return a.average - b.average;
        if (sortBy === "most_voted") return b.totalRatings - a.totalRatings;
        return 0;
    });

    return {
        ratings: sortedRatings,
        loading,
        stats: getStats(),
        setSortBy,
        refresh: getRatings
    };
};