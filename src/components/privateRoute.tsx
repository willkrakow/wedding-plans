import React from "react";
import { navigate } from "gatsby";

interface Props {
    component: React.FC<any>;
    location: Location;
    isLoggedIn: boolean;
    [key: string]: any;
}

const isBrowser = typeof window !== "undefined";
const PrivateRoute = ({ component: Component, user, isLoggedIn, location, ...rest }: Props) => {
  React.useEffect(() => {
    if(isBrowser && !isLoggedIn) {
      navigate('/app/login')
    }
  }, [user, isLoggedIn]);
  return isLoggedIn ? (
    <Component {...rest} user={user} />
  ) : <div>log in please</div>
};
export default PrivateRoute;
