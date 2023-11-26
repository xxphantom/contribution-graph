import ContributionGraph from '../ContributionGraph/ContributionGraph'; // Ваш компонент графика
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './GraphWrapper.module.scss';

const months = Array.from({ length: 12 })
  .map((_, i) => format(new Date(0, i - 12 - 1), 'LLL', { locale: ru }))
  .map((month) => month.replace(/^./, (ch) => ch.toLocaleUpperCase()));

const levels = Array.from({ length: 4 }).map((_, i) => i + 1);

const GraphWrapper = () => (
  <div className={styles.root}>
    <div className={styles.months}>
      {months.map((month, i) => (
        <span key={i}>{month}</span>
      ))}
    </div>
    <div className={styles.graph}>
      <div className={styles.days}>
        <div className={styles['days-monday']}>Пн</div>
        <div className={styles['days-wednesday']}>Ср</div>
        <div className={styles['days-friday']}>Пт</div>
      </div>
      <ContributionGraph />
    </div>
    <div className="">
      <div className={styles.legend}>
        <span className={styles['legend-less']}>Меньше</span>
        {levels.map((num) => (
          <div key={num} className={styles[`lvl${num}`]}></div>
        ))}
        <span className={styles['legend-more']}>Большe</span>
      </div>
    </div>
  </div>
);

export default GraphWrapper;
