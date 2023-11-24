import { FormattedDates } from '../Graph/Graph';
import cn from 'classnames';
import styles from './GraphElement.module.scss';

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
  const { date, dateString, dayOfWeek, contribution } = props;

  return (
    <div
      key={dateString}
      className={cn(styles['day-cell'], { [styles[`lvl${getLevel(contribution)}`]]: !!contribution })}
      style={{ gridRow: dayOfWeek }}
      data-tooltip-id={contribution ? 'contrib-tooltip' : undefined}
      data-tooltip-content={contribution ? String(contribution) : undefined}
      data-tooltip-place={contribution ? 'top' : undefined}
    ></div>
  );
};

export default GraphElement;
