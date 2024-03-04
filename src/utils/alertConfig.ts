export const alertConfig = {
    title: "Are you sure, you want to delete?",
    icon: "warning",
    className: "w-[500px]",
    buttons: {
        cancel: {
            text: "Cancel",
            visible: true,
        },
        confirm: {
            text: "Delete",
            className: "bg-primary text-white",
        },
    },
    dangerMode: true,
}
