import { useState, useEffect } from 'react';

export default function SpeciesForm({ species, setSpecies, editIndex, setEditIndex }) {
  const [formData, setFormData] = useState({ speciesName: '' });

  useEffect(() => {
    if (editIndex !== null) {
      setFormData(species[editIndex]);
    } else {
      setFormData({ speciesName: '' });
    }
  }, [editIndex, species]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (editIndex !== null) {
      setSpecies(prev => prev.map((specie, index) => (index === editIndex ? newEntry : specie)));
    } else {
      setSpecies(prev => [...prev, newEntry]);
    }
    setEditIndex(null);
    setFormData({ speciesName: '' });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 text-sm">Species Name</label>
        <input
          type="text"
          name="speciesName"
          value={formData.speciesName}
          onChange={handleChange}
          placeholder="Species Name"
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
      >
        {editIndex !== null ? 'Update' : 'Add'} Species
      </button>
    </form>
  );
}
