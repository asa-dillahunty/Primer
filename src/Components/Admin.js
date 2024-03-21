import React, { useEffect, useState } from 'react';
import { auth, createCompany, deleteCache, getCompanies, getCompany, getMyCompanyID, performLogout } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import { AdminCompanyDisplayTable } from './DislpayTable';

function AdminDashboard() {
	const [companyData, setCompanyData] = useState({});       
	const navigate = useNavigate();

	const fetchCompany = async () => {
		const companyID = await getMyCompanyID(auth.currentUser.uid);
		const companyObj = await getCompany(companyID);
		console.log(companyObj);
		setCompanyData(companyObj);
	};
	
	useEffect(() => {
		console.log("Fetching Company Data");
		fetchCompany();
	}, []);
	
	return (
		<div className="dashboard-container">
		<div className="dashboard-header">
			<h1>Mayfly</h1>
				<button className="dashboard-logout" onClick={() => performLogout(navigate)}>
					Log Out
				</button>
			</div>
			<div className="dashboard-content">
				<AdminCompanyDisplayTable company={companyData} />
			</div>
		</div>
	);
}

export default AdminDashboard;
