import { useState, useEffect } from 'react';

export default function BreedForm({ breeds, setBreeds, species, editIndex, setEditIndex }) {
  const [formData, setFormData] = useState({ breedName: '', species_id: '' });

  useEffect(() => {
    if (editIndex !== null) {
      setFormData(breeds[editIndex]);
    } else {
      setFormData({ breedName: '', species_id: '' });
    }
  }, [editIndex, breeds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (editIndex !== null) {
      setBreeds(prev => prev.map((breed, index) => (index === editIndex ? newEntry : breed)));
    } else {
      setBreeds(prev => [...prev, newEntry]);
    }
    setEditIndex(null);
    setFormData({ breedName: '', species_id: '' });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 text-sm">Breed Name</label>
        <input
          type="text"
          name="breedName"
          value={formData.breedName}
          onChange={handleChange}
          placeholder="Breed Name"
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Species</label>
        <select
          name="species_id"
          value={formData.species_id}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        >
          <option value="">Select Species</option>
          {species.map((specie, index) => (
            <option key={index} value={specie.speciesName}>
              {specie.speciesName}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
      >
        {editIndex !== null ? 'Update' : 'Add'} Breed
      </button>
    </form>
  );
}
