import React, { useState } from 'react';
import Movie from './Movie'; // Import your Movies component
import Searchfield2 from './Searchfield2'; // Import your SearchMovies component

function Frontpage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showMovies, setShowMovies] = useState(true);

    const handleSearch = (searchTerm) => {
        // Perform the search and update searchResults state
        setSearchResults([...]);

        // Hide the Movies component when a search is active
        setShowMovie(false);
    };

    const handleClearSearch = () => {
        // Clear the search results and show the Movies component again
        setSearchResults([]);
        setShowMovies(true);
    };

    return (
        <div>
            {/* SearchMovies component */}
            <Searchfield2
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
            />

            {/* Conditionally render the Movies component */}
            {showMovies && <Movie />}

            {/* Display search results when available */}
            {searchResults.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    {/* Render search results here */}
                </div>
            )}
        </div>
    );
}

export default Frontpage;
