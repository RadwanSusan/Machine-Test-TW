import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const popularPlaces = [
	{
		id: 1,
		name: 'Eiffel Tower',
		country: 'France',
		image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 2,
		name: 'Great Wall of China',
		country: 'China',
		image: 'https://images.unsplash.com/photo-1583405584623-58f4b7d1380f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 3,
		name: 'Taj Mahal',
		country: 'India',
		image: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 4,
		name: 'Machu Picchu',
		country: 'Peru',
		image: 'https://images.unsplash.com/photo-1568805746970-0bbae56ab18b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 5,
		name: 'Colosseum',
		country: 'Italy',
		image: 'https://images.unsplash.com/photo-1699012462295-bace478f27bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 6,
		name: 'Petra',
		country: 'Jordan',
		image: 'https://images.unsplash.com/photo-1708047905693-dadc069fce52?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 7,
		name: 'Christ the Redeemer',
		country: 'Brazil',
		image: 'https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: 8,
		name: 'Angkor Wat',
		country: 'Cambodia',
		image: 'https://images.unsplash.com/photo-1599283787923-51b965a58b05?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
];
const Slider = () => {
	const [index, setIndex] = useState(0);
	const [slides, setSlides] = useState([]);
	useEffect(() => {
		const shuffled = [...popularPlaces].sort(() => 0.5 - Math.random());
		setSlides(shuffled.slice(0, 5));
	}, []);
	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};
	return (
		<Carousel
			activeIndex={index}
			onSelect={handleSelect}
			prevIcon={<FaChevronLeft className='carousel-icon' />}
			nextIcon={<FaChevronRight className='carousel-icon' />}
			className='slider-500'>
			{slides.map((place) => (
				<Carousel.Item key={place.id}>
					<img
						className='d-block w-100'
						src={place.image}
						alt={place.name}
					/>
					<Carousel.Caption>
						<h3>{place.name}</h3>
						<p>{place.country}</p>
					</Carousel.Caption>
				</Carousel.Item>
			))}
		</Carousel>
	);
};
export default Slider;
