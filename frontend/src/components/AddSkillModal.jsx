import { useState } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import api from "../services/api";

const TYPES = ["Offering", "Learning"];

export default function AddSkillModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    type: "Offering",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!form.name.trim()) return;

    try {
      setLoading(true);
      const res = await api.post("/skills", form);
      onAdd(res.data);

      setForm({ name: "", type: "Offering" });
      onClose();
    } catch (err) {
      console.log("Add skill failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Skill
          </h2>

          <button onClick={onClose}>
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-xs text-gray-400 uppercase">
            Skill Name
          </label>

          <input
            autoFocus
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            placeholder="e.g. React.js"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        {/* TYPE */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 uppercase">
            Skill Type
          </label>

          <div className="relative mt-1">
            <select
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value }))
              }
              className="w-full appearance-none rounded-lg border px-3 py-2 text-sm"
            >
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 justify-end">

          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm"
          >
            <Check className="h-4 w-4" />
            {loading ? "Adding..." : "Add Skill"}
          </button>

        </div>
      </div>
    </div>
  );
}