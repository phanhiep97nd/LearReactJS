import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/EditUser.module.css';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  // Sử dụng navigate được cung cấp từ hook để điều hướng
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${id}`);
        setName(data.name);
        setRole(data.role);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${id}`, { name, role });
      // Chuyển hướng sang Component list users
      navigate('/users');
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Edit User</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
        </label>
        <label className={styles.label}>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.input}>
            <option value="">Select role</option>
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className={styles.button}>Save</button>
      </form>
    </div>
  );
};

export default EditUser;
