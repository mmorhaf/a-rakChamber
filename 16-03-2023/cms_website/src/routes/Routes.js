import { Box, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import React, { lazy, memo, Suspense, useEffect, useLayoutEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FloatingSocial from "../components/floatingSocialButtons/SocialButtons";
import ExitNotification from "../components/shared/exitNotification/ExitNotification";
import actions from "../redux/actions";
import { darkTheme, makeTheme } from "../styles/globalTheme/makeTheme";
import Spinner from "./Spinner";
import Alert from "../components/shared/alert/Alert";
import { useLocation } from "react-router-dom";
const Error404 = lazy(() => import("./Error404"));
const NoTranslationPage = lazy(() => import("./NoTranslationPage"));
const LogInContainer = lazy(() => import("./LogInContainer"));
const ConfirmEmailContainer = lazy(() => import("./ConfirmEmailContainer"));
const ResendCodeContainer = lazy(() => import("./ResendCodeContainer"));
const ResetPassword = lazy(() => import("./ResetPassContainer"));
const Home = lazy(() => import("./Home"));
const Header = lazy(() => import("../components/header/Header"));
const Search = lazy(() => import("./Search"));
const Footer = lazy(() => import("../components/footer/Footer"));
const ServicesForms = lazy(() =>
  import("../components/services/rakChamber/ServicesForms")
);

// //media center
const News = lazy(() => import("../components/mediaCenter/news/News"));
const DetailedNews = lazy(() =>
  import("../components/mediaCenter/news/DetailedNews")
);
const PhotoesGallery = lazy(() =>
  import("../components/mediaCenter/photoesGallery/PhotoesGallery")
);

const PhotoAlbumDetails = lazy(() =>
  import("../components/mediaCenter/photoesGallery/PhotoAlbumDetails")
);
const VideosGallery = lazy(() =>
  import("../components/mediaCenter/videosGallery/VideosGallery")
);
const VideoGalleryDetails = lazy(() =>
  import("../components/mediaCenter/videosGallery/VideoGalleryDetails")
);
const Events = lazy(() => import("../components/mediaCenter/events/Events"));

const DetailedEvent = lazy(() =>
  import("../components/mediaCenter/events/DetailedEvent")
);
const ReadFile = lazy(() =>
  import("../components/mediaCenter/events/ReadFile")
);
const Publications = lazy(() =>
  import("../components/mediaCenter/publications/Publications")
);

const CategoryDetails = lazy(() =>
  import("../components/mediaCenter/publications/CategoryDetails")
);
const ReadPublication = lazy(() =>
  import("../components/mediaCenter/publications/ReadPublication")
);

//participation

const SurveysContainer = lazy(() =>
  import("../components/eParticipation/survey/SurveysContainer")
);
const Survey = lazy(() => import("../components/eParticipation/survey/Survey"));
const Polls = lazy(() => import("../components/eParticipation/polls/Polls"));
const FAQ = lazy(() => import("../components/eParticipation/faq/FAQ"));
const Opinion = lazy(() =>
  import("../components/eParticipation/opinion/Opinion")
);
const Policy = lazy(() => import("../components/eParticipation/policy/Policy"));
const OpinionDetails = lazy(() =>
  import("../components/eParticipation/opinion/OpinionDetails")
);
const Ideas = lazy(() => import("../components/eParticipation/ideas/Ideas"));
const Thanks = lazy(() => import("../components/eParticipation/thanks/Thanks"));
const OpenDataPolicy = lazy(() =>
  import("../components/openData/OpenDataPolicy")
);
const OpenDataPage = lazy(() =>
  import("../components/openData/openDataPage/OpenDataPage")
);
const PrivacyPolicy = lazy(() =>
  import("../components/PrivacyAndTerms/PrivacyPolicy")
);
const TermsOfConditions = lazy(() =>
  import("../components/PrivacyAndTerms/TermsOfConditions")
);

//Services

const RAKChamberServicesTabs = lazy(() =>
  import("../components/services/rakChamber/cards/RAKChamberServicesTabs")
);

const RAKChamberServicesGroups = lazy(() =>
  import("../components/services/rakChamber/cards/RAKChamberServicesGroups")
);

const ServiceDetails = lazy(() =>
  import("../components/services/rakChamber/cards/ServiceDetails")
);

const Dashboard = lazy(() =>
  import("../components/services/rakChamber/Dashboard")
);

//aboutus
const InvestmentOpportunity = lazy(() =>
  import("../components/aboutUs/opportunity/InvestmentOpportunity")
);
const Details = lazy(() => import("../components/aboutUs/opportunity/Details"));
const AboutChamber = lazy(() =>
  import("../components/aboutUs/aboutUsMain/AboutChamber")
);
const BoardOfDirector = lazy(() =>
  import("../components/aboutUs/boardOfDirector/BoardOfDirector")
);
const Awards = lazy(() => import("../components/aboutUs/awards/Awards"));
const ChamberLaw = lazy(() => import("../components/aboutUs/law/ChamberLaw"));
const Organizational = lazy(() =>
  import("../components/aboutUs/organizational/Organizational")
);
const Committees = lazy(() =>
  import("../components/aboutUs/committees/Committees")
);
const ChamberPolices = lazy(() =>
  import("../components/aboutUs/polices/ChamberPolices")
);
const StrategicPlan = lazy(() =>
  import("../components/aboutUs/strategicPlan/StrategicPlan")
);
const Initiatives = lazy(() =>
  import("../components/aboutUs/initiatives/Initiatives")
);
const InitiativesDetails = lazy(() =>
  import("../components/aboutUs/initiatives/InitiativesDetails")
);
const Partners = lazy(() => import("../components/aboutUs/partners/Partners"));

//careers
const Vacances = lazy(() => import("../components/career/Vacances"));
const VacancyDetails = lazy(() =>
  import("../components/career/VacancyDetails")
);
const SubmitCv = lazy(() => import("../components/career/SubmitCv"));

//contact us
const ContactForm = lazy(() => import("../components/contactUs/ContactForm"));

//Customer charter
const CustomerCharter = lazy(() =>
  import("../components/customerCharter/CustomerCharter")
);

//sitemap
const SiteMap = lazy(() => import("../components/siteMap/SiteMap"));

const SearchServicesCards = lazy(() =>
  import("../components/home/services/SearchServicesCards")
);

const UaePassLogin = lazy(() =>
  import("../components/services/rakChamber/uaePass/UaePassLogin")
);
const AdditionalInfo = lazy(() =>
  import("../components/shared/additionalInfo/AdditionalInfo")
);

const Advertisment = lazy(() => import("../components/shared/ad/Ad"));

const ViewPdf = lazy(() => import("../components/viewPdf/ViewPdf"));
const GeneralPage = lazy(() => import("../components/generalPage/GeneralPage"));
const DetailedGeneralPage = lazy(() =>
  import("../components/generalPage/DetailedGeneralPage")
);
const { getAllPosts, getLastUpdate, loadingAction, serviceLoginDone, getMenu } =
  actions;

function Routes() {
  const {
    basicTheme,
    basicTheme: { isRTL, isDark, isBlind },
  } = useSelector((state) => state.theme_reducer);

  const { spinnerToggle, getEServicesGroups } = useSelector(
    (state) => state.APIServices
  );
  let location = useLocation();
  const { loadingActionReturned } = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const loader = {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff8a",
    zIndex: "1500",
    backdropFilter: "blur(4px)",
  };

  useLayoutEffect(() => {
    const sort = "notifications";
    const language = "all";
    dispatch(getAllPosts({ sort: sort, isFeatured: false, language }));
    dispatch(getLastUpdate());
  }, []);

  useLayoutEffect(() => {
    const language = isRTL ? "ar" : "en";
    if (location?.pathname?.includes("home"))
      dispatch(getAllPosts({ sort: "sliders", isFeatured: false, language }));
    dispatch(getMenu());
  }, [isRTL]);

  useEffect(() => {
    if (getEServicesGroups) {
      dispatch(loadingAction({ loading: true }));
    } else dispatch(loadingAction({ loading: false }));
  }, [getEServicesGroups]);

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const theme = isDark
    ? darkTheme(basicTheme)
    : isBlind
    ? darkTheme(basicTheme)
    : makeTheme(basicTheme);

  const materialTheme = createMuiTheme(theme);
  const useStyles = makeStyles((materialTheme) => ({
    floatingSocial: {
      position: "fixed",
      right: isRTL ? "unset" : "0",
      left: isRTL ? "0" : "unset",
      top: "19vh",
      zIndex: "20",

      [materialTheme.breakpoints.up(1300)]: {
        top: "28vh",
      },
    },
  }));

  const classes = useStyles();
  let serviceProfile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let supplierProfile = JSON.parse(sessionStorage.getItem("supplierProfile"));
  const handleOnIdle = (event) => {
    dispatch(serviceLoginDone({ status: 0 }));
    sessionStorage.setItem("loggedType", 0);
    if (serviceProfile) sessionStorage.setItem("clear", true);
    if (supplierProfile) sessionStorage.setItem("clear", true);
    sessionStorage.removeItem("memberType");
    sessionStorage.removeItem("updateUser");
    sessionStorage.removeItem("serviceProfile");
    sessionStorage.removeItem("uaePassUserInfo");
    sessionStorage.removeItem("authUserSession");
    sessionStorage.removeItem("supplierAuthUserSession");
    sessionStorage.removeItem("supplierProfile");
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 30, //after 30 min
    onIdle: handleOnIdle,
    debounce: 500,
  });
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />

        <Paper
          width="100%"
          dir={isRTL ? "rtl" : "ltr"}
          id="full-page"
          style={{
            position: "relative",
            filter:
              theme && theme?.globals?.type === "blind"
                ? "grayscale(100%)"
                : "inherit",
            backgroundColor: isDark || isBlind ? "#000000" : "#ffffff",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            boxShadow: "none",
          }}
        >
          <Suspense fallback={<div className="loading..." />}>
            <Header />

            <Box className={classes.floatingSocial}>
              <FloatingSocial />
            </Box>
            <Switch>
              {/* <Redirect exact from={`${url}`} to={`/${url}/home`} /> */}

              <Route path={`${url}/home`} render={() => <Home />} />
              <Route
                path={`${url}/login`}
                render={(props) => <LogInContainer {...props} />}
              />

              <Route
                path={`${url}/confirm-email`}
                render={(props) => <ConfirmEmailContainer {...props} />}
              />
              <Route
                path={`${url}/resend-code`}
                render={(props) => <ResendCodeContainer {...props} />}
              />
              <Route
                path={`${url}/reset-password`}
                render={(props) => <ResetPassword {...props} />}
              />
              <Route
                exact
                path={`${url}/view/:uuid`}
                render={(props) => <ViewPdf {...props} />}
              />
              <Route
                path={`${url}/search`}
                render={(props) => <Search {...props} />}
              />

              <Route
                exact
                path={`${url}/media/news`}
                render={(props) => <News {...props} />}
              />
              <Route
                exact
                path={`${url}/media/news/:alias`}
                render={(props) => <DetailedNews {...props} />}
              />

              <Route
                exact
                path={`${url}/media/photos-gallery`}
                render={(props) => <PhotoesGallery {...props} />}
              />
              <Route
                exact
                path={`${url}/media/photos-gallery/:alias`}
                render={(props) => <PhotoAlbumDetails {...props} />}
              />

              <Route
                exact
                path={`${url}/media/videos-gallery`}
                render={(props) => <VideosGallery {...props} />}
              />
              <Route
                exact
                path={`${url}/media/videos-gallery/:alias`}
                render={(props) => <VideoGalleryDetails {...props} />}
              />
              <Route
                exact
                path={`${url}/media/events`}
                render={(props) => <Events {...props} />}
              />
              <Route
                exact
                path={`${url}/media/events/:alias`}
                render={(props) => <DetailedEvent {...props} />}
              />
              <Route
                exact
                path={`${url}/media/events/file/read/:uuid`}
                render={(props) => <ReadFile {...props} />}
              />
              <Route
                exact
                path={`${url}/media/publications`}
                render={(props) => <Publications {...props} />}
              />
              <Route
                exact
                path={`${url}/media/publications/publications/:alias`}
                render={(props) => <CategoryDetails {...props} />}
              />
              <Route
                exact
                path={`${url}/media/publications/:type/:alias/read`}
                render={(props) => <ReadPublication {...props} />}
              />

              <Route
                exact
                path={`${url}/participation/faq`}
                render={(props) => <FAQ {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/polls`}
                render={(props) => <Polls {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/opinion`}
                render={(props) => <Opinion {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/e-policy`}
                render={(props) => <Policy {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/opinion/:alias`}
                render={(props) => <OpinionDetails {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/ideas`}
                render={(props) => <Ideas {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/thanks`}
                render={(props) => <Thanks {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/survey`}
                render={(props) => <SurveysContainer {...props} />}
              />
              <Route
                exact
                path={`${url}/participation/survey/:alias`}
                render={(props) => <Survey {...props} />}
              />

              <Route
                exact
                path={`${url}/aboutus/InvestmentOpportunity`}
                render={(props) => <InvestmentOpportunity {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/InvestmentOpportunity/:alias`}
                render={(props) => <Details {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/about-chamber`}
                render={(props) => <AboutChamber {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/directors`}
                render={(props) => <BoardOfDirector {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/awards`}
                render={(props) => <Awards {...props} />}
              />
              <Route
                exact
                path={`${url}/privacy-policy`}
                render={(props) => <PrivacyPolicy {...props} />}
              />
              <Route
                exact
                path={`${url}/terms-conditions`}
                render={(props) => <TermsOfConditions {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/law`}
                render={(props) => <ChamberLaw {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/organizational`}
                render={(props) => <Organizational {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/committees`}
                render={(props) => <Committees {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/Chamber-Polices`}
                render={(props) => <ChamberPolices {...props} />}
              />

              <Route
                exact
                path={`${url}/aboutus/strategic-plan`}
                render={(props) => <StrategicPlan {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/initiatives`}
                render={(props) => <Initiatives {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/initiatives/:alias`}
                render={(props) => <InitiativesDetails {...props} />}
              />
              <Route
                exact
                path={`${url}/aboutus/partners`}
                render={(props) => <Partners {...props} />}
              />

              <Route
                exact
                path={`${url}/careers/vacances`}
                render={(props) => <Vacances {...props} />}
              />
              <Route
                exact
                path={`${url}/careers/vacances/:alias`}
                render={(props) => <VacancyDetails {...props} />}
              />
              <Route
                exact
                path={`${url}/careers/vacances/:alias/:apply`}
                render={(props) => <SubmitCv {...props} />}
              />

              <Route
                exact
                path={`${url}/open-data/open-data-policy`}
                render={(props) => <OpenDataPolicy {...props} />}
              />
              <Route
                exact
                path={`${url}/open-data/page`}
                render={(props) => <OpenDataPage {...props} />}
              />

              <Route
                exact
                path={`${url}/contactus/contactus`}
                render={(props) => <ContactForm {...props} />}
              />
              <Route
                exact
                path={`${url}/customer-charter`}
                render={(props) => <CustomerCharter {...props} />}
              />
              <Route
                exact
                path={`${url}/sitemap`}
                render={(props) => <SiteMap {...props} />}
              />

              <Route
                path={`${url}/services-form`}
                render={(props) => <ServicesForms {...props} />}
              />
              <Route
                exact
                path={`${url}/services/rak-chamber`}
                render={(props) => <RAKChamberServicesTabs {...props} />}
              />
              <Route
                exact
                path={`${url}/services/rak-chamber/services-details/:id`}
                render={(props) => <ServiceDetails {...props} />}
              />
              <Route
                exact
                path={`${url}/services/rak-chamber/dashboard`}
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                exact
                path={`${url}/services/rak-chamber/:group`}
                render={(props) => <RAKChamberServicesGroups {...props} />}
              />
              <Route
                exact
                path={`${url}/services/search-services/:group`}
                render={(props) => <SearchServicesCards {...props} />}
              />
              <Route
                exact
                path={`${url}/uaepasslogin`}
                render={(props) => <UaePassLogin {...props} />}
              />
              <Route
                exact
                path={`${url}/section/:categoryAlias`}
                render={(props) => <GeneralPage {...props} />}
              />
              <Route
                exact
                path={`${url}/page/:alias`}
                render={(props) => <DetailedGeneralPage {...props} />}
              />
              <Route
                exact
                path={`${url}/not-found`}
                render={(props) => <NoTranslationPage {...props} />}
              />
              <Route render={(props) => <Error404 {...props} />} />
            </Switch>
            <Advertisment />
            {!window?.location?.href?.includes("home") && <AdditionalInfo />}
            <Footer />
          </Suspense>

          <ExitNotification />
          <Alert />
          <Spinner value={loadingActionReturned ? 1 : 2} />
        </Paper>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default memo(Routes);
