import React from "react";
import { navigate } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

interface Props {
    component: React.FC<any>;
    location: Location;
    [key: string]: any;
}


const PrivateRoute = ({ component: Component, location, ...rest }: Props) => {
  if (!netlifyIdentity.currentUser() && location.pathname !== `/app/login`) {
    navigate("/app/login");
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
