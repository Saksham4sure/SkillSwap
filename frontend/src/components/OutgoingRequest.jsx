import { MoveUpRight } from "lucide-react";

export default function OutgoingRequest({ requests }) {

    const STATUS_STYLE = {
        pending: "bg-amber-50 border-amber-200 text-amber-600",
        accepted: "bg-emerald-50 border-emerald-200 text-emerald-600",
        rejected: "bg-red-50 border-red-200 text-red-500",
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm font-sans">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">

                <h2 className="text-sm font-semibold text-gray-900 flex gap-2 items-center justify-center">
                    <MoveUpRight className="h-4 w-4" />
                    Outgoing Requests
                </h2>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-200 px-1.5 text-[11px] font-semibold text-gray-600">
                    {requests.length}
                </span>

            </div>

            {/* List */}
            <ul className="divide-y divide-gray-50">

                {requests.length === 0 ?
                    <p className="text-sm text-gray-500 italic px-5 py-3.5">No outgoing requests.</p>
                    :
                    requests.map((r) => (

                        <li key={r.id} className="flex items-center gap-3 px-5 py-3.5">

                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center text-sm font-bold text-white">

                                {r.receiver_name?.split(" ").map(w => w[0]).join("")}

                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {r.receiver_name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Status: {r.status}
                                </p>
                            </div>

                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_STYLE[r.status]}`}>
                                {r.status}
                            </span>

                        </li>

                    ))}

            </ul>

        </div>
    );
}