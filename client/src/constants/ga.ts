import ReactGA from 'react-ga';

const trackingId = "UA-164242824-13"; 
const GA_FLAG = (process.env.GA_FLAG === 'true') || true;
ReactGA.initialize(trackingId, { titleCase: false, debug: (!GA_FLAG) });

export default ReactGA;