import Swal from "sweetalert2";

export const defaultAlert = async (title: string, text: string, icon: "success" | "error" | "warning" | "info") => {
    Swal.fire({
        title,
        text,
        icon,
    });
};

