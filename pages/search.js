import { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import Navigation from '../components/navigation/Navigation';
import MovieCard from '../components/hub/MovieCard';

const Search = () => {
    const [title, setTitle] = useState();
    return (
        <>
        <Navigation/>
        <div className="Hub">
            <div className="Collection">
                <div className="Collection__search">
                    <form>
                        <input type="text" placeholder="SEARCH" onChange={e => setTitle(e.target.value)}/>
                        {/* <button type="submit">Search</button> */}
                    </form>
                </div>
                <div>
                    <Movies title={title}/>
                </div>
            </div>
        </div>
        </>
    )
}

function Movies({title}) {
    const url = `http://localhost:3000/api/movies/title/${title}`;
    const { data, error } = useSWR(url);

    if (error) return <ul>Error</ul>
    if (!data) return <ul>Loading...</ul>

    return (
        <ul className="Movies__list">
                    {data.data === undefined ? 
                    <li>No Results</li> :
                    data.data.map((movie) => (
                        <li key={movie._id} className="Movies__list--item">
                            <MovieCard id={movie._id} 
                              title={movie.title} 
                              views={movie.views} 
                              likes={movie.likeCount} 
                              dislikes={movie.dislikeCount}/>
                        </li>
                    ))}
                </ul>
    )
}



export default Search;