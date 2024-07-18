import React from "react";
import { TextField as MuiTextField, Box } from "@mui/material";
import styles from "./Deliverables.module.css"; // Assuming you have some CSS for styling

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const Deliverables = ({ title, data, editMode, updateEditData, keyName }) => {
  const handleChange = (e) => {
    updateEditData(keyName, e.target.value);
  };

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className={styles.zoomContainer}>
        <button className={styles.zoomButtonR} onClick={() => zoomIn()}>+</button>
        <button className={styles.zoomButtonL} onClick={() => zoomOut()}>-</button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.cellLeft}>開発経験共有：</td>
            <td className={styles.cell}>
              {!editMode ? (
                <MuiTextField
                  value={data[0].link || ""}
                  // onChange={handleChange}
                  fullWidth
                  multiline
                />
              ) : (
                <div className={styles.cell}>{data[0].link}</div>
              )}
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cellLeft}>ソースコード：</td>
            <td className={styles.cell}>
              {editMode ? (
                <MuiTextField
                  value={data[0].codeLink || ""}
                  // onChange={handleChange}
                  variant="filled"
                  fullWidth
                  multiline
                />
              ) : (
                <div className={styles.cell}>{data[0].codeLink}</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <TransformWrapper>
        <TransformComponent>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="test"
            width="100%"
          />
        </TransformComponent>
        <Controls />
      </TransformWrapper>
      <Box>
        <img src="sample" alt="" />
      </Box>
      <div>{data[0].codeLink}</div>
      <div>{data[0].imageLink}</div>
      <div>{data[0].description}</div>
      <div>{data[0].role}</div>
    </div>
  );
};

export default Deliverables;
