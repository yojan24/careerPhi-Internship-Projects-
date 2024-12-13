import React, { useState } from "react";
import { TabView } from "../../components";
import Pending from "./Pending";
import Rejected from "./Rejected";
import Approved from "./Approved";

function MainApplication() {
  const [component, setComponent] = useState("Pending");

  return (
    <div className="py-2 min-h-[92vh]">
      <TabView setComponent={setComponent} component={component} />
      <div>
        {component === "Pending" ? (
          <Pending />
        ) : component === "Rejected" ? (
          <Rejected />
        ) : (
          <Approved />
        )}
      </div>
    </div>
  );
}

export default MainApplication;
