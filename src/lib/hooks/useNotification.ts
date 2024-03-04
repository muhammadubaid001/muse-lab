'use client'
import { useCallback } from "react"
import { Store, iNotification } from "react-notifications-component"

export const useNotifications = () => {
    const notification: iNotification = {
        type: "default",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
        animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
        dismiss: {
            showIcon: true,
            duration: 3000,
        },
    }

    const successMessage = useCallback(
        (message = "Request completed successfully", title = "Success") => {
            Store.addNotification({
                ...notification,
                title,
                message,
                type: "success",
            })
        },
        [],
    )
    const errorMessage = useCallback(
        (message = "Something went wrong", title = "Error") => {
            Store.addNotification({
                ...notification,
                title,
                message,
                type: "danger",
            })
        },
        [],
    )

    return { successMessage, errorMessage }
}
