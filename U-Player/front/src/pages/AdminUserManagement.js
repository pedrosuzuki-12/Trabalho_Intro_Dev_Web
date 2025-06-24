import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsersApi } from '../services/dataService'; 

function AdminUserManagement() {
    const { promoteClient, demoteAdmin, deleteUser } = useAuth();
    const [clients, setClients] = useState([]);
    const [admins, setAdmins] = useState([]);

    const fetchUsers = async () => {
        const allUsers = await getUsersApi();
        setClients(allUsers.filter(u => u.userType === 'client'));
        setAdmins(allUsers.filter(u => u.userType === 'admin'));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePromoteClient = async (client) => {
        if (window.confirm(`Tem certeza que deseja promover ${client.name} a administrador?`)) {
            await promoteClient(client._id);
            fetchUsers(); // Atualiza a lista
        }
    };
    
    const handleDemoteAdmin = async (admin) => {
        if (window.confirm(`Tem certeza que deseja rebaixar ${admin.name} a cliente?`)) {
            await demoteAdmin(admin._id);
            fetchUsers(); // Atualiza a lista
        }
    };

    const handleDeleteUser = async (user) => {
        if (window.confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
            await deleteUser(user._id);
            fetchUsers(); // Atualiza a lista
        }
    };

    return (
        <div id="adminUserManagementView" className="admin-section-content">
            <h2>Gerenciamento de Usuários</h2>
            <div className="user-management-subsection">
                <h3>Clientes</h3>
                <div id="adminCustomerList">
                    {clients.map(c => (
                        <div key={c._id} className="list-item-admin">
                            <div><h4>{c.name}</h4><p>{c.email}</p></div>
                            <div className="admin-user-actions">
                                <button onClick={() => handlePromoteClient(c)}>Tornar Admin</button>
                                <button className="danger" onClick={() => handleDeleteUser(c)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="user-management-subsection" style={{ marginTop: '2rem' }}>
                <h3>Administradores</h3>
                <div id="adminAdminUserList">
                    {admins.map(a => (
                        <div key={a._id} className="list-item-admin">
                            <div><h4>{a.name}</h4><p>{a.email}</p></div>
                            <div className="admin-user-actions">
                                {a.email !== 'admin@admin.com' && (
                                    <>
                                        <button onClick={() => handleDemoteAdmin(a)}>Tornar Cliente</button>
                                        <button className="danger" onClick={() => handleDeleteUser(a)}>Excluir</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminUserManagement;