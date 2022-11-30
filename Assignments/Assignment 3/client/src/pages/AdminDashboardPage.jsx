import React, { useEffect, useState } from "react";
import AdminDashboardPageContent from "../content/AdminDashboardPageContent";
import axiosJwt from "../lib/customAxios";

const AdminDashboardPage = () => {
  const [apiLogs, setApiLogs] = useState([]);
  const [apiErrorLogs, setApiErrorLogs] = useState([]);
  const [api400Logs, setApi400Logs] = useState([]);
  useEffect(() => {
    axiosJwt
      .get("http://localhost:4000/api/v1/logs", {
        headers: {
          "auth-token-access": localStorage.getItem("access-token"),
        },
      })
      .then((res) => {
        setApiLogs(res.data);
      });
    axiosJwt
      .get("http://localhost:4000/api/v1/errorLogs", {
        headers: {
          "auth-token-access": localStorage.getItem("access-token"),
        },
      })
      .then((res) => {
        setApiErrorLogs(res.data);
      });
    axiosJwt
      .get("http://localhost:4000/api/v1/errorLogs400", {
        headers: {
          "auth-token-access": localStorage.getItem("access-token"),
        },
      })
      .then((res) => {
        setApi400Logs(res.data);
      });
  }, []);
  return <AdminDashboardPageContent logs={apiLogs} errorLogs={apiErrorLogs} errorLogs400={api400Logs} />;
};

export default AdminDashboardPage;
