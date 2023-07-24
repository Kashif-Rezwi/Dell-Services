import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import Statistics from "../pages/Statistics";
import Learnings from "../pages/Learnings";
import Parts from "../pages/Parts";
import Home from "../pages/Home";
import { PrivateRoutes } from "./PrivateRoutes";
import SinglePartPage from "../pages/SinglePartPage";

function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      ;
      <Route path="/register" element={<Register />} />;
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/parts"
        element={
          <PrivateRoutes>
            <Parts />
          </PrivateRoutes>
        }
      />
      <Route
        path="/parts/:part_id"
        element={
          <PrivateRoutes>
            <SinglePartPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/report-and-statistics"
        element={
          <PrivateRoutes>
            <Statistics />{" "}
          </PrivateRoutes>
        }
      />
      <Route
        path="/learning-materials"
        element={
          <PrivateRoutes>
            <Learnings />
          </PrivateRoutes>
        }
      />
      ;
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default AllRoutes;
