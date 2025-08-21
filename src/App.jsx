import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TasksPage from "@/components/pages/TasksPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="toast"
          bodyClassName="toast-body"
          progressClassName="toast-progress"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;