import { Link } from "@inertiajs/react";

export default function SideLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "capitalize flex items-center px-4 py-2 text-gray-900 hover:bg-gray-100 group my-1 rounded-lg " +
                (active
                    ? "border-indigo-400 text-gray-900 bg-gray-300 hover:bg-gray-300 focus:border-indigo-700"
                    : " ")
            }
        >
            {children}
        </Link>
    );
}
