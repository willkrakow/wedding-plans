import React from "react";
import { navigate } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

interface Props {
    component: React.FC<any>;
    location: Location;
    [key: string]: any;
}


const PrivateRoute = ({ component: Component, location, ...rest }: Props) => {
  React.useEffect(() => {
    console.log(netlifyIdentity.currentUser());
    if (!netlifyIdentity.currentUser()) {
      
      navigate("/app/login");
    }
  }, []);
  return <Component {...rest} />;
};
export default PrivateRoute;
