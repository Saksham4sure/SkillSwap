import { useState, useEffect } from 'react';
import api from '../services/api';
import IncomingRequest from '../components/IncomingRequest';
import OutgoingRequest from '../components/OutgoingRequest';


const Requests = () => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const [inRes, outRes] = await Promise.all([
        api.get("/requests/incoming"),
        api.get("/requests/outgoing"),
      ]);
      setIncoming(inRes.data);
      setOutgoing(outRes.data);

    } catch (err) {
      console.log("Fetch requests failed:", err);
    };
  };

  const handleAccept = (id) => {
    console.log("Accept:", id);
  };

  const handleReject = (id) => {
    console.log("Reject:", id);
  };

  return (
    <div className='md:pl-75 md:py-10 md:px-15 min-h-screen w-full'>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start gap-5 p-6">

      <IncomingRequest
        requests={incoming}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      <OutgoingRequest
        requests={outgoing}
      />

    </div>
    </div>
  )
}

export default Requests