import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import { resetVisualizationQuery } from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

// Sets graph to render based on the user's selection of buttons on the page
function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  // Sets graph view to "time series" if none is selected
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  // Sets map to render to the correct component
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  // Helper for axios requests to grab info from the API
  async function getSummary(reqUrl, years, type, office) {

    // Declare params
    let paramsObj = {
      params: {
        from: years[0],
        to: years[1],
      },
    };

    // Add the office param (if applicable)
    if (office && office !== 'all') {
      paramsObj.params.office = office;
    }

    // Execute the request
    return await axios
      .get(`${reqUrl}/${type}Summary`, paramsObj )
      .then(result => {
        return result.data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Updates state with the requested data from the API
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    
    // Structure return from API request, and send it with helper getSummary(), with given params
    let reqUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    let fiscalSummary = await getSummary(reqUrl, years, 'fiscal', office);
    let citizenshipSummary = await getSummary(reqUrl, years, 'citizenship', office);

    fiscalSummary.citizenshipResults = citizenshipSummary;

    stateSettingCallback(view, office, [fiscalSummary]);

  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
