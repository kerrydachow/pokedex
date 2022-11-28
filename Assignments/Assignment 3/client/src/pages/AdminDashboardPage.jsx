import React, { useEffect, useState } from "react";
import AdminDashboardPageContent from "../content/AdminDashboardPageContent";
import axiosJwt from "../lib/customAxios";

const AdminDashboardPage = () => {
  const [apiLogs, setApiLogs] = useState([]);
  useEffect(() => {
    axiosJwt
      .get("http://localhost:4000/api/v1/logs", {
        headers: {
          "auth-token-access": localStorage.getItem("access-token"),
        },
      })
      .then((res) => {
        console.log(res);
        setApiLogs(res);
      });
  }, []);
  return <AdminDashboardPageContent />;
};

export default AdminDashboardPage;
