import React, {
  memo,
  useMemo,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { useTranslation } from "react-i18next";
import { uid } from "react-uid";
import Pagination from "@material-ui/lab/Pagination";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import { pagination } from "../../shared/utils";
import MediaCard from "../../../components/shared/cards/MediaCard";
import useStyles from "../../../styles/components/mediaCenter/news";
import actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const { getAllPosts, loadingAction } = actions;
function LastNews() {
  const { t } = useTranslation();
  const { news: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const [data, setData] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let sort = "news";
    const language = isRTL ? "ar" : "en";
    dispatch(loadingAction({ loading: true }));

    dispatch(
      getAllPosts({
        sort,
        isFeatured: false,
        language,
        limit: 6,
        offset: 0,
      })
    );
  }, []);

  useEffect(() => {
    if (posts.length) setData(posts);
    dispatch(loadingAction({ loading: false }));
  }, [posts]);

  //Divide the total array into the required part

  const displayedContent = data;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 2, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const newsSection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 &&
      paginate.requiredArr?.map((item) => {
        return (
          <Grid item md={6} sm={12} key={uid(item)}>
            <MediaCard item={item} link="/media/news/" />
          </Grid>
        );
      }),
    [paginate.requiredArr]
  );

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  return (
    <Grid item xs={12} className={classes.latest}>
      <Grid item xs={12} className="latestHeader">
        <Grid item className="heading">
          <Typography variant="h2">{t("MEDIA.NEWS.LATEST")}</Typography>
        </Grid>
        <Grid item xs className="divider">
          <Divider />
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2} className="listOfLatest">
        {newsSection}
      </Grid>
      {data && data?.length > 0 ? (
        <Grid item xs={12} className="pagination">
          <Pagination
            className={paginationClasses.root}
            count={paginate.pgCount}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationClick}
          />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default memo(LastNews);
