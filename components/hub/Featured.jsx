const Featured = () => (
   <div className="Featured">
      <div className="Featured__image">
         <img src="/endgame.jpg"/>
      </div>
      <div className="Featured__overlay">
         <div className="Featured__overlay--image">
            <img src="/avegerslogo.png" alt="Featured Image"/>
         </div>
         <div className="Featured__overlay--button">
            <button className="Button__primary">Play</button>
            <button className="Button__secondary">Details</button>
         </div>
      </div>
   </div>
);

export default Featured;