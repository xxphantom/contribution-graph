import { useEffect, useState } from 'react';

const apiURL = 'https://dpg.gg/test/calendar.json';

type GraphData = Record<string, number>;

export const useGraphData = (): GraphData => {
  const [contributions, setContributions] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const jsonData = await response.json();
        setContributions(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return contributions;
};
