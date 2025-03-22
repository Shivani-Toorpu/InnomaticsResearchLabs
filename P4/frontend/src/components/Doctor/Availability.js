import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const Availability = () => {
  const { auth } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);

  const addSlot = () => {
    setSlots([...slots, { date: '', times: [''] }]);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/doctor/availability', { availableSlots: slots }, {
      headers: { 'x-auth-token': auth.token },
    });
    alert('Availability Updated');
  };

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Set Available Time Slots</h2>
      {slots.map((slot, index) => (
        <div key={index} className="mb-4">
          <input
            type="date"
            value={slot.date}
            onChange={(e) => {
              const newSlots = [...slots];
              newSlots[index].date = e.target.value;
              setSlots(newSlots);
            }}
            className="border p-2 mb-2"
          />
          {slot.times.map((t, i) => (
            <input
              key={i}
              type="time"
              value={t}
              onChange={(e) => {
                const newSlots = [...slots];
                newSlots[index].times[i] = e.target.value;
                setSlots(newSlots);
              }}
              className="border p-2 ml-2"
            />
          ))}
          <button
            type="button"
            onClick={() => {
              const newSlots = [...slots];
              newSlots[index].times.push('');
              setSlots(newSlots);
            }}
            className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
          >
            + Time
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSlot}
        className="bg-green-500 text-white px-3 py-2 rounded mr-4"
      >
        + Add Slot
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default Availability;
