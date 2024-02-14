import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for menu and close

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const handleToggle = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);
	const isActive = (path) => location.pathname === path;

	return (
		<NavBarContainer>
			<NavSection>
				<Link to='/' onClick={handleClose}>
					<NavItem active={isActive('/')}>Home</NavItem>
				</Link>
				<Link to='/profile' onClick={handleClose}>
					<NavItem active={isActive('/profile')}>Profile</NavItem>
				</Link>
				<Link to='/LogIn' onClick={handleClose}>
					<NavItem active={isActive('/LogIn')}>Sign Out</NavItem>
				</Link>
			</NavSection>
			<MenuIcon onClick={handleToggle}>
				{isOpen ? <FaTimes /> : <FaBars />}
			</MenuIcon>
			{isOpen && (
				<MobileNavItems>
					<Link to='/' style={linkStyle} onClick={handleClose}>
						<NavItem isActive={isActive('/')}>Home</NavItem>
					</Link>
					<Link to='/profile' style={linkStyle} onClick={handleClose}>
						<NavItem isActive={isActive('/profile')}>Profile</NavItem>
					</Link>
					<Link to='/LogIn' style={linkStyle} onClick={handleClose}>
						<NavItem isActive={isActive('/LogIn')}>Sign Out</NavItem>
					</Link>
				</MobileNavItems>
			)}
		</NavBarContainer>
	);
};

const NavBarContainer = styled.nav`
	background-color: #333;
	color: white;
	display: flex;
	justify-content: space-between; // Adjust for space between items
	align-items: center;
	padding: 10px 20px;
	position: relative;

	@media (max-width: 768px) {
		flex-direction: column; // Stack items vertically
		align-items: flex-start; // Align to the start for mobile view
	}
`;
const NavSection = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;

const MobileNavItems = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		background-color: #333;
		width: 100%;
		align-items: center;
		z-index: 10;
	}
`;

const NavItem = styled.div`
	cursor: pointer;
	margin: 10px 20px;
	padding: 10px 15px;
	border-radius: 4px;
	transition: background-color 0.3s, color 0.3s;
	background-color: ${({ active }) =>
		active ? '#114b5f' : 'transparent'}; /* Blue background for active item */
	color: ${({ active }) => (active ? 'white' : 'gray')};

	&:hover {
		background-color: #114b5f; /* Blue background on hover */
		color: white;
	}
`;

const MenuIcon = styled.div`
	display: none;
	cursor: pointer;
	font-size: 1.5rem;

	@media (max-width: 768px) {
		display: block;
	}
`;

const linkStyle = {
	textDecoration: 'none',
	color: 'white',
};

export default NavBar;
