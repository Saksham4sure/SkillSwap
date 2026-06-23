import { useEffect, useState } from "react";
import {
    Pencil,
    Check,
    X,
    Plus,
    Trash2,
    Sparkle,
    Mail,
    CalendarDays,
    AlignLeft,
    Layers,
    ChevronDown,
    Camera,
} from "lucide-react";
import api from "../services/api";
import InputFields from "../components/InputFields";
import SkillCard from "../components/SkillCard";
import AddSkillModal from "../components/AddSkillModal";
import UpdateSkillModal from "../components/UpdateSkillModal";

function Profile({ user }) {
    if (!user) return;

    const [showModal, setShowModal] = useState(false);
    const [skills, setSkills] = useState([]);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const addSkill = (skill) => {
        setSkills((prev) => [...prev, skill]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/skills");
                setSkills(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, []);

    const handleEdit = (skill) => {
        setSelectedSkill(skill);
        setIsUpdateOpen(true);

    };

    const handleDelete = async (id) => {
        try {
            const res = await api.delete(`/skills/${id}`);
            setSkills((prev) => prev.filter((skill) => skill.id !== id));
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className="md:pl-75 py-5 md:py-10 px-6 md:px-15 min-h-screen w-full h-20">
            <div className="min-h-screen bg-gray-50 w-full">
                <div className="mx-auto  space-y-5">
                    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
                        <div className="h-28 bg-gradient-to-r from-violet-600 to-purple-500 relative">
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1">
                                <Sparkle className="h-3.5 w-3.5 text-white" />
                                <span className="text-xs font-medium text-white">Skill Swap</span>
                            </div>
                        </div>
                        <div className="px-6 pb-6">
                            <div className="flex items-end justify-between -mt-12 mb-4">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-2xl font-semibold text-white">
                                        {user?.name.split(" ")
                                            .map((w) => w[0])
                                            .slice(0, 2)
                                            .join("")
                                            .toUpperCase()}
                                    </div>
                                    <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white border-2 border-white">
                                        <Camera className="h-3 w-3" />
                                    </button>
                                </div>
                                <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit profile
                                </button>
                            </div>
                            <h1 className="mb-4 text-xl font-semibold text-gray-900">
                                {user.name}
                            </h1>
                            <div className="space-y-4">
                                <InputFields icon={Mail} name="Email" value={user.email} />
                                <InputFields icon={CalendarDays} name="Register on" value={user.created_at} />
                                <InputFields icon={AlignLeft} name="Bio" value={!user.bio ? "No bio" : user.bio} />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-white border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-violet-600" />
                                <h2 className="text-base font-semibold text-gray-900">Skills</h2>
                                <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                                    {skills.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                                    Offering
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Learning
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-5">
                            Hover a skill to edit or remove it.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                                <SkillCard name={skill.skill_name} type={skill.type} key={idx} id={skill.id} onEdit={() => handleEdit(skill)} onDelete={handleDelete} />
                            ))}
                            <UpdateSkillModal
                                isOpen={isUpdateOpen}
                                onClose={() => setIsUpdateOpen(false)}
                                skill={selectedSkill}
                                onUpdate={(updatedSkill) => {
                                    setSkills((prev) =>
                                        prev.map((skill) =>
                                            skill.id === updatedSkill.id
                                                ? updatedSkill
                                                : skill
                                        )
                                    );

                                }}
                            />
                        </div>
                        <div className="mt-5 border-t border-gray-100 pt-4">
                            <button onClick={() => setShowModal(true)} className="cursor-pointer flex items-center gap-2 rounded-lg border border-dashed border-violet-300 px-4 py-2.5 text-sm font-medium text-violet-600 w-full justify-center">
                                <Plus className="h-4 w-4" />
                                Add a skill
                            </button>
                            <AddSkillModal
                                isOpen={showModal}
                                onClose={() => setShowModal(false)}
                                onAdd={addSkill}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;