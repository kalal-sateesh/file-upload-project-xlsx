import { useState } from "react";
import "./App.css";
import { ExcelRenderer } from "react-excel-renderer";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData, updateData } from "./AppSlice";

function App() {
  const [tableData, setTableData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [tData1, setTData1] = useState("");
  const [tData2, setTData2] = useState("");

  const dispatch = useDispatch();

  const reduxData = useSelector((state) => state.data.data);


  // console.log(tableData);

  const fileTypecheck = (str) => {
    let fileType = "";
    let strArr = str.split(".");
    // console.log(strArr, typeof strArr);
    let fileExtension = strArr[1];
    for (let key of fileExtension) {
      fileType += key;
    }
    if (fileType === "xlsx") {
      return true;
    }
    return false;
  };

  const handleFileUpload = () => {
    dispatch(clearData());
    // const file = e.target.files[0];
    // const filename = file.name.split(".");
    // let fileExtension = filename[1];
    // let str = "";
    // for (let key of fileExtension) {
    //   str += key;
    // }
    // if (!(str === "xlsx")) {
    //   setTableData([]);
    //   alert("Please select a valid Excel file");
    //   return;
    // }
    // ExcelRenderer(file, (err, res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     let count = 1;
    //     let id = 0;
    //     const data = [];
    //     res.rows.map((ele) => {
    //       id++;
    //       let obj = {};
    //       obj["id"] = id;
    //       ele.map((td) => {
    //         obj[`td${count}`] = td;
    //         if (count > ele.length - 1) {
    //           count = 0;
    //         }
    //         count++;
    //       });
    //       data.push(obj);
    //     });
    //     setTableData(data);
    //     dispatch(addData(data));
    //   }
    // });

    const file = tableData;
    // console.log(file.name);
    // fileTypecheck(file.name);
    if (fileTypecheck(file.name)) {
      ExcelRenderer(file, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(resp)
          let count = 1;
          let id = 0;
          let data = [];
          resp.rows.map((ele) => {
            // console.log(ele);
            id++;
            let obj = {};
            obj["id"] = id;
            ele.map((td) => {
              obj[`td${count}`] = <td>{td}</td>;
              if (count > ele.length - 1) {
                count = 0;
              }
              // console.log(obj);
              count++;
            });
            // console.log(obj);
            data.push(obj);
          });
          // console.log(data);
          // setTableData(data);
          dispatch(addData(data));
        }
      });
    } else {
      alert("Please choose a valid excel file");
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setTData1(item.td1);
    setTData2(item.td2);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSave = (index) => {
    // console.log(index);
    dispatch(
      updateData({
        index: index,
        td1: tData1,
        td2: tData2,
      })
    );
    setIsEdit(false);
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => setTableData(e.target.files[0])}
        style={{ backgroundColor: "rgb(61, 218, 218)" }}
      />
      <br></br>
      <br></br>
      <button onClick={handleFileUpload} className="uploadBtn">
        UPLOAD
      </button>
      <table border="1">
        {reduxData.map((item, index) => {
          return (
            <tr key={index}>
              {Object.values(item)}
              {/* {index === 0 && (
                <>
                  {" "}
                  <th>{item.td1}</th> <th>{item.td2}</th>{" "}
                </>
              )}
              {index > 0 && (
                <>
                  <td>
                    {!isEdit ? (
                      item.td1
                    ) : (
                      <input
                        defaultValue={item.td1}
                        onChange={(e) => setTData1(e.target.value)}
                      />
                    )}
                  </td>
                  <td>
                    {!isEdit ? (
                      item.td2
                    ) : (
                      <input
                        defaultValue={item.td2}
                        onChange={(e) => setTData2(e.target.value)}
                      />
                    )}
                  </td>
                  <td>
                    {isEdit ? (
                      <>
                        <button onClick={handleCancel} className="button">
                          Cancel
                        </button>{" "}
                        <button
                          onClick={() => handleSave(index)}
                          className="button"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="button"
                        onClick={() => handleEdit(item, index)}
                      >
                        EDIT
                      </button>
                    )}
                  </td>
                </>
              )} */}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
