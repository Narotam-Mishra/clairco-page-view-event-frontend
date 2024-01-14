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
        <button onClick={handleGenerateClick}>Generate Page View Event</button>

        {isButtonClicked && <PageEventViewTable />}
    </div>
  )
}

export default PageViewGenerator