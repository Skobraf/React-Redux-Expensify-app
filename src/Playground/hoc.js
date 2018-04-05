import React from 'react';
import ReactDOM from  ' react-dom':

const Info (props) => (
	<div>
		<h1>Info</h1>
		<p>This is : {props.info}</p>
	</div>
	);

const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			<p>	this is private info</p>
			<WrappedComponent />
		</div>
		); 

};

const requireAutuentication = (WrappedComponent) => {
	return (props) => (
		<div>
			<p></p>
		</div>
		);
}

const AdminInfo = withAdminWarning(Info);