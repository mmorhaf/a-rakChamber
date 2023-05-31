import * as moment from "moment";
import React from "react";
import "./style/styles.css";

export default function PaidReceipt(props) {
  return (
    <page size="A4" className="bg">
      <div ref={props.ref}>
        <div>
          <div id="profile_printSection_aura">
            <div
              id="printSection_aura"
              className="paper  trx"
              style={{ direction: "rtl !important" }}
            >
              <style>{`@media print {.paper{min-height:320mm;margin:60px;position:relative; font-size: 15px;}}`}</style>
              <div className="row-col header-trx">
                <div className="col-xs-6 col-sm-6">
                  <img className="hdr-img" src={props.previewCooModelAr?.img} />
                </div>
                <div
                  className="col-xs-6 col-sm-6 light-blue-50 text-md-center p-a-md bluePrint"
                  style={{ verticalAlign: "middle" }}
                >
                  <style>{`@media print {.bluePrint{background:#f0f8ff !important;text-align: center!important;}}`}</style>
                  <h4 className="text-chm-blue header-text ">
                    ســنـــد قــــبــــــض{" "}
                  </h4>
                  <h4 className="text-chm-blue header-text ">Receipt</h4>
                  <style>{`@media print {.header-text{font-size:1.9rem}}`}</style>
                </div>
              </div>
              <div className="col-xs-12 line block b-b b-5x b-light-blue-50 m-t-xs" />
              <style>{`@media print {.b-light-blue-50{border-color:#f0f8ff !important;}}`}</style>
              <div className="padding l-h-1x m-t-lg m-l-content">
                <style>{`@media print {.row {margin-left: -12px;margin-right: -12px;display: flex;}}`}</style>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="m-b-sm">
                      <span className="_700">رقم سند القبض: </span>
                      {props.trx_details?.code}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="text-left m-b-sm dirltr">
                      <span className="_700">Receipt No: </span>
                      {props.trx_details?.code}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="m-b-sm">
                      <span className="_700">تاريخ الاصدار: </span>
                      {moment(props.trx_details?.issue_date).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="text-left m-b-sm">
                      <span className="_700">Issue Date: </span>
                      {moment(props.trx_details?.issue_date).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="m-b-sm">
                      <span className="_700">رقم أمر القبض: </span>
                      {props.trx_details?.payment_code}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="text-left m-b-sm dirltr">
                      <span className="_700">Payment Order No: </span>
                      {props.trx_details?.payment_code}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="pull-left right p-y-xs _700 text-right inline total_title1 m-b-sm">
                      مُستلم من:{" "}
                    </p>
                    <p className="pull-left right p-y-xs text-right inline total_spelled m-b-sm">
                      {props.trx_details?.company_name}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="pull-right left p-y-xs _700 text-left total_title_e1 m-b-sm">
                      :Collect From{" "}
                    </p>
                    <p className="pull-right left p-y-xs text-left total_spelled_e m-b-sm">
                      {props.trx_details?.company_name_e}
                    </p>
                  </div>
                </div>
                <div
                  className={`row ${
                    props.trx_details?.company_code == 0 ? "none" : ""
                  }`}
                >
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="m-b-sm">
                      <span className="_700">رقم العضوية: </span>
                      {props.trx_details?.company_code}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="text-left m-b-sm dirltr">
                      <span className="_700">Membership No: </span>
                      {props.trx_details?.company_code}
                    </p>
                  </div>
                </div>
                <div
                  className={`row ${
                    props.trx_details?.company_code == 0 ? "none" : ""
                  }`}
                >
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="m-b-sm">
                      <span className="_700">رقم السجل التجاري: </span>
                      {props.trx_details?.trade_registration_no}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="text-left m-b-sm dirltr">
                      <span className="_700">Trade Registration No: </span>
                      {props.trx_details?.trade_registration_no}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 right">
                    <p className="pull-left right p-y-xs text-right _700 inline total_title2">
                      المبلغ الإجمالي:{" "}
                    </p>
                    <p className="pull-left right p-y-xs text-right _700 inline total_spelled">
                      {props.trx_details?.spelled_out}
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <p className="pull-right left p-y-xs text-left _700 total_title_e2">
                      :Total Amount{" "}
                    </p>
                    <p className="pull-right left p-y-xs text-left _700 total_spelled_e">
                      {props.trx_details?.spelled_out_e}
                    </p>
                  </div>
                  <style>{`@media print {.total_spelled{width:250px!important;}.total_spelled_e{width:250px!important;}.total_title2{min-width:90px!important;}.total_title_e2{width:110px!important;}}`}</style>
                </div>
                <div
                  className={`row ${
                    props.trx_details?.online_payment_code == null ? "none" : ""
                  }`}
                >
                  <div className="col-xs-6 col-sm-6 right ">
                    <span className="pull-left right p-y-xs text-right _700 inline label PaidNotApproved_">
                      مدفوعة إلكترونيا:
                    </span>{" "}
                    &nbsp;&nbsp;
                    <span className="pull-left right p-y-xs text-right _700 inline label PaidNotApproved_">
                      {props.trx_details?.online_payment_code}
                    </span>
                  </div>
                  <div className="col-xs-6 col-sm-6 left">
                    <span className="pull-right left p-y-xs text-left _700  label PaidNotApproved_">
                      :Paid Online{" "}
                    </span>
                    &nbsp;&nbsp;
                    <span className="pull-right left p-y-xs text-left _700 inline label PaidNotApproved_">
                      {props.trx_details?.online_payment_code}
                    </span>
                  </div>
                </div>
              </div>
              <div className="padding tablePadding">
                <style>{`@media print {.tablePadding{padding-top:4rem!important}}`}</style>
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                    <table className="table table-bordered b-light-blue-50 table-hover table-striped b-a b-2x">
                      <thead className="light-blue-50 bluePrint">
                        <tr className="b-b b-2x text-chm-blue b-light-blue-50">
                          <th width="33%" className="text-right">
                            <style>{`@media print {th{padding: 2px!important}}`}</style>
                            <p>وصف الرسوم </p>
                          </th>
                          <th width="17%" className="text-center">
                            <p>الكمية - Quantity </p>
                          </th>
                          <th width="17%" className="text-center">
                            <p> المبلغ - Amount </p>
                          </th>
                          <th width="33%" className="text-left">
                            <p> Fees Description </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.trx_item_details?.length &&
                          props.trx_item_details?.map((ii) => (
                            <tr>
                              <td>
                                <style>{`@media print {td{padding:5px!important}}`}</style>
                                <p>{ii.descrirption}</p>
                              </td>
                              <td class="text-center">
                                <p>{ii.quantity}</p>
                              </td>
                              <td class="text-center">
                                <p>{ii.amount}</p>
                              </td>
                              <td class="text-left">
                                <p class="text-left-print">
                                  <style>{`@media print {.text-left-print{direction: ltr !important;}}`}</style>
                                  {ii.descrirption_e}
                                </p>
                              </td>
                            </tr>
                          ))}
                        <tr className="_700">
                          <td>
                            <p>صافي المبلغ المستلَم</p>
                          </td>
                          <td className="text-center" colSpan={2}>
                            <p>{props.trx_details?.amount}</p>
                          </td>
                          <td className="text-left">
                            <p>Total Received Amount</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <style>{`@media print {
                          .table > tbody > tr > td {background-color:rgba(0, 0, 0, 0)!important;padding: 0px!important;}
                          .table > thead > tr > th {
                              padding: 10px 4px;
                              border-color: #eceeef;
                              background-color:#f0f8ff !important;
                          }
                          .table > thead > tr > th > p  {margin-bottom:0px;padding-left: 5px;padding-right: 5px;padding-top: 5px;padding-bottom: 5px;}
                          .table > tbody > tr > td > p {margin-bottom:0px;padding-left: 10px;padding-right: 10px;padding-top: 0px;padding-bottom: 0px;}
                          .table > tbody > tr:nth-child(odd) {
                            background-color: rgba(120, 130, 140, 0.045)!important;
                        }
               }`}</style>
                </div>
                {/*</div> / row table */}
              </div>
              <div className="padding">
                <div className="row onPrint relative">
                  <style>{`@media print {.onPrint{position: relative;width: 100%;margin-top:40px}}`}</style>
                  <div className="col-xs-5 col-sm-5 text-right _700 printRight-p">
                    <style>{`@media print {.printRight-p{width: 33%;position: absolute;right:2%;top:0px;}}`}</style>
                    <p class="text-left-print left-direction">
                      <style>{`@media print {.text-left-print{direction: ltr !important;}}`}</style>
                      .هذه الفاتورة صادرة الكترونيا. لا تحتاج إلى توقيع
                    </p>
                  </div>
                  <div className="text-center printCenter">
                    <style>{`@media print {.printCenter{width: 33%;left: 31%;position: absolute;}}`}</style>
                    <img
                      id="rakchamber-stamp-img"
                      src={props.previewCooModelAr?.stamp}
                    />
                  </div>
                  <div className="col-xs-5 col-sm-5 _700 printLeft">
                    <style>{`@media print {.printLeft{width: 33%;position: absolute;left: -2%;top:0px;}}`}</style>
                    <p className="dirltr">
                      This is a system generated invoice. No signature is
                      required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="padding m-l-content paddingBottom0 topPrint">
                <style>{`@media print {.paddingBottom0{margin-top: 100px !important;}}`}</style>
                <div className="print-footer text-chm-blue _700 text-xs">
                  <style>{`@media print {.print-footer{position:absolute;bottom:20px; border-top: 3px solid #eceeef!important; width:22cm !important; font-size: 15px!important;right:0px;left:0px;}}}`}</style>
                  <p
                    className="p1 marginBottom0"
                    style={{
                      lineHeight: "1.5",
                      marginBottom: "0px !important",
                    }}
                  >
                    <span>
                      الإمارات العربية المتحدة - رأس الخيمة - United Arab
                      Emirates - Ras Al Khaimah
                    </span>{" "}
                    <span>ص.ب: 87 :P.O.Box</span>{" "}
                    <span>
                      هاتف:{" "}
                      <span style={{ direction: "ltr!important" }}>
                        2260000 7 971+
                      </span>
                      :Tel
                    </span>
                  </p>
                  <p className="p2 ">
                    <span className="reverse _700">
                      :Fax{" "}
                      <span style={{ direction: "ltr!important" }}>
                        فاكس: 2070292 7 971+
                      </span>
                    </span>
                    <span
                      className="reverse _700"
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    >
                      {" "}
                      <span>:@ </span>info@rakchamber.ae{" "}
                    </span>
                    <span
                      className="_700"
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    >
                      {" "}
                      www.rakchamber.ae{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="box"></div> */}
      </div>
    </page>
  );
}
