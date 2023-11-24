import React, { useState, useLayoutEffect } from 'react';
import { eachDayOfInterval, sub, format, getDay, endOfWeek } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './Graph.module.scss';
import GraphElement from '../GraphElement/GraphElement';

export type FormattedDates = {
  dateString: string;
  date: Date;
  dayOfWeek: number;
};

const prepareDates = (): FormattedDates[] => {
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const start = sub(end, { days: 356 });
  const dates = eachDayOfInterval({ start, end });

  const formattedDates = dates.map((date) => ({
    dateString: format(date, 'yyyy-MM-dd'),
    date,
    dayOfWeek: ((getDay(date) + 6) % 7) + 1,
  }));

  return formattedDates;
};

const timeLine = prepareDates();

const Graph: React.FC = () => {
  const [contributions, setContributions] = useState<Record<string, number>>({});

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dpg.gg/test/calendar.json');
        const jsonData = await response.json();
        setContributions(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles['contribution-graph']}>
      {timeLine.map(({ date, dateString, dayOfWeek }) => (
        <GraphElement
          key={dateString}
          date={date}
          dateString={dateString}
          dayOfWeek={dayOfWeek}
          contribution={contributions[dateString] || null}
        />
      ))}
      <Tooltip id="contrib-tooltip" />
    </div>
  );
};

export default Graph;
