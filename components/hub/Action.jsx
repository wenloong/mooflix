import MovieCard from './MovieCard';

const Action = (props) => {
    return (
        <div className="Collection">
            <div className="Collection__title">
                <h3>{props.group}</h3>
            </div>
            <div className="Slider">
                <ul className="Slider__list">
                    {props.movies.map((movie) => (
                        <li key={movie._id} className="Slider__list--item">
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

export default Action;

