import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { CiCirclePlus } from "react-icons/ci";

export default function PlayerLayout({ children }) {
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
                        <div class=" px-4 w-[55%] ml-10">
                            <div class="relative w-full">
                                <input
                                    class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-blue-500 focus:border-blue-500"
                                    type="search"
                                    placeholder="Search"
                                />
                                <button class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <svg
                                        class="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
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
