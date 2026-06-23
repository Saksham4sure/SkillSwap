import { useEffect, useState } from 'react';
import api from '../services/api';
import ProfileCard from '../components/ProfileCard';
import RequestSwapModal from '../components/RequestSwapModal';

const Discover = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            };
        };
        fetchUsers();
    }, []);

    const handleRequest = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    return (
        <div className="md:pl-75 py-5 md:py-10 md:px-15 min-h-screen w-full">
            <div className="flex flex-wrap items-center justify-center">
                {users.map((user) => (
                    <ProfileCard user={user} key={user.id} onRequest={() => handleRequest(user)} />
                ))}
            </div>
            <RequestSwapModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                user={selectedUser}
            />
        </div>
    )
}

export default Discover