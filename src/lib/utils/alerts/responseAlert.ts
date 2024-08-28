import Swal from "sweetalert2";

export const responseAlert = (title: string, text:string, confirmText: string, denyText: string): Promise<boolean> => {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            icon: "question",
            text: text,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: confirmText,
            denyButtonText: denyText,
            showCloseButton: false,
            confirmButtonColor: "#3085d6",
            denyButtonColor: "#ff7961"
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else if (result.isDenied) {
                resolve(false);
            } else {
                resolve(false);
            }
        });
    });
};
