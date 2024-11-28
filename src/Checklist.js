import React, { useEffect, useState } from "react";
import axios from "axios";
import './Checklist.css'

const Checklist = () => {
  const [checklistResults, setChecklistResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChecklistResults();
  }, []);

  const fetchChecklistResults = async () => {
    try {
      const response = await axios.get("http://localhost:3000/checklist");
      setChecklistResults(response.data.results);
      setLoading(false);
    } catch (err) {
      setError("Failed to load checklist data.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Checklist Results</h1>
      <table>
        <thead>
          <tr>
            <th className="rule">Rule</th>
            <th className="status">Status</th>
          </tr>
        </thead>
        <tbody>
          {checklistResults.map((rule, index) => (
            <tr key={index}>
              <td className="rule-name">{rule.name}</td>
              <td
                style={{
                  color: rule.status === "Passed" ? "green" : "red",fontWeight: '700'
                }}
              >
                {rule.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checklist;
