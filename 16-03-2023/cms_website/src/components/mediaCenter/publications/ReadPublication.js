import React, { useState, useLayoutEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../redux/actions";
import { Worker } from "@react-pdf-viewer/core";
import PDFReader from "./PDFReader";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import Grid from "@material-ui/core/Grid";
import useStyles from "../../../styles/components/mediaCenter/readPublication";
import { Typography } from "@material-ui/core";
import MainImage from "../../shared/mainImage/MainImage";
import { Box } from "@material-ui/core";
import { Container } from "@material-ui/core";
import HtmlParser from "html-react-parser";

const { getPostByAlias, byAliasReturned } = actions;

const ReadPublication = ({ match }) => {
  const { alias } = match.params;

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { postByAliasReturned } = useSelector((state) => state.posts_reducers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    const language = isRTL ? "ar" : "en";
    dispatch(getPostByAlias({ alias, language }));
  }, [alias, isRTL]);

  useLayoutEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (!postByAliasReturned.success) return;

    const returnedData = postByAliasReturned;
    setData(returnedData);
  }, [postByAliasReturned, alias]);

  const getFile = (files, isRTL) => {
    const file = files.find((file) => {
      if (file) {
        const { publishMode, extension } = file;

        if (isRTL && publishMode === 1 && extension.match(/^(.pdf)$/))
          return true;
        else if (!isRTL && publishMode === 2 && extension.match(/^(.pdf)$/))
          return true;
      }

      return false;
    });

    return {
      uuid: file ? file.uuid : "",
    };
  };

  const classes = useStyles();
  return (
    <Box>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={isRTL ? "المنشورات" : "publications"}
          link="/media/publications"
        />
      </Grid>
      <Container className={classes.root}>
        <Grid item xs={12}>
          {data && data?.title ? <h1>{HtmlParser(data?.title)}</h1> : null}
        </Grid>
        <Grid item xs={12}>
          {data && data?.files ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <PDFReader
                fileUrl={`/api/file/download/${
                  getFile(data.files, isRTL).uuid
                }`}
              />
            </Worker>
          ) : (
            <Typography variant="p" className={classes.description}>
              {isRTL ? "لا يجد ملف لعرضه" : "There is No File to Show"}
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(ReadPublication);
