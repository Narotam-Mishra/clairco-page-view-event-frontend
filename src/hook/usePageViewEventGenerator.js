import cuid from 'cuid';
import { loremIpsum } from 'lorem-ipsum';
import { useState } from 'react';
import { randomDate } from '../utilities/randomDate';
import axios from 'axios';

const usePageviewGenerator = () => {
  const [pageview, setPageview] = useState(null);

  const generate = async () => {
    const event = {
      id: cuid(),
      created_at: new Date(),
      page: {
        title: loremIpsum(),
        description: loremIpsum({ count: 3 }),
        tags: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
          loremIpsum({ units: 'words', count: 1 })
        ),
      },
      user: {
        id: `USER${cuid()}`,
        created_at: randomDate(new Date(2019, 0, 1), new Date()),
      },
    };

    try {
      // Send the page view event data to the server
      await axios.post('http://localhost:7373/api/v1/pageView', event);
      setPageview(event);
    } catch (error) {
      console.error('Error sending page view event:', error);
    }
  };

  return {
    generate,
    pageview,
  };
};

export default usePageviewGenerator;
