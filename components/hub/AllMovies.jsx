import MovieCard from './MovieCard';
import { useState } from 'react';

const AllMovies = (props) => {
    return (
        <div className="Collection">
            <div className="Collection__title">
                <h3>ALL MOVIES</h3>
            </div>
            <div className="Movies">
                <ul className="Movies__list">
                    {props.movies.map((movie) => (
                        <li key={movie._id} className="Movies__list--item">
                            <MovieCard id={movie._id}
                                title={movie.title}
                                views={movie.views}
                                likes={movie.likeCount}
                                dislikes={movie.dislikeCount} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AllMovies;

