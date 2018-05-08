import React from 'react';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboard/InfoBox';
import NewOrders from '../components/dashboard/NewOrders';
import MonthlySales from '../components/dashboard/MonthlySales';
import BrowserUsage from '../components/dashboard/BrowserUsage';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';
import Data from '../data';

const DashboardPage = () => {

  return (
    <div>
      <h3 style={globalStyles.navigation}> Dashboard</h3>
      {/*<div className="row">
        <div className="col-sm-2">
          <SelectField
              floatingLabelText="Lenjuaje"
              value=""
              fullWidth={true}>
              <MenuItem key={0} primaryText="Python"/>
              <MenuItem key={1} primaryText="C"/>
              <MenuItem key={2} primaryText="Java"/>
            </SelectField>
          </div>
        </div> */ }
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md m-b-15">
          <NewOrders data={Data.dashBoardPage.newOrders}/>
        </div>
        
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15">
          <MonthlySales data={Data.dashBoardPage.monthlySales}/>
        </div>
      </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <BrowserUsage data={Data.dashBoardPage.browserUsage}/>
        </div>
      </div>
  );
};

export default DashboardPage;