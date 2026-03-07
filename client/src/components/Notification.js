import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../redux/notificationSlice";

const Notification = () => {
    const dispatch = useDispatch();
    const { message, type, isVisible } = useSelector((state) => state.notification);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideNotification());
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch]);

    if (!isVisible) return null;

    return (
        <div className={`notification notification-${type}`}>
            <p className="notification-message">{message}</p>
        </div>
    );
};

export default Notification;
