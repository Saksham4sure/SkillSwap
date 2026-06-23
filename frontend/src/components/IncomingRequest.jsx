import { MoveDownLeft } from "lucide-react";

export default function IncomingRequest({ requests, onAccept, onReject }) {

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm font-sans">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">

        <h2 className="text-sm font-semibold text-gray-900 flex gap-2 items-center justify-center">
          Incoming Requests
          <MoveDownLeft className="h-4 w-4" />
        </h2>

        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1.5 text-[11px] font-semibold text-white">
          {requests.length}
        </span>

      </div>

      {/* List */}
      <ul className="divide-y divide-gray-50">

        {
          requests.length === 0 ? 
          <p className="text-sm text-gray-500 italic px-5 py-3.5">No incoming requests.</p>
          :
            requests.map((r) => (

              <li key={r.id} className="flex items-center gap-3 px-5 py-3.5">

                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-300 flex items-center justify-center text-sm font-bold text-white shrink-0">

                  {r.sender_name?.split(" ").map(w => w[0]).join("")}

                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {r.sender_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Status: {r.status}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5">

                  <button
                    onClick={() => onAccept(r.id)}
                    className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => onReject(r.id)}
                    className="rounded-lg border px-3 py-1 text-xs font-semibold text-gray-500"
                  >
                    Reject
                  </button>

                </div>

              </li>

            ))}

      </ul>

    </div>
  );
}