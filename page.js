'use client';
import { useState } from 'react';
import PetForm from './petform';
import OwnerForm from './ownerform';
import SpeciesForm from './speciesform';
import BreedForm from './breedform';

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [currentForm, setCurrentForm] = useState('pets');
  const [editIndex, setEditIndex] = useState(null);

  const forms = {
    pets: <PetForm pets={pets} setPets={setPets} owners={owners} species={species} breeds={breeds} editIndex={editIndex} setEditIndex={setEditIndex} />,
    owners: <OwnerForm owners={owners} setOwners={setOwners} editIndex={editIndex} setEditIndex={setEditIndex} />,
    species: <SpeciesForm species={species} setSpecies={setSpecies} editIndex={editIndex} setEditIndex={setEditIndex} />,
    breeds: <BreedForm breeds={breeds} setBreeds={setBreeds} species={species} editIndex={editIndex} setEditIndex={setEditIndex} />
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-bold mb-6 mt-2 ml-5 text-left fade-in fade-in-1">Dashboard</h1>

      <div className="mb-6">
        <button
          onClick={() => setCurrentForm('pets')}
          className={`mr-2 py-2 px-4 rounded-lg ${currentForm === 'pets' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Pets
        </button>
        <button
          onClick={() => setCurrentForm('owners')}
          className={`mr-2 py-2 px-4 rounded-lg ${currentForm === 'owners' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Owners
        </button>
        <button
          onClick={() => setCurrentForm('species')}
          className={`mr-2 py-2 px-4 rounded-lg ${currentForm === 'species' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Species
        </button>
        <button
          onClick={() => setCurrentForm('breeds')}
          className={`py-2 px-4 rounded-lg ${currentForm === 'breeds' ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-500 text-white`}
        >
          Manage Breeds
        </button>
      </div>

      <div className="flex justify-between space-x-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-1/4 fade-in fade-in-2">
          <h2 className="text-2xl font-bold mb-4">Add {currentForm.charAt(0).toUpperCase() + currentForm.slice(1)}</h2>
          {forms[currentForm]}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-3/4 fade-in fade-in-3">
          <h2 className="text-2xl font-bold mb-4">Pet Records</h2>
          <table className="table-auto w-full text-left text-xs">
            <thead>
              <tr>
                <th className="px-4 py-2">Owner</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Species</th>
                <th className="px-4 py-2">Breed</th>
                <th className="px-4 py-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {pets.length > 0 ? (
                pets.map((pet, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{pet.owner_id}</td>
                    <td className="border px-4 py-2">{pet.name}</td>
                    <td className="border px-4 py-2">{pet.species_id}</td>
                    <td className="border px-4 py-2">{pet.breed_id}</td>
                    <td className="border px-4 py-2">{pet.dob}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="5">No pets available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
