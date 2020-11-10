import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
// pages for this product

import LandingPage from "./views/LandingPage/LandingPage"

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
   
      <div className="content_wrapper" style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
