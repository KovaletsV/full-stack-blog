import React from "react";

const Button = ({ children }) => {
    return (
        <button className="flex justify-center items-center bg-gray-600 rounded-sm text-xs text-white py-2 px-2 hover:bg-gray-900">
            {children}
        </button>
    );
};

export default Button;
