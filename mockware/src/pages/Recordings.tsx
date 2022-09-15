import React from "react";
import NotFound from "../component/NotFound";

const Recordings = () => {
  return (
    <React.Fragment>
      <div className="page">
        <div>
          <h1>Recordings</h1>
          <NotFound
            title="Stub recordings"
            message="Stub recording will allow you to record the requests and responses and then use them as stubs.
             We are still working on this feature."
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recordings;
