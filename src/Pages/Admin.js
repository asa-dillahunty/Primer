import React, { useEffect, useState } from 'react';
import { auth, deleteCache, getCompany, getMyCompanyID, performLogout, createUnclaimedEmployee, createUser, getCompanyFromCache } from '../lib/firebase';
import './Admin.css';
import { AdminCompanyDisplayTable } from '../Components/DisplayTable';
import ClickBlocker from '../Components/ClickBlocker';
import EmployeeInfoForm from '../Components/EmployeeInfoForm';
import { effect } from '@preact/signals-react';

function AdminDashboard(props) {
	const [companyData, setCompanyData] = useState({});
	const [infoFormOpen, setInfoFormOpen] = useState(false);
	const [blocked, setBlocked] = useState(false);

	const fetchCompany = async () => {
		// this needs to somehow wait for selected date to update first
		// update state! must somehow trigger an update in signals state
		setBlocked(true);
		console.log("here");
		const companyID = await getMyCompanyID(auth.currentUser.uid);
		console.log("here2");
		const companyObj = await getCompanyFromCache(companyID);
		companyObj.id = companyID;
		setCompanyData(companyObj);
		setBlocked(false);
	};

	const deepRefresh = async() => {
		setBlocked(true);
		const companyID = await getMyCompanyID(auth.currentUser.uid);
		const companyObj = await getCompany(companyID);
		companyObj.id = companyID;
		setCompanyData(companyObj);
		setBlocked(false);
	}
	
	useEffect(() => {
		console.log("Fetching Company Data");
		fetchCompany();
	}, []);
	
	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h1>Mayfly</h1>
				<button className="dashboard-logout" onClick={() => performLogout(props.setCurrPage)}>
					Log Out
				</button>
			</div>
			<div className="dashboard-content contain-click-blocker">
				<ClickBlocker block={blocked} loading/>
				<AdminCompanyDisplayTable company={companyData} refreshTable={fetchCompany}/>
				<button className="add-emp" onClick={() => { setInfoFormOpen(true); }}>Add Employee</button>
				<ClickBlocker custom={true} block={infoFormOpen}>
					<EmployeeInfoForm setFormOpen={setInfoFormOpen} refreshTable={fetchCompany} deepRefresh={deepRefresh} companyID={companyData.id} add/>
				</ClickBlocker>
			</div>
		</div>
	);
}

export default AdminDashboard;
