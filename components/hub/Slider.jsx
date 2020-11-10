import styles from './../../styles/Slider.module.scss';

const Slider = (props) => (
   <div className={styles.slider}>
      <div className={styles.slider__title}>
         <h3>{props.title}</h3>
      </div>
      <div className={styles.slider__horizontal}>

      </div>
   </div>
)

export default Slider;