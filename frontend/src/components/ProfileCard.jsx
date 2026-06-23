export default function ProfileCard({ user, onRequest }) {

    return (
        <div className="bg-gray-50 flex items-center justify-center px-6 py-2 font-sans w-full">
            <div className="w-full md:w-100 rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm px-2 py-2 ">
                <div className="flex w-full px-3 pt-3 items-center justify-center gap-3">
                    <div className="flex flex-col justify-center gap-4 w-2/5 overflow-hidden">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-400 to-purple-300 border-4 border-white flex items-center justify-center text-sm font-bold text-white shadow-sm">
                            AM
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-base font-semibold text-gray-900 leading-tight">{user.name}</h2>
                            <p className="text-xs text-gray-400 mt-0.5 ">{user.email}</p>
                        </div>
                    </div>
                    <div className="w-3/5">
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Offering</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {user.skills.map((s) => (
                                        s.type === "Offering" && <span
                                            key={s.name}
                                            className="rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
                                        >
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Learning */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Learning</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {user.skills.map((s) => (
                                        s.type === "Learning" && <span
                                            key={s.name}
                                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                                        >
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-2" />

                {/* Connect button */}
                <button className="w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 active:scale-95 transition-all cursor-pointer" onClick={onRequest}>
                    Request Swap
                </button>
            </div>
        </div>
    );
}