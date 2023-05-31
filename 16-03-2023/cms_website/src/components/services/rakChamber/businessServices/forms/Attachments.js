import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DarpzoneAllTypes from "../../../../drapZone/DarpzoneAllTypes";
import { Grid, Typography, Divider, Box, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import actions from "../../../../../redux/actions";
import { PinDropSharp } from "@material-ui/icons";

const { uploadRakFile, uploadRakFileDone, rakFileDetails } = actions;

export default function Attachment(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const requiredSize = 30; //MB
  const step = 1024;
  const dispatch = useDispatch();
  const { APIServices } = useSelector((state) => state);
  const getFileSize = (sizeInBytes) => {
    if (sizeInBytes < step) return `${sizeInBytes.toFixed(3)} Bytes`;

    let sizeInKiloBytes = sizeInBytes / step;
    if (sizeInKiloBytes < step) return `${sizeInKiloBytes.toFixed(3)} KB`;

    let sizeInMegaBytes = sizeInKiloBytes / step;
    if (sizeInMegaBytes < step) return `${sizeInMegaBytes.toFixed(3)} MB`;
  };
  const handleFileUpload = () => {
    let data = new FormData();
    data.append("file", selectedFile);
    data.append("url", props.url);
    dispatch(
      uploadRakFile({
        body: {
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
    );
  };

  useEffect(() => {
    const result = APIServices.uploadRakFileDone;
    if (result.file_name) {
      const filesDetails = [];
      filesDetails.push({
        classification_code: props.classification_code,
        file_size: selectedFile?.size,
        file_name: result.file_name,
      });
      setFileDetails(filesDetails);
      dispatch(rakFileDetails({ data: filesDetails }));
      // let newCooAttach = [...cooAttachment];
      // newCooAttach.push({
      //   // request_code: hsItem.hs_code,
      //   request_type_code: 50,
      //   classification_code: classification_code,
      //   file_name: fileName,
      //   file_size: values.weight,
      //   company_code: profile ? profile.company_code : "",
      //   inserted_by:profile ? profile.contact_name:"",
      //   request_type: values.total_price,
      // });
      // setCooAttachment(newCooAttach);
    }
  }, [APIServices.uploadRakFileDone]);

  useLayoutEffect(() => {
    return () => dispatch(uploadRakFileDone({ data: {} }));
  }, []);

  return (
    <Grid container>
      <Grid item container xs={2}>
        <DarpzoneAllTypes
          acceptedFiles={["application/pdf"]}
          noNamesPreview={true}
          title={"Please upload required transaction file "}
          onChange={async (files) => {
            if (files.length) {
              if (files[0].size > requiredSize * step * step) {
                alert("too big");
                return;
              }
              setSelectedFile(files[0]);
            }
          }}
        />
      </Grid>
      {selectedFile && (
        <>
          <Grid item container xs={6}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="center"
              margin="auto"
            >
              <Box>{selectedFile.name}</Box>
              <Box>{getFileSize(selectedFile.size)}</Box>
            </Box>
          </Grid>
          <Grid item container xs={4}>
            <Box>
              <Button
                style={{ backgroundColor: " #999999", color: "#fff" }}
                onClick={handleFileUpload}
              >
                Upload
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}
