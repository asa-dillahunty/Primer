import React, { useEffect, useState } from 'react';
import { auth, createCompany, deleteCache, getCompanies, makeAdmin, performLogout } from './firebase';
// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './OmniAdmin.css';
import DisplayTable from './DislpayTable';


function OmniAdminDashboard(props) {
	const [companies, setCompanies] = useState([]);

	const handleLogout = async () => {
		performLogout(props.setCurrPage);
	};

	const fetchCompanies = async () => {
		const companiesCollectionSnapshot = await getCompanies();
		console.log(companiesCollectionSnapshot);
		
		const updatedCompanies = companiesCollectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		setCompanies(updatedCompanies);
		console.log(updatedCompanies);
	};

	const addCompany = (company) => {
		console.log("add company: " + company);
	}

	const deleteCompany = (company) => {
		console.log("delete company: " + company.id + " - " + company.name);
	}

	useEffect(() => {
		fetchCompanies();
	}, []);

	return (
		<div className="dashboard-container">
		<div className="dashboard-header">
			<h1>Dashboard</h1>
				<button className="dashboard-logout" onClick={handleLogout}>
					Log Out
				</button>
			</div>
			<div className="dashboard-content">
				{/* list of current users 
					- contains option to delete
					- some kind of display of hours worked recently
					- option to add new users */}
				<p>Admin Dashboard!</p>
				<button onClick={() => {makeAdmin( auth.currentUser.uid )}}>Make Me Admin</button>
				<br/>
				<button onClick={ getCompanies }>Get Companies!</button>
				<br/>
				<button onClick={() => {createCompany("Epic")}}>Add Company</button>

				<DisplayTable displayItems={companies} onAdd={addCompany} onDelete={deleteCompany} refresh={fetchCompanies} />
			</div>
		</div>
	);
}

export default OmniAdminDashboard;
