import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Nav,
	Navbar,
	Offcanvas,
	Placeholder,
} from 'react-bootstrap';
import {
	FaGoogle,
	FaFacebookF,
	FaLinkedinIn,
	FaTwitter,
	FaBars,
} from 'react-icons/fa';
import { fetchCountries } from '../../slices/countriesSlice';
import Slider from './Slider';
import './HomePage.css';
const HomePage = () => {
	const dispatch = useDispatch();
	const { countries, status } = useSelector((state) => state.countries);
	const [visibleCountries, setVisibleCountries] = useState(12);
	const [filter, setFilter] = useState('All');
	const [showSidebar, setShowSidebar] = useState(false);
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCountries());
		}
	}, [status, dispatch]);
	const loadMore = () => {
		setVisibleCountries((prev) => prev + 12);
	};
	const filteredCountries = countries.filter(
		(country) => filter === 'All' || country.region === filter,
	);
	const handleCloseSidebar = () => setShowSidebar(false);
	const handleShowSidebar = () => setShowSidebar(true);
	const CountryCard = ({ country }) => (
		<Card className='country-card h-100'>
			<Row>
				<Col
					xs={4}
					className='flag-container'>
					<Card.Img
						src={country.flag}
						alt={`${country.name} flag`}
					/>
				</Col>
				<Col xs={8}>
					<Card.Body>
						<Card.Title>{country.name}</Card.Title>
						<Card.Text>{country.region}</Card.Text>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
	const SkeletonCard = () => (
		<Card className='country-card h-100'>
			<Row>
				<Col
					xs={4}
					className='flag-container'>
					<Placeholder
						as={Card.Body}
						animation='glow'>
						<Placeholder
							xs={12}
							style={{ height: '100px' }}
						/>
					</Placeholder>
				</Col>
				<Col xs={8}>
					<Card.Body>
						<Placeholder
							as={Card.Title}
							animation='glow'>
							<Placeholder xs={6} />
						</Placeholder>
						<Placeholder
							as={Card.Text}
							animation='glow'>
							<Placeholder xs={7} />
						</Placeholder>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
	return (
		<Container
			fluid
			className='home-container'>
			<Navbar
				expand='lg'
				className='nav-header'>
				<Container fluid>
					<Navbar.Brand>
						<h1 className='mb-0'>Countries</h1>
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls='basic-navbar-nav'
						onClick={handleShowSidebar}>
						<FaBars />
					</Navbar.Toggle>
					<Navbar.Collapse
						id='basic-navbar-nav'
						className='d-none d-lg-flex'>
						<Nav className='mr-auto region-nav'>
							{[
								'All',
								'Asia',
								'Europe',
								'Africa',
								'Americas',
								'Oceania',
							].map((region) => (
								<Nav.Item key={region}>
									<Button
										variant={
											filter === region
												? 'primary'
												: 'outline-primary'
										}
										onClick={() => setFilter(region)}
										className='region-btn'>
										{region}
									</Button>
								</Nav.Item>
							))}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Offcanvas
				show={showSidebar}
				onHide={handleCloseSidebar}
				placement='end'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className='flex-column'>
						{[
							'All',
							'Asia',
							'Europe',
							'Africa',
							'Americas',
							'Oceania',
						].map((region) => (
							<Nav.Item key={region}>
								<Button
									variant={
										filter === region ? 'primary' : 'outline-primary'
									}
									onClick={() => {
										setFilter(region);
										handleCloseSidebar();
									}}
									className='region-btn w-100 mb-2'>
									{region}
								</Button>
							</Nav.Item>
						))}
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
			<div className='custom-welcome-section'>
				<div className='welcome-text'>WELCOME</div>
			</div>
			<Row className='slider-section'>
				<Col
					lg={3}
					className='order-lg-2 mb-3 mb-lg-0'>
					<div className='static-image-container'>
						<img
							src='https://images.unsplash.com/photo-1519358076875-e5f36e7cc9ff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt='Global Map'
							className='static-image'
						/>
					</div>
				</Col>
				<Col
					lg={9}
					className='order-lg-1'>
					<Slider />
				</Col>
			</Row>
			<Row className='country-list'>
				{status === 'loading'
					? Array.from({ length: 12 }).map((_, index) => (
							<Col
								key={index}
								xs={12}
								md={6}
								className='mb-4'>
								<SkeletonCard />
							</Col>
					  ))
					: filteredCountries.slice(0, visibleCountries).map((country) => (
							<Col
								key={country.name}
								xs={12}
								md={6}
								className='mb-4'>
								<CountryCard country={country} />
							</Col>
					  ))}
			</Row>
			{visibleCountries < filteredCountries.length && (
				<div className='text-center my-4'>
					<Button
						variant='primary'
						onClick={loadMore}
						className='load-more-btn'>
						Load more
					</Button>
				</div>
			)}
			<footer className='text-center mt-4'>
				<div className='social-icons mb-3'>
					<Button
						variant='outline-primary'
						className='rounded-circle mx-1'>
						<FaGoogle />
					</Button>
					<Button
						variant='outline-primary'
						className='rounded-circle mx-1'>
						<FaFacebookF />
					</Button>
					<Button
						variant='outline-primary'
						className='rounded-circle mx-1'>
						<FaLinkedinIn />
					</Button>
					<Button
						variant='outline-primary'
						className='rounded-circle mx-1'>
						<FaTwitter />
					</Button>
				</div>
				<a
					href='mailto:radwansusan90@gmailcom'
					className='email-link'>
					<p>radwansusan90@gmail.com</p>
				</a>
				<p className='mt-2'>
					Copyright © 2024 Radwan Susan. All rights reserved.
				</p>
			</footer>
		</Container>
	);
};
export default HomePage;
