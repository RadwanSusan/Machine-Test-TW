import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import './Alert.css';
const Alert = ({ variant, message, onClose }) => {
	return (
		<BootstrapAlert
			variant={variant}
			onClose={onClose}
			dismissible
			className='custom-alert'>
			{message}
		</BootstrapAlert>
	);
};
export default Alert;
