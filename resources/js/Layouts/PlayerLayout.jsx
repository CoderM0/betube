import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SearchBar from "@/Components/SearchBar";
import { Link, usePage } from "@inertiajs/react";
import { CiCirclePlus } from "react-icons/ci";

export default function PlayerLayout({ children, searchterm }) {
    const user = usePage().props.auth.user;
    return (
        <div>
            <div class="flex  bg-gray-100">
                {/* <!-- Mobile menu toggle button --> */}
                <input type="checkbox" id="menu-toggle" class="hidden peer" />

                {/* <!-- Sidebar --> */}

                {/* <!-- Main content --> */}

                <div class="flex flex-col flex-1 overflow-y-auto ">
                    <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                        <Link href={route("dashboard")}>
                            {" "}
                            <ApplicationLogo />{" "}
                        </Link>

                        <SearchBar searchterm={searchterm} />

                        <div class="flex items-center justify-between pr-4">
                            {user.is_publisher ? (
                                <p>view channel</p>
                            ) : (
                                <Link
                                    href={route("user.channel.create")}
                                    class="flex items-center gap-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                                >
                                    create channel <CiCirclePlus />
                                </Link>
                            )}
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 bg-white">{children}</div>
                </div>
            </div>
        </div>
    );
}
