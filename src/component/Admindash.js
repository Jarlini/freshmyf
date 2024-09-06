import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [group1Users, setGroup1Users] = useState([]);
    const [group2Users, setGroup2Users] = useState([]);
    const [group3Users, setGroup3Users] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const fetchGroupUsers = async (group) => {
        try {
            const { data } = await axios.get(`/api/admin/${group}`);
            switch (group) {
                case 'group1':
                    setGroup1Users(data);
                    setSelectedGroup('group1');
                    break;
                case 'group2':
                    setGroup2Users(data);
                    setSelectedGroup('group2');
                    break;
                case 'group3':
                    setGroup3Users(data);
                    setSelectedGroup('group3');
                    break;
                case 'all':
                    setAllUsers(data);
                    setSelectedGroup('all');
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#B2DFDB', padding: '20px', minHeight: '100vh' }}>
            <h1 style={{ color: 'orange', textAlign: 'center' }}>Admin Dashboard</h1>

            <form style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <button
                    type="button"
                    onClick={() => fetchGroupUsers('group1')}
                    style={{ margin: '10px', backgroundColor: 'orange', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: '300' }}
                >
                    Group 1
                </button>
                <button
                    type="button"
                    onClick={() => fetchGroupUsers('group2')}
                    style={{ margin: '10px', backgroundColor: 'orange', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: '300' }}
                >
                    Group 2
                </button>
                <button
                    type="button"
                    onClick={() => fetchGroupUsers('group3')}
                    style={{ margin: '10px', backgroundColor: 'orange', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: '300' }}
                >
                    Group 3
                </button>
                <button
                    type="button"
                    onClick={() => fetchGroupUsers('all')}
                    style={{ margin: '10px', backgroundColor: 'orange', color: 'white', padding: '4px 8px', fontSize: '12px', fontWeight: '300' }}
                >
                    All Users
                </button>
            </form>

            {selectedGroup && (
                <div style={{ margin: '20px 0' }}>
                    <h2 style={{ color: 'orange' }}>{`Details of ${selectedGroup}`}</h2>
                    <ul>
                        {selectedGroup === 'group1' && group1Users.map(user => (
                            <li key={user._id}>{user.username} - {user.email}</li>
                        ))}
                        {selectedGroup === 'group2' && group2Users.map(user => (
                            <li key={user._id}>{user.username} - {user.email}</li>
                        ))}
                        {selectedGroup === 'group3' && group3Users.map(user => (
                            <li key={user._id}>{user.username} - {user.email}</li>
                        ))}
                        {selectedGroup === 'all' && allUsers.map(user => (
                            <li key={user._id}>{user.username} - {user.email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
