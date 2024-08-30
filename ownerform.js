import { useState, useEffect } from 'react';

export default function OwnerForm({ owners, setOwners, editIndex, setEditIndex }) {
  const [formData, setFormData] = useState({ name: '', contactDetails: '', address: '' });

  useEffect(() => {
    if (editIndex !== null) {
      setFormData(owners[editIndex]);
    } else {
      setFormData({ name: '', contactDetails: '', address: '' });
    }
  }, [editIndex, owners]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (editIndex !== null) {
      setOwners(prev => prev.map((owner, index) => (index === editIndex ? newEntry : owner)));
    } else {
      setOwners(prev => [...prev, newEntry]);
    }
    setEditIndex(null);
    setFormData({ name: '', contactDetails: '', address: '' });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Owner's Name"
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Contact Details</label>
        <input
          type="text"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={handleChange}
          placeholder="Contact Details"
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
      >
        {editIndex !== null ? 'Update' : 'Add'} Owner
      </button>
    </form>
  );
}
