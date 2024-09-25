import React, { useState, useEffect } from 'react';
import { getPackages, addPackage, updatePackage, deletePackage } from './Packageapi';
import "/home/uki-student/Documents/fresh/frontend/myproject/src/component/Addpackege.css";

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: '' });
  const [editPackage, setEditPackage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Control visibility of add form

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };
    fetchPackages();
  }, []);

  const handleAddPackage = async () => {
    const pkg = await addPackage(newPackage);
    setPackages([...packages, pkg]);
    setNewPackage({ name: '', description: '', price: '' });
    setShowAddForm(false); // Hide the add form after adding a package
  };

  const handleUpdatePackage = async () => {
    if (!editPackage) return;
    const pkg = await updatePackage(editPackage._id, editPackage);
    setPackages(packages.map(p => p._id === pkg._id ? pkg : p));
    setEditPackage(null);
  };

  const handleDeletePackage = async (id) => {
    await deletePackage(id);
    setPackages(packages.filter(p => p._id !== id));
  };

  return (
    <div>
      <h1>Package Manager</h1>
      
      {/* All Packages List */}
      <div>
        <h2>All Packages</h2>
        <ul>
          {packages.map(pkg => (
            <li key={pkg._id}>
              <span>{pkg.name} - {pkg.description} - Rs.{pkg.price.toLocaleString()}</span>
              <button onClick={() => setEditPackage(pkg)}>Edit</button>
              <button onClick={() => handleDeletePackage(pkg._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Package Button */}
      <button onClick={() => setShowAddForm(true)}>Add Package</button>

      {/* Add Package Form */}
      {showAddForm && (
        <div>
          <h2>Add Package</h2>
          <input
            type="text"
            placeholder="Name"
            value={newPackage.name}
            onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newPackage.description}
            onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price (LKR)"
            value={newPackage.price}
            onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
          />
          <button onClick={handleAddPackage}>Add Package</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}

      {/* Edit Package Form */}
      <div>
        {editPackage && (
          <>
            <h2>Edit Package</h2>
            <input
              type="text"
              placeholder="Name"
              value={editPackage.name}
              onChange={(e) => setEditPackage({ ...editPackage, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={editPackage.description}
              onChange={(e) => setEditPackage({ ...editPackage, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price (LKR)"
              value={editPackage.price}
              onChange={(e) => setEditPackage({ ...editPackage, price: e.target.value })}
            />
            <button onClick={handleUpdatePackage}>Update Package</button>
            <button onClick={() => setEditPackage(null)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageManager;
