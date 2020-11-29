import MovieCard from './MovieCard';

const Collection = (props) => (
   <div className="Collection">
      <div className="Collection__title">
         <h3>TRENDING</h3>
      </div>
      <div className="Slider">
         <ul className="Slider__list">
            {props.movies.map((movie) => (
               <li key={movie._id} className="Slider__list--item">
                  <MovieCard id={movie._id} title={movie.title}/>
               </li>
            ))}
         </ul>
      </div>
   </div>
)

export default Collection;

