import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import api from "../services/api";

export default function RequestSwapModal({
    isOpen,
    onClose,
    user,
}) {
    const [mySkills, setMySkills] = useState([]);
    const [senderSkillId, setSenderSkillId] = useState("");
    const [receiverSkillId, setReceiverSkillId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const fetchSkills = async () => {
            try {
                const res = await api.get("/skills");

                const offeringSkills = res.data.filter(
                    (s) => s.type === "Offering"
                );

                setMySkills(offeringSkills);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSkills();
    }, [isOpen]);

    const handleSend = async () => {
        if (!senderSkillId || !receiverSkillId)
            return;

        try {
            setLoading(true);

            await api.post("/requests", {
                receiverId: user.id,
                senderSkillId,
                receiverSkillId,
            });

            onClose();

            setSenderSkillId("");
            setReceiverSkillId("");

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL */}
            <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-lg font-semibold">
                        Request Swap
                    </h2>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>

                </div>

                {/* USER */}
                <p className="mb-4 text-lg text-gray-500">
                    To:{" "}
                    <span className="font-medium">
                        {user.name}
                    </span>
                </p>

                {/* MY SKILL */}
                <div className="mb-4">

                    <label className="text-xs text-gray-500">
                        My Skill
                    </label>

                    <select
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-violet-400"
                        value={senderSkillId}
                        onChange={(e) =>
                            setSenderSkillId(e.target.value)
                        }
                    >

                        <option value="">
                            Select your skill
                        </option>

                        {mySkills.map((skill) => (
                            <option
                                key={skill.id}
                                value={skill.id}
                            >
                                {skill.skill_name}
                            </option>
                        ))}

                    </select>

                </div>

                {/* THEIR SKILL */}
                <div className="mb-4">

                    <label className="text-xs text-gray-500">
                        Their Skill
                    </label>

                    <select
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-violet-400"
                        value={receiverSkillId}
                        onChange={(e) =>
                            setReceiverSkillId(e.target.value)
                        }
                    >

                        <option value="">
                            Select their skill
                        </option>

                        {user.skills?.map((skill) => (
                            <option
                                key={skill.id}
                                value={skill.id}
                            >
                                {skill.name}
                            </option>
                        ))}

                    </select>

                </div>

                {/* BUTTON */}
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="cursor-pointer w-full bg-violet-600 text-white py-2 rounded flex items-center justify-center gap-2"
                >

                    <Send size={16} />

                    {loading
                        ? "Sending..."
                        : "Send Request"}

                </button>

            </div>
        </div>
    );
}