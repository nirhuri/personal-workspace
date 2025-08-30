
export const Login = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:3001/auth/google";
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg"
            >
                התחברות עם Google
            </button>
        </div>
    );
};