import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {
	FaGoogle,
	FaFacebookF,
	FaLinkedinIn,
	FaTwitter,
	FaEye,
	FaEyeSlash,
} from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation - 1723459393085.json';
import Alert from '../Alert/Alert';
import './LoginPage.css';
const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [keepSignedIn, setKeepSignedIn] = useState(false);
	const [alert, setAlert] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (validateForm()) {
			try {
				navigate('/home');
			} catch (error) {
				setAlert({
					variant: 'danger',
					message: 'An error occurred. Please try again.',
				});
			} finally {
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	};
	const validateForm = () => {
		if (!email) {
			setAlert({
				variant: 'danger',
				message: 'Please enter your email address.',
			});
			return false;
		}
		if (!validateEmail(email)) {
			setAlert({
				variant: 'danger',
				message: 'Please enter a valid email address.',
			});
			return false;
		}
		if (!password) {
			setAlert({
				variant: 'danger',
				message: 'Please enter your password.',
			});
			return false;
		}
		if (!validatePassword(password)) {
			setAlert({
				variant: 'danger',
				message:
					'Password must be at least 8 characters long and contain at least 1 capital letter, 1 number, and 1 symbol.',
			});
			return false;
		}
		return true;
	};
	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const validatePassword = (password) => {
		const regex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
		return regex.test(password);
	};
	const closeAlert = () => {
		setAlert(null);
	};
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<Container
			fluid
			className='login-container'>
			{alert && (
				<Alert
					variant={alert.variant}
					message={alert.message}
					onClose={closeAlert}
				/>
			)}
			<Row>
				<Col
					md={6}
					className='login-form-container'>
					<div className='login-form'>
						<h4 className='text-center mb-4'>Sign In</h4>
						<h6 className='text-center mb-4'>
							New user?{' '}
							<a
								href='#'
								className='create-account-link'>
								Create an account
							</a>
						</h6>
						<Form onSubmit={handleSubmit}>
							<Form.Group
								controlId='formEmail'
								className='mb-3'>
								<Form.Control
									type='email'
									placeholder='Email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</Form.Group>
							<Form.Group
								controlId='formPassword'
								className='mb-3'>
								<div className='password-input-wrapper'>
									<Form.Control
										type={showPassword ? 'text' : 'password'}
										placeholder='Password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									<button
										type='button'
										className='password-toggle-btn'
										onClick={togglePasswordVisibility}
										aria-label={
											showPassword
												? 'Hide password'
												: 'Show password'
										}>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</button>
								</div>
							</Form.Group>
							<Form.Group
								controlId='formKeepSignedIn'
								className='mb-3'>
								<Form.Check
									type='checkbox'
									label='Keep me signed in'
									checked={keepSignedIn}
									onChange={(e) => setKeepSignedIn(e.target.checked)}
								/>
							</Form.Group>
							<Button
								variant='primary'
								type='submit'
								className='w-100 mb-3'
								disabled={isLoading}>
								{isLoading ? 'Signing In...' : 'Sign In'}
							</Button>
						</Form>
						<div className='text-center'>
							<p className='sign-in-with'>Or Sign In With</p>
							<div className='social-icons'>
								<Button
									variant='outline-primary'
									className='rounded-circle'>
									<FaGoogle />
								</Button>
								<Button
									variant='outline-primary'
									className='rounded-circle'>
									<FaFacebookF />
								</Button>
								<Button
									variant='outline-primary'
									className='rounded-circle'>
									<FaLinkedinIn />
								</Button>
								<Button
									variant='outline-primary'
									className='rounded-circle'>
									<FaTwitter />
								</Button>
							</div>
						</div>
					</div>
				</Col>
				<Col
					md={6}
					className='illustration-container'>
					<div className='animated-illustration'>
						<Lottie
							animationData={animationData}
							loop={true}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
export default LoginPage;
