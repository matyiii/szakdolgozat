import { useState } from 'react';
import { Form, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	/* State */
	const [inputValue, setInputValue] = useState('');

	/* Hook */
	const navigate = useNavigate();

	/* Function */
	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleFormSubmit = () => {
		if (inputValue.trim()) {
			navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
			setInputValue('');
		}
	};

	return (
		<Form onSubmit={handleFormSubmit}>
			<Form.Group controlId='search_bar'>
				<InputGroup inside>
					<Form.Control name='search_bar' placeholder='Search PrintIT' onChange={handleInputChange} value={inputValue} />
					<InputGroup.Addon className='cursor-pointer'>
						<SearchIcon onClick={handleFormSubmit} />
					</InputGroup.Addon>
				</InputGroup>
			</Form.Group>
		</Form>
	);
};

export default SearchBar;
