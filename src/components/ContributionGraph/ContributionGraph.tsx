import React from 'react';
import { eachDayOfInterval, sub, format, getDay, endOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ContributionGraph.module.scss';
import GraphElement from '../GraphElement/GraphElement';
import { useGraphData } from './hooks/useGraphData';

export type FormattedDates = {
  dateString: string;
  dayOfWeek: number;
  formattedDate: string;
};

const prepareDates = (): FormattedDates[] => {
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const start = sub(end, { days: 356 });
  const dates = eachDayOfInterval({ start, end });

  const formattedDates = dates.map((date) => ({
    dateString: format(date, 'yyyy-MM-dd'),
    dayOfWeek: ((getDay(date) + 6) % 7) + 1,
    formattedDate: format(date, 'EEEE, LLLL d, yyyy', { locale: ru })
      .split(' ')
      .map(([first, ...rest]) => first.toLocaleUpperCase() + rest.join(''))
      .join(' '),
  }));

  return formattedDates;
};

const timeLine = prepareDates();

const ContributionGraph: React.FC = () => {
  const contributions = useGraphData();

  return (
    <div className={styles['contribution-graph']}>
      {timeLine.map(({ dateString, dayOfWeek, formattedDate }) => (
        <GraphElement
          key={dateString}
          dateString={dateString}
          dayOfWeek={dayOfWeek}
          formattedDate={formattedDate}
          contribution={contributions[dateString] || null}
        />
      ))}
    </div>
  );
};

export default ContributionGraph;
