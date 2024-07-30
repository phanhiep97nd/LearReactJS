import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/EditDepart.module.css';

const EditDepart: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  // Sử dụng navigate được cung cấp từ hook để điều hướng
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepart = async () => {
      try {
        const { data } = await axios.get(`/api/departs/${id}`);
        setName(data.name);
      } catch (error) {
        console.error('Failed to fetch department:', error);
      }
    };
    fetchDepart();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/departs/${id}`, { name });
      // Chuyển hướng sang Component list departs
      navigate('/departs');
    } catch (error) {
      console.error('Failed to edit department:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Edit Department</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>Save</button>
      </form>
    </div>
  );
};

export default EditDepart;
