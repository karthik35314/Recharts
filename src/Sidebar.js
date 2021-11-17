import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="lside text-center ">
      <Link className="text" to="/"> users </Link>
      <Link className="text gap"   to="/Chart"> Bar chart </Link>
      <Link className="text"  to="/Piechart"> Pie chart </Link>
    </div>
  );
};
