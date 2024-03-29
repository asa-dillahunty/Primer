import React, { useEffect, useState } from 'react';
import { auth, deleteCache, getCompany, getMyCompanyID, performLogout, createUnclaimedEmployee, createUser } from './firebase';
import './Admin.css';
import { AdminCompanyDisplayTable } from './DislpayTable';
import ClickBlocker from './ClickBlocker';

function AdminDashboard(props) {
	const [companyData, setCompanyData] = useState({});
	const [blocked, setBlocked] = useState(false);

	const fetchCompany = async () => {
		const companyID = await getMyCompanyID(auth.currentUser.uid);
		const companyObj = await getCompany(companyID);
		companyObj.id = companyID;
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
				<button className="dashboard-logout" onClick={() => performLogout(props.setCurrPage)}>
					Log Out
				</button>
			</div>
			<div className="dashboard-content">
				<AdminCompanyDisplayTable company={companyData} refreshTable={fetchCompany}/>
				<button className="add-emp" onClick={() => { setBlocked(true); }}>Add Employee</button>
				<ClickBlocker custom={true} block={blocked}>
					<AddEmployeeForm  setBlocked={setBlocked} refreshTable={fetchCompany}/>
				</ClickBlocker>
			</div>
		</div>
	);
}

export function AddEmployeeForm (props) {
	const createTempEmployee = () => {
		const empName = document.getElementById("employee-name").value;

		const empData = {
			name:empName,
		}
		console.log(empData);
		getMyCompanyID(auth.currentUser.uid).then((companyID) => {
			createUnclaimedEmployee(empData, companyID)
				.then( () => {
					props.refreshTable().then(() => {
						props.setBlocked(false)
					});
				});
		});
	}

	return (
		<div className='add-employee-form'>
			<div className='input-container'>
				<label htmlFor="employee-name">Name:</label>
				<input id='employee-name' name="employee-name" type='text' autoComplete='off'></input>
			</div>
			<div className='button-container'>
				<button className='submit-button' onClick={createTempEmployee}>Submit</button>
				<button className='cancel-button' onClick={() => props.setBlocked(false)}>Cancel</button>
			</div>
		</div>
	);
}

export default AdminDashboard;
