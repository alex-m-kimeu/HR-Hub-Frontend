import React, { useState } from "react";


export const LeaveAdmin = () => {

    return (
      <div>
        <div>
          <h1>Leave</h1>
          <button>Create time off</button>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Start date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
};