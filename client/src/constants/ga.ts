import ReactGA from 'react-ga';

const trackingId = "UA-164242824-13"; 
ReactGA.initialize(trackingId, { titleCase: false });

export default ReactGA;