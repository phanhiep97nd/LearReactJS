import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import styles from '../styles/Departs.module.css';
import { fetchDeparts } from '../backend';
import { Depart } from '../model';

const Departs: React.FC = () => {
  // Sử dụng navigate được cung cấp từ hook để điều hướng
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: departs, isLoading, error } = useQuery<Depart[]>('departs', fetchDeparts);

  /**
   * Chuyển hướng sang Component add phòng ban
   */
  const handleAdd = () => {
		navigate('/departs/add');
  };

  /**
   * Chuyển hướng sang Component edit phòng ban
   * @param id 
   */
  const handleEdit = (id: number) => {
		navigate(`/departs/edit/${id}`);
  };

  const handleDelete = (id: number) => {
		if (window.confirm('Are you sure you want to delete this department?')) {
		  // Call API
		}
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading departments</div>;

  const filteredDeparts = departs? departs.filter(depart => 
		depart.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
		<div className={styles.container}>
		  <h2 className={styles.header}>Departments</h2>
		  <input 
				type="text" 
				placeholder="Search..." 
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className={styles.input} 
		  />
		  <button className={styles.button}>Search</button>
		  <button className={styles.button} onClick={handleAdd}>Add Department</button>
		  <div className={styles.results}>
				{filteredDeparts.map(depart => (
				  <div key={depart.id} className={styles.departItem}>
						<span>{depart.name}</span>
						<button className={styles.button} onClick={() => handleEdit(depart.id)}>Edit</button>
						<button className={styles.button} onClick={() => handleDelete(depart.id)}>Delete</button>
				  </div>
				))}
		  </div>
		</div>
  );
};

export default Departs;
