import axios from 'axios';
import { useState } from 'react';
import '../styles/PageViewTable.css'
import cuid from 'cuid';
import { loremIpsum } from 'lorem-ipsum';
import { randomDate } from '../utilities/randomDate';


const PageEventViewTable = () => {
  // used same code from github repo for event data
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

  // Read operation --> fetch event data on click of 'Fetch Page View Data' button
  const fetchPageViews = async () => {
    try {
      const response = await axios.get('https://clairco-page-view-backend.onrender.com/api/v1/pageView');
      setPageViews(response.data);
      // Reset error if fetching is successful
      setError(null); 
    } catch (error) {
      console.error('Error fetching page views:', error);
      setError('Error fetching page views. Please try again.'); // Set error message
    }
  };

  // Update PageView Event Table Data on click of 'Update Table Data' button
  const updateTableData = async () => {
    try {
      // Call the API endpoint to update all data
      await axios.patch('https://clairco-page-view-backend.onrender.com/api/v1/pageView', upEventData);
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

      {/* render page view event data into table  */}
      {error ? (
        <h2 style={{ color: 'red', marginTop: '10px' }}>{error}</h2>
      ) : (
        pageViews.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User ID</th>
                <th>User Created At</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {pageViews.map((event) => (
                <tr key={event._id}>
                  <td>{event.timestamp}</td>
                  <td>{event.user.id}</td>
                  <td>{event.user.created_at}</td>
                  <td>{event.page.title}</td>
                  <td>{event.page.description}</td>
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
