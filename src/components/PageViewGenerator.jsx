import { useState } from 'react';
import '../styles/PageViewGenerator.css'
import usePageViewEventGenerator from '../hook/usePageViewEventGenerator'
import PageEventViewTable from './PageEventViewTable';

const PageViewGenerator = () => {
  const { generate } = usePageViewEventGenerator();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleGenerateClick = () => {
    generate();
    setIsButtonClicked(true);
  };

  return (
    <div>
        <h2>Page View Event Generator</h2>
        {/* generate page view data event on click of 'Generate Page View Event' button */}
        <button onClick={handleGenerateClick}>Generate Page View Event</button>

        {/* conditionally render PageEventViewTable */}
        {isButtonClicked && <PageEventViewTable />}
    </div>
  )
}

export default PageViewGenerator