import React, { Suspense, lazy, memo } from "react";
// import { useJwt } from "react-jwt";
import { Route, Switch, useRouteMatch } from "react-router-dom";
const CompletedPayment = lazy(() =>
  import("../../PaymentComponents/CompletedPayment")
);
const Payment = lazy(() => import("../../PaymentComponents/PaymentCheckout"));
const PaymentStatus = lazy(() =>
  import("../../PaymentComponents/PaymentStatus")
);
const AdditionalRequestForm = lazy(() =>
  import("./businessServices/filledForms/AdditionalRequestForm")
);
const OtherRequestForm = lazy(() =>
  import("./businessServices/filledForms/OtherRequestForm")
);
const AmendmentCooRequestForm = lazy(() =>
  import("./businessServices/filledForms/AmendmentCooRequestForm")
);
const NewCooForm = lazy(() =>
  import("./businessServices/filledForms/NewCooForm")
);
const RatificationForm = lazy(() =>
  import("./businessServices/filledForms/RatificationForm")
);
const AdditionalRequest = lazy(() =>
  import("./businessServices/forms/AdditionalRequest")
);
const OtherRequest = lazy(() =>
  import("./businessServices/forms/OtherRequest")
);
const AmendmentCooRequest = lazy(() =>
  import("./businessServices/forms/AmendmentCooRequest")
);
const BusinessDirectoryForm = lazy(() =>
  import("./businessServices/forms/BusinessDirectoryForm")
);
const CooVerification = lazy(() =>
  import("./businessServices/forms/CooVerification")
);
const MembershipFees = lazy(() =>
  import("./businessServices/forms/MembershipFees")
);
const MembershipVerify = lazy(() =>
  import("./businessServices/forms/MembershipVerify")
);
const NewCOO = lazy(() => import("./businessServices/forms/NewCOO"));
const RatificationRequest = lazy(() =>
  import("./businessServices/forms/RatificationRequest")
);
const RatificationVerification = lazy(() =>
  import("./businessServices/forms/RatificationVerification")
);
const Circulars = lazy(() => import("./cards/Circulars"));
const MembershipSignUp = lazy(() => import("./MembershipSignUp"));
const BookVenue = lazy(() => import("./other/forms/BookVenue"));
const OtherServicesForm = lazy(() => import("./other/forms/OtherServicesForm"));
const VenueDetails = lazy(() => import("./other/forms/VenueDetails"));
const DeletedRequestsList = lazy(() =>
  import("./requestsList/DeletedRequestsList")
);
const IssuedRequestsList = lazy(() =>
  import("./requestsList/IssuedRequestsList")
);
const RequestDetails = lazy(() => import("./requestsList/RequestDetails"));
const RequestsList = lazy(() => import("./requestsList/RequestsList"));
const SupplierForm = lazy(() =>
  import("./supplierServices/forms/SupplierForm")
);
const CooPreview = lazy(() => import("./templates/CooPreview"));
const MembershipProfile = lazy(() => import("./templates/MembershipProfile"));
const MembershipProfileEstablishment = lazy(() =>
  import("./templates/MembershipProfileEstablishment")
);
const PaidReceipt = lazy(() => import("./templates/PaidReceipt"));
const PaymentCheckout = lazy(() => import("./templates/PaymentCheckout"));
const PaymentTrx = lazy(() => import("./templates/PaymentTrx"));
const UaePassSignExistingUser = lazy(() =>
  import("./uaePass/UaePassSignExistingUser")
);
const UaePassSignUp = lazy(() => import("./uaePass/UaePassSignUp"));
const UserProfile = lazy(() => import("./UserProfile"));
const ReadFile = lazy(() => import("./supplierServices/forms/ReadFile"));
const ReStamping = lazy(() => import("./reStamping"));
function ServicesRouting() {
  const match = useRouteMatch();

  return (
    <Suspense fallback={<div className="loading..." />}>
      <Switch>
        <Route
          exact
          path={`${match.url}/services-form/OtherServicesForm/:serviceName`}
          render={(props) => (
            <OtherServicesForm {...props} />
            //   selectedId={selectedId}
          )}
        />
        <Route
          exact
          path={`${match.url}/services-form/OtherServicesForm/BookingService/:id`}
          render={(props) => <VenueDetails {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/OtherServicesForm/BookingService/:id/venue`}
          render={(props) => <BookVenue {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/requests-list`}
          render={(props) => <RequestsList {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/issued-requests-list`}
          render={(props) => <IssuedRequestsList {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/deleted-requests-list`}
          render={(props) => <DeletedRequestsList {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/request-details/:id`}
          render={(props) => <RequestDetails {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/supplier-services/:serviceName`}
          render={(props) => <SupplierForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/supplier-services/:serviceName/:operation`}
          render={(props) => <SupplierForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/file/read/:uuid`}
          render={(props) => <ReadFile {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/Business Directory`}
          render={(props) => <BusinessDirectoryForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/coo-verify`}
          render={(props) => <CooVerification {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/ratification-verify`}
          render={(props) => <RatificationVerification {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/new-coo/:type`}
          render={(props) => <NewCOO {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/additional-request`}
          render={(props) => <AdditionalRequest {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/other-request`}
          render={(props) => <OtherRequest {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/amendment-coo-request`}
          render={(props) => <AmendmentCooRequest {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/ratification-request`}
          render={(props) => <RatificationRequest {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/ratification-request/:code/:type/:status`}
          render={(props) => <RatificationForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/additional-request/:code/:type/:status`}
          render={(props) => <AdditionalRequestForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/other-request/:code/:type/:status`}
          render={(props) => <OtherRequestForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/amendment-coo-request/:coo_code/:code/:type`}
          render={(props) => <AmendmentCooRequestForm {...props} />}
        />

        <Route
          exact
          path={`${match.url}/services-form/business-services/new-coo/:code/:type`}
          render={(props) => <NewCooForm {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/membership-verify`}
          render={(props) => <MembershipVerify {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/membership-fees`}
          render={(props) => <MembershipFees {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/coo-preview/:type/:code/:req_code/:income_code/:count/:trx`}
          render={(props) => <CooPreview {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/trx-preview/:code`}
          render={(props) => <PaymentTrx {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/membership-preview/:code/:CompanyDate`}
          render={(props) => <MembershipProfile {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/business-services/establishment-preview/:code`}
          render={(props) => <MembershipProfileEstablishment {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/register/:type`}
          render={(props) => <MembershipSignUp {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/uaepass-register`}
          render={(props) => <UaePassSignUp {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/uaepass-exist-register`}
          render={(props) => <UaePassSignExistingUser {...props} />}
        />
        <Route
          exact
          path={`${match.url}/services-form/profile`}
          render={(props) => <UserProfile {...props} />}
        />
        {/*Start Payment */}
        <Route
          path={`${match.url}/services-form/payment`}
          render={(props) => <Payment {...props} />}
        />
        <Route
          path={`${match.url}/services-form/paymentstatus`}
          render={(props) => <PaymentStatus {...props} />}
        />
        <Route
          path={`${match.url}/services-form/payment-confirm/:result/:uuid`}
          render={(props) => <CompletedPayment {...props} />}
        />
        <Route
          path={`${match.url}/services-form/paid_receipt/:id`}
          render={(props) => <PaidReceipt {...props} />}
        />
        <Route
          path={`${match.url}/services-form/payment_order`}
          render={(props) => <PaymentCheckout {...props} />}
        />
        <Route
          path={`${match.url}/services-form/circulars`}
          render={(props) => <Circulars {...props} />}
        />
        {/* <Route
          path={`${match.url}/services-form/stamp`}
          render={(props) => <ReStamping {...props} />}
        /> */}
        {/* End Payment */}
      </Switch>
    </Suspense>
  );
}

export default memo(ServicesRouting);
