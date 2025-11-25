import { useContext } from "react";
import { QuoterContext } from "../contexts/QuoterContext";

export const useQuoterContext = () => {
    const context = useContext(QuoterContext);
    if (!context) {
        throw new Error("useQuoterContext must be used within a QuoterProvider");
    }
    return context;
};