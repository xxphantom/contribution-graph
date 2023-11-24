import React, { useState, useLayoutEffect } from 'react';
import { eachDayOfInterval, sub, format, getDay, endOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ContributionGraph.module.scss';
import GraphElement from '../GraphElement/GraphElement';

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
    formattedDate: format(date, 'EEEE, LLLL d, yyyy', { locale: ru }),
  }));

  return formattedDates;
};

const timeLine = prepareDates();

const ContributionGraph: React.FC = () => {
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
