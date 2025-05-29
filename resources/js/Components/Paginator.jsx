import { Link } from "@inertiajs/react";

export default function Paginator({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }
    return (
        <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px my-2 "
            aria-label="Pagination"
        >
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? ""}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        link.active
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    } ${
                        link.url === null ? "opacity-50 cursor-not-allowed" : ""
                    } ${index === 0 ? "rounded-l-md" : ""} ${
                        index === links.length - 1 ? "rounded-r-md" : ""
                    }`}
                    aria-current={link.active ? "page" : undefined}
                    aria-disabled={link.url === null}
                >
                    {link.label == "&laquo; Previous" ? (
                        <span className="">Previous</span>
                    ) : link.label == "Next &raquo;" ? (
                        <span className="">Next</span>
                    ) : (
                        link.label
                    )}
                </Link>
            ))}
        </nav>
    );
}
