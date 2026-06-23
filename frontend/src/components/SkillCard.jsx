import { Pencil, Trash2 } from "lucide-react";

const SkillCard = ({ id, name, type, onEdit, onDelete, }) => {
    const isOffering = type === "Offering";

    return (
        <div
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl border
      ${isOffering
                    ? "bg-violet-50 text-violet-700 border-violet-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
        >
            <div className="flex items-center justify-center gap-2">

                <div
                    className={`h-2 w-2 rounded-full ${isOffering
                            ? "bg-violet-400"
                            : "bg-emerald-400"
                        }`}
                />

                <p className="text-xl">
                    {name}
                </p>

                <span
                    className={`text-xs px-2 py-0.5 rounded
          ${isOffering
                            ? "bg-violet-100 text-violet-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                >
                    {type}
                </span>
            </div>

            <div className="flex items-center justify-center gap-4">

                <button
                    onClick={() => onEdit(id)}
                    className="flex items-center justify-center gap-1 cursor-pointer"
                >
                    <p className="text-sm">
                        Edit
                    </p>

                    <Pencil className="h-3 w-3" />
                </button>

                <button
                    onClick={() => onDelete(id)}
                    className="flex items-center justify-center gap-1 text-red-500 cursor-pointer"
                >
                    <p className="text-sm">
                        Delete
                    </p>

                    <Trash2 className="h-3 w-3" />
                </button>

            </div>
        </div>
    );
};

export default SkillCard;