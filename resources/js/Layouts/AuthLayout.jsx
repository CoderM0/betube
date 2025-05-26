import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SideLink from "@/Components/SideLink";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GrChannel, GrLike } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";

export default function AuthLayout({ children, searchterm }) {
    const [searchTerm, setSearchTerm] = useState(searchterm || "");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        router.get(
            route("user.search"),
            { search: searchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };
    const user = usePage().props.auth.user;
    return (
        <div>
            <div className="flex  ">
                {/* <!-- Mobile menu toggle button --> */}
                <input
                    type="checkbox"
                    id="menu-toggle"
                    className="hidden peer"
                />

                {/* <!-- Sidebar --> */}
                <div className="hidden peer-checked:flex md:flex flex-col w-60 bg-white transition-all duration-300 ease-in-out">
                    <Link href={route("dashboard")}>
                        <ApplicationLogo />
                    </Link>
                    <div className="flex flex-col flex-1 ">
                        <nav className="flex-1 px-2 py-4 bg-white">
                            <SideLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                <IoMdHome className="mr-2" size={"1.5rem"} />
                                Home
                            </SideLink>

                            {/* <!-- Login --> */}
                            <SideLink
                                href={route("user.history.view")}
                                active={route().current("user.history.view")}
                                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 group"
                            >
                                <RiHistoryLine
                                    className="mr-2"
                                    size={"1.5rem"}
                                />
                                History
                            </SideLink>

                            <SideLink
                                href="#"
                                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 group"
                            >
                                <MdPlaylistPlay
                                    className="mr-2"
                                    size={"1.5rem"}
                                />
                                playlist
                            </SideLink>

                            {/* <!-- Favourites --> */}
                            <SideLink
                                href={route("user.videos.watched_later")}
                                active={route().current(
                                    "user.videos.watched_later"
                                )}
                                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 group"
                            >
                                <MdOutlineWatchLater
                                    className="mr-2"
                                    size={"1.5rem"}
                                />
                                watch later
                            </SideLink>
                            <SideLink
                                href={route("user.videos.liked")}
                                active={route().current("user.videos.liked")}
                                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 group"
                            >
                                <GrLike className="mr-2" size={"1.5rem"} />
                                Liked Videos{" "}
                            </SideLink>
                            {user.is_publisher ? (
                                <div className="mt-3 border-t">
                                    <SideLink
                                        href={route("user.channel.view")}
                                        active={route().current(
                                            "user.channel.view"
                                        )}
                                        className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 group"
                                    >
                                        <GrChannel
                                            className="mr-2"
                                            size={"1.5rem"}
                                        />
                                        My channel
                                    </SideLink>
                                </div>
                            ) : (
                                <SideLink
                                    href={route("user.channel.create")}
                                    active={route().current(
                                        "user.channel.create"
                                    )}
                                    className="flex border-t text-center items-center gap-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                                >
                                    create channel <CiCirclePlus />
                                </SideLink>
                            )}
                        </nav>
                    </div>
                </div>

                {/* <!-- Main content --> */}
                <div className="flex flex-col flex-1  ">
                    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                        <div className=" px-4 w-[55%] ml-10">
                            <div className="relative w-full">
                                <input
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-blue-500 focus:border-blue-500"
                                    type="search"
                                    name="search"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    placeholder="Search"
                                />
                                <button
                                    onClick={handleSearchClick}
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <svg
                                        className="h-5 w-5"
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
                        <div className="flex items-center justify-between pr-4">
                            {user.is_publisher ? (
                                <p>view channel</p>
                            ) : (
                                <Link
                                    href={route("user.channel.create")}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
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
                    <div className="p-2 bg-white">{children}</div>
                </div>
            </div>
        </div>
    );
}
