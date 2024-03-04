//here export a func that basically registers the app using single spa react pkg
//routing and all we have to handle in remote app itself
//need to share history obj i think(we need to rethink the routing part)

import { registerApplication,start } from "single-spa";

export default (queryClient) => {

  const userType = Digit.UserService.getType();


  // registerApplication({
  //   name: "Workbench",
  //   app: () => import("workbench/WorkbenchModule"),
  //   activeWhen: "/workbench-ui/employee/workbench",
  //   customProps: {
  //     title: "Workbench is running on host",
  //     queryClient,
  //     userType
  //   },
  // });


  registerApplication({
    name: "Common",
    app: () => import("common/CommonModule"),
    activeWhen: `/workbench-ui/${userType}/common`, //change to userType here
    customProps: {
      title: "Common Module is running on host",
      queryClient,
      userType
    },
  });


  start();
}

