import React from 'react';



interface LoginButtonProps {
    isLoading?: boolean;

}

export default function LoginButton({ isLoading = false }: LoginButtonProps) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
            {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
    );
}
