import Link from 'next/link';

const MovieCard = (prop) => (
   <div>
      <div className="MovieCard">
         <div className="MovieCard__thumbnail">
            <Link href={"../../movie/" + prop.id}>
               <img src="/beauty.jpg" />
            </Link>
         </div>
         <div className="MovieCard__info">
            <div>
               <div className="MovieCard__info--title">
                  {prop.title}
               </div>
            </div>

            <div>
               <div className="MovieCard__info--view">
                  <img className="MoveCard__icon" src="/view.svg" />
               </div>
               <div className="MovieCard__info--likes">
               </div>
               <div className="MovieCard__info--dislikes">
               </div>
            </div>
         </div>
      </div>
   </div>
)

export async function getStaticProps() {
   const res = await fetch('https://localhost:3000/api/movies')
   const movies = await res.json();

   return { props: { movies } }
}

export default MovieCard;