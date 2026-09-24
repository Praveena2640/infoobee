import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const API_URL = import.meta.env.VITE_API_URL || '';

export const AppProvider = ({ children }) => {
  
  // Bypass localtunnel warning globally
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = function() {
      let [resource, config] = arguments;
      if (!config) config = {};
      if (!config.headers) config.headers = {};
      config.headers['Bypass-Tunnel-Reminder'] = 'true';
      return originalFetch(resource, config);
    };
  }, []);

  const [inventory, setInventory] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // Role based access
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('userRole') || 'manager'; // default
  });

  const loginUser = (role) => {
    localStorage.setItem('userRole', role);
    setCurrentUser(role);
  };

  const logoutUser = () => {
    localStorage.removeItem('userRole');
    setCurrentUser(null);
  };

  const fetchData = async () => {
    try {
      const [invRes, salesRes, prRes, notifRes, tasksRes] = await Promise.all([
        fetch(`${API_URL}/api/inventory`),
        fetch(`${API_URL}/api/sales`),
        fetch(`${API_URL}/api/purchase-requests`),
        fetch(`${API_URL}/api/notifications`),
        fetch(`${API_URL}/api/tasks`)
      ]);

      if (invRes.ok) setInventory(await invRes.json());
      if (salesRes.ok) setSales(await salesRes.json());
      if (prRes.ok) setPurchaseRequests(await prRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
      if (tasksRes.ok) setTasks(await tasksRes.json());
    } catch (err) {
      console.error('Error fetching data from API:', err);
    }
  };

  useEffect(() => {
    fetchData();

    // Connect to backend via Socket.IO
    const socket = io(API_URL || undefined, { extraHeaders: { 'Bypass-Tunnel-Reminder': 'true' } }); // Automatically uses current host which is proxied by Vite

    socket.on('inventory-updated', () => {
      fetch(`${API_URL}/api/inventory`).then(res => res.json()).then(setInventory);
    });

    socket.on('new-sale', () => {
      fetch(`${API_URL}/api/sales`).then(res => res.json()).then(setSales);
    });

    socket.on('purchase-requests-updated', () => {
      fetch(`${API_URL}/api/purchase-requests`).then(res => res.json()).then(setPurchaseRequests);
    });

    socket.on('new-notification', (notif) => {
      setNotifications(prev => [notif, ...prev]);
    });

    socket.on('new-task', (task) => {
      setTasks(prev => [task, ...prev]);
    });

    socket.on('task-updated', () => {
      fetch(`${API_URL}/api/tasks`).then(res => res.json()).then(setTasks);
    });

    return () => socket.disconnect();
  }, []);

  const recordSale = async (productName, quantity, amount) => {
    try {
      await fetch(`${API_URL}/api/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, quantity, amount })
      });
    } catch (err) {
      console.error('Failed to record sale', err);
    }
  };

  const approveRequest = async (id) => {
    try {
      await fetch(`${API_URL}/api/purchase-requests/${id}/approve`, {
        method: 'PUT'
      });
    } catch (err) {
      console.error('Failed to approve request', err);
    }
  };

  const addInventoryItem = async (item) => {
    try {
      await fetch(`${API_URL}/api/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add inventory item', err);
    }
  };

  const addTask = async (taskData) => {
    try {
      await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  return (
    <AppContext.Provider value={{
      inventory, setInventory,
      sales, setSales,
      purchaseRequests, approveRequest,
      notifications, recordSale,
      addInventoryItem,
      tasks, addTask, updateTaskStatus,
      currentUser, loginUser, logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
