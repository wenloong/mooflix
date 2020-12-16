import Link from 'next/link';

const MovieCard = (prop) => {
   const imgUrl = `http://192.168.1.7:9870/webhdfs/v1/thumbnail/${prop.title}.jpg?op=OPEN&namenoderpcaddress=localhost:9000`;

   return (
      <div className="MovieCard">
         <div className="MovieCard__thumbnail">
            <Link href={"../../movie/" + prop.id}>
               <img src={imgUrl} />
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
                  <img className="MovieCard__icon" src="/view.svg" />
                  <p>{prop.views}</p>
               </div>
               <div className="MovieCard__info--likes">
                  <img className="MovieCard__icon" src="/like.svg"/>
                  <p>{prop.likes}</p>
               </div>
               <div className="MovieCard__info--dislikes">
                  <img className="MovieCard__icon" src="/dislike.svg"/>
                  <p>{prop.dislikes}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MovieCard;