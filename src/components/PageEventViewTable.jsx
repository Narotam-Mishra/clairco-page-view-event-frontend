import axios from 'axios';
import { useState } from 'react';
import '../styles/PageViewTable.css'
import cuid from 'cuid';
import { loremIpsum } from 'lorem-ipsum';
import { randomDate } from '../utilities/randomDate';


const PageEventViewTable = () => {
  const [pageViews, setPageViews] = useState([]);
  const [error, setError] = useState(null);

  const upEventData = {
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

  const fetchPageViews = async () => {
    try {
      const response = await axios.get('http://localhost:7373/api/v1/pageView');
      setPageViews(response.data);
      setError(null); // Reset error if fetching is successful
    } catch (error) {
      console.error('Error fetching page views:', error);
      setError('Error fetching page views. Please try again.'); // Set error message
    }
  };

  const updateTableData = async () => {
    try {
      // Call the API endpoint to update all data
      await axios.patch('http://localhost:7373/api/v1/pageView', upEventData);
      console.log('All data updated successfully');
      // After updating, fetch the updated data
      fetchPageViews();
    } catch (error) {
      console.error('Error updating all data:', error);
    }
  };

  return (
    <div>
      <h2>Page View Events</h2>
      <button className='btn' onClick={fetchPageViews}>Fetch Page View Data</button>

      {error ? (
        <h2 style={{ color: 'red', marginTop: '10px' }}>{error}</h2>
      ) : (
        pageViews.length > 0 && (
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Timestamp</th>
                <th>User ID</th>
                <th>User Created At</th>
                <th>Title</th>
                <th>Description</th>
                {/* <th>Tags</th> */}
              </tr>
            </thead>
            <tbody>
              {pageViews.map((event) => (
                <tr key={event._id}>
                  {/* <td>{event.id}</td> */}
                  <td>{event.timestamp}</td>
                  <td>{event.user.id}</td>
                  <td>{event.user.created_at}</td>
                  <td>{event.page.title}</td>
                  <td>{event.page.description}</td>
                  {/* <td>{event.page.tags.join(', ')}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      { pageViews.length > 0 && <button onClick={updateTableData} className='updateBtn'>Update Table Data</button>}
    </div>
  );
};

export default PageEventViewTable;
