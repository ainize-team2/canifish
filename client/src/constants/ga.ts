import ReactGA from 'react-ga';

const trackingId = "UA-164242824-13"; 
const GA_FLAG = true;

ReactGA.initialize(trackingId, { titleCase: false, testMode: (!GA_FLAG) });

export default ReactGA;