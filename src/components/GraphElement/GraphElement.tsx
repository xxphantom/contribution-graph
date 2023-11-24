import { FormattedDates } from '../ContributionGraph/ContributionGraph';
import cn from 'classnames';
import styles from './GraphElement.module.scss';
import { Tooltip } from 'react-tooltip';

type Contribution = {
  contribution: number | null;
};

type GraphElementProps = FormattedDates & Contribution;

const getLevel = (count: number | null) => {
  if (count === null) {
    return '0';
  }

  if (count <= 9) {
    return '1';
  }

  if (count >= 10 && count <= 19) {
    return '2';
  }

  if (count >= 20 && count <= 29) {
    return '3';
  }

  if (count >= 30) {
    return '4';
  }
};

const GraphElement: React.FC<GraphElementProps> = (props) => {
  const { dateString, dayOfWeek, formattedDate, contribution } = props;

  return (
    <>
      <div
        key={dateString}
        className={cn(styles['day-cell'], { [styles[`lvl${getLevel(contribution)}`]]: !!contribution })}
        style={{ gridRow: dayOfWeek }}
        data-tooltip-id={dateString}
      ></div>
      <Tooltip id={dateString} openOnClick>
        <div className={styles.tooltip}>
          <span className={styles.contributions}>{contribution || 'No'} contributions</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </Tooltip>
    </>
  );
};

export default GraphElement;
