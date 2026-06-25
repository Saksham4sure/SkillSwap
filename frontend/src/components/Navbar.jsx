import { useState } from "react";
import {
    LayoutGrid,
    Search,
    MessageSquare,
    Menu,
    X,
    ChevronsUpDown,
    Sparkle,
    UserRound,
    ArrowLeftRight,
    LogOut,
    LogIn
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useEffect } from "react";

const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", link: "/", icon: LayoutGrid },
    { id: "request", label: "Requests", link: "/requests", icon: ArrowLeftRight },
    { id: "discover", label: "Discover", link: "/discover", icon: Search },
    { id: "messages", label: "Messages", link: "", icon: MessageSquare, badge: 3 },
    { id: "profile", label: "Profile", link: "profile", icon: UserRound },
];

export default function Navbar({ user, setUser }) {
    const [activeId, setActiveId] = useState("dashboard");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.log("Logout failed", err);
        }
    };

    const handleSelect = (id) => {
        setActiveId(id);
        setIsOpen(false);
    };

    return (
        <div className="md:fixed">
            {/* Mobile top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white md:hidden w-screen">
                <div className="flex items-center justify-center gap-2">
                    <div className='w-8 h-8 rounded-xl overflow-hidden'>
                        <img className='w-full h-full object-cover' src="/Logo.png" alt="" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">SkillSwap</p>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>

            {/* Backdrop for mobile drawer */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-white border-r border-gray-100
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:h-screen`}
            >
                {/* Logo row */}
                <div className="flex items-center justify-between px-6 py-6">
                    <div className="flex items-center justify-center gap-2">
                        <div className='w-8 h-8 rounded-xl overflow-hidden'>
                            <img className='w-full h-full object-cover' src="/Logo.png" alt="" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900">SkillSwap</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 md:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex-1 overflow-y-auto px-4">
                    <ul className="space-y-1">
                        {NAV_ITEMS.map(({ id, label, icon: Icon, badge, link }) => {
                            const isActive = activeId === id;
                            return (
                                <li key={id}>
                                    <Link to={link}
                                        onClick={() => handleSelect(id)}
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                      ${isActive
                                                ? "bg-[#B3FE3A]text-[#B3FE3A]"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            }`}
                                    >
                                        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                                        <span>{label}</span>
                                        {badge ? (
                                            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B3FE3A] px-1.5 text-[11px] font-semibold text-black">
                                                {badge}
                                            </span>
                                        ) : null}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User profile footer */}
                <div className="border-t border-gray-100 px-4 py-4">
                    {!user ?
                        <Link to="/login" className="flex items-center justify-center ">
                            <div
                                className="flex cursor-pointer items-center justify-center gap-3 py-2 text-sm bg-zinc-900 text-white hover:bg-black w-full rounded-3xl"
                            >
                                <p className="text-lg">Login</p>
                                <div className="p-2 rounded-full bg-white">
                                    <LogIn className="w-4 h-4 text-black " />
                                </div>
                            </div>
                        </Link>
                        :
                        <Link to="/profile" className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50 cursor-pointer">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B3FE3A] to-[#051937] text-sm font-semibold text-white">
                                {user.name[0]}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-gray-900">
                                    {user.name}
                                </span>
                                <span className="block truncate text-xs text-gray-400">
                                    {user.email}
                                </span>
                            </span>
                            <ChevronsUpDown className="h-4 w-4 shrink-0 text-gray-400" />
                        </Link>}
                </div>
                {user && <div className="flex items-center justify-center pb-4 px-4">
                    <div
                        onClick={handleLogout}
                        className="flex cursor-pointer items-center justify-center gap-3 py-2 text-sm bg-zinc-900 text-white hover:bg-black w-full rounded-3xl"
                    >
                        <p className="text-lg">Logout</p>
                        <div className="p-2 rounded-full bg-white">
                            <LogOut className="w-4 h-4 text-black " />
                        </div>
                    </div>
                </div>}

            </aside>
        </div>
    );
}