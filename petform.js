import { useState, useEffect } from 'react';

export default function PetForm({ pets, setPets, owners, species, breeds, editIndex, setEditIndex }) {
  const [formData, setFormData] = useState({ owner_id: '', name: '', species_id: '', breed_id: '', dob: '' });

  useEffect(() => {
    if (editIndex !== null) {
      setFormData(pets[editIndex]);
    } else {
      setFormData({ owner_id: '', name: '', species_id: '', breed_id: '', dob: '' });
    }
  }, [editIndex, pets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    if (editIndex !== null) {
      setPets(prev => prev.map((pet, index) => (index === editIndex ? newEntry : pet)));
    } else {
      setPets(prev => [...prev, newEntry]);
    }
    setEditIndex(null);
    setFormData({ owner_id: '', name: '', species_id: '', breed_id: '', dob: '' });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 text-sm">Owner</label>
        <select
          name="owner_id"
          value={formData.owner_id}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        >
          <option value="">Select Owner</option>
          {owners.map((owner, index) => (
            <option key={index} value={owner.name}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm">Pet's Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Pet's Name"
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
      <div>
        <label className="block mb-1 text-sm">Breed</label>
        <select
          name="breed_id"
          value={formData.breed_id}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        >
          <option value="">Select Breed</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed.breedName}>
              {breed.breedName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 text-xs"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
      >
        {editIndex !== null ? 'Update' : 'Add'} Pet
      </button>
    </form>
  );
}
