import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [pageNo, setPageNo] = useState(1);
  let [data, setData] = useState([]);
  let [rowList, setRowList] = useState([]);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(10);
  let maxRowPerPage = 10;
  useEffect(() => {
    fetch(
      " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      let list = [];
      for (let i = start; i < end; i++) {
        let row = (
          <tr key={data[i].id} className="row">
            <td>{data[i].id}</td>
            <td>{data[i].name}</td>
            <td>{data[i].email}</td>
            <td>{data[i].role}</td>
          </tr>
        );
        list.push(row);
      }
      setRowList(list);
    }
  }, [start, end, data]);
  let nextHandler = (e) => {
    if (end + maxRowPerPage <= data.length) {
      let oldEnd = end;
      setEnd(end + maxRowPerPage);
      setStart(oldEnd);
      setPageNo(pageNo + 1);
    } else {
      let oldEnd = end;
      setEnd(data.length);
      setStart(oldEnd);
      setPageNo(pageNo + 1);
    }
  };
  console.log("Start-> ", start, "  End-> ", end);
  let prevHandler = (e) => {
    if (pageNo > 0) {
      setEnd(start);
      setStart(start - maxRowPerPage);
      setPageNo(pageNo - 1);
    }
  };
  return (
    <div className="mainDiv">
      <h1>Employee Data Table</h1>
      <div className="tableDiv">
        <table>
          <tr className="tableHeader">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          {rowList}
        </table>
      </div>
      <div className="btnDiv">
        <button
          type="button"
          disabled={start === 0 ? true : false}
          onClick={prevHandler}
          className="controlElement"
        >
          Previous
        </button>
        <span className="controlElement">{pageNo}</span>
        <button
          type="button"
          disabled={end === data.length ? true : false}
          onClick={nextHandler}
          className="controlElement"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
