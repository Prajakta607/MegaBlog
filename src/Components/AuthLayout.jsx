import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth"; // Import your Appwrite auth service
import { setUser } from "../store/authSlice"; // Import setUser action

export default function AuthLayout({ children }) {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(setUser(userData));
            } catch (error) {
                console.error("User session error:", error);
            }
        };

        if (authStatus) {
            fetchUser(); // Fetch user data whenever authStatus updates
        }
    }, [authStatus]); // Runs whenever authentication state changes

    return <>{children}</>;
}
