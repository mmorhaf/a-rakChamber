import moment from "moment";
export const HtmlIssuedCooPreview = (
  coo,
  origin_country,
  previewCooModelAr,
  currentLanguage,
  url,
  details
) => `

<style>
    .paper .clear{clear:both;content: "";display: block;padding: 5px 10px;}
    .paper * {direction: ltr !important;}
    .paper  {
      font-size: 14px;
      border:1px solid #ccc;
      display:block;
      margin: 10px auto;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color:black;
      background: #ffffff url(${
        previewCooModelAr.issued_img
      }) no-repeat center 230px;
      background-size: 381px auto;
      padding:7px;
      page-break-after: always;

    }

    .ar_certificationDescr{
        vertical-align:top; width: 50%;z-index: 1200;
    }

    .footery2{
        /*display: inline-block;margin-left: 122px; margin-right:-16px;margin-top: -50px; margin-bottom:-24px;width: 120px;z-index: 1000;*/

        display: inline-block;
        margin-left: 10px;
        margin-right: -16px;
        margin-top: -43px;
        margin-bottom: -24px;
        width: 130px;
    }
    .footery2 img{
         width: 100%;
         height: auto;
         z-index: 100!important;
     }

    .cooCodeSty2{
        margin-left: .4rem;
        text-align: center;
        margin-top: -4rem;
        font-size: 7px;
        line-height: 1.5;
        z-index: 1000;
    }

    .stampSty{
        margin-top: -2.5rem;
    }

   
     [lang='ar'] .paper * {
       direction: ltr;
   }
   
    .sign_arabic{
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 8px;
       font-weight:bolder;
     direction: rtl;
     padding-right:6px;
       padding-top:1px;
       color:black;
   
   }
   .xlarge_arabic{
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 11px;
     /*direction: rtl;*/
     text-align: right;
     font-weight:bolder;
     padding-right:6px;
       padding-top:3px;
       padding-bottom:9px;
       color:black;
   }
   .large_arabic {
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 9px;
     /*direction: rtl;*/
     text-align: right;
     font-weight:bolder;
     padding-right:6px;
       padding-top:3px;
       color:black;
   
   }

   .small_arabic{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 8px;
     /*direction: rtl;*/
     text-align: right;
     padding-right:6px;
       padding-top:3px;
       color:black;
   
   }
   .small_arabic22{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 8px;
     /*direction: rtl;*/
     text-align: right;
     padding-right:6px;
       padding-top:1px;
       padding-bottom:9px;
   
       color:black;
   
   }
   .xxsmall_arabic{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 7px;
       font-weight:bolder;
     /*direction: rtl;*/
     text-align: right;
     padding-right:6px;
       padding-top:3px;
       color:black;
   
   }

   .sign_english {
     font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 7px;
       font-weight:bolder;
     padding-left:6px;
       padding-top:1px;
       color:black;
   }
   .xlarge_english {
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size:10px;
     font-weight:bolder;
     padding-left:6px;
       padding-top:3px;
       padding-bottom:9px;
       color:black;
   
   }
   .large_english {
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 8px;
     font-weight:bolder;
     padding-left:6px;
       padding-top:3px;
       color:black;
   }
    .medium_english {
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 9px;
     direction: ltr;
     padding-left:${currentLanguage === "en_US" ? "15px" : "0px"};
     padding-right:${currentLanguage === "en_US" ? "0px" : "15px"};
       padding-top:1px;
       color:black;
       text-align:${currentLanguage === "en_US" ? "start" : "end"}
   
   }
        .medium_english22 {
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 8px;
     direction: ltr;
     padding-left:15px;
       padding-top:1px;
       color:black;
   
   }

    .xxsmall_english_normal_centre{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 9px;
     direction: ltr;
     padding-left:16px;
        padding-right:30px;
       padding-top:1px;
       color:black;
   }
    .xxsmall_english_normal_centre22{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 8px;
     direction: ltr;
       padding-top:3px;
       /*padding-left:290px;*/
       text-align: center;
       color:black;
   }
   .xxsmall_english_normal{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 7px;
     direction: ltr;
       padding-top:3px;
       padding-left:16px;
       color:black;
   }
   .small_english{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 7px;
     padding-left:6px;
       padding-top:3px;
   }
   .small_english22{
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 7px;
     padding-left:6px;
       padding-top:1px;
       padding-bottom:9px;
   }
   .center_english {
     text-align: center;
       font-weight:bolder;
     font-size: 13px;
     vertical-align:middle;
       color:black;
       padding-bottom:9px;
   }
   
   
   table {
     border-collapse:collapse;
     height: 100%;
     font-size: 0.75rem;
   }
   
   
   .paper .b-right {
       border-right: 1.5px solid #000;
   }
   .paper .b-left {
       border-left: 1.5px solid #000;
   }
   
   .paper .b-top {
       border-top: 1.5px solid #000;
   }
   
   .paper .b-bottom {
       border-bottom: 1.5px solid #000;
   }
   
   
   .paper .b {
       border: 1.5px solid #000;
   }
  
  
     @media print {      
        .paper .clear{clear:both;content: "";display: block; padding: 0px 5px 10px;}
        .paper * {direction: ltr !important; }
        .paper  {font-size: 14px; border:none; display:block;
          margin: 60px ; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          color:black;  padding-top:0px; padding-bottom:7px; padding-right:15px;
          margin-bottom: 48px!important; 
          background-size: 381px auto;line-height:1.2

        }

      .footery2{
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        margin-right: -16px;
        margin-top: -43px;
        margin-bottom: -24px;

      }
      .footery2 img{
        z-index: 100!important;
      }
      .cooCodeSty2{
        margin-left: .4rem;
        text-align: center;
        margin-top: -3.8rem;
        font-size: 7px;
        line-height: 1.5;
        z-index: 700;
      }

      .stampSty{
	       margin-top: -2.3rem;
      } 

      .mFooterPadding{
        padding-left:140px;
      }

      .mmHeight{
        height:180px!important;
      } 

      .mmLineHeight {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 7px;
        text-align: right;
        padding-right:6px;
        color:black;
        line-height: 1;
      }
      .large_english {font-size: 10px !important;padding-top:4px !important;}
      .large_arabic {font-size: 12px !important;padding-top:4px !important;}
      .medium_english {
        font-size: 10px !important;
        padding-top:2px !important;
      }
           .medium_english22 {
            font-size: 10px !important;
            padding-top:2px !important;
      }
      .
    }
</style>


    <div class="hidden-print">
     <div ng-show="showStandaredPaper">

            <!-- page 1 -->
            <div id="printSection_aura" class="paper" style="direction: ltr ">
                <table style="width:100%;padding:0; border:none;">
                    <tr class="b-left b-right b-top">
                        <td style="padding:0;width:50%;"  class="b-right" >
                            <table style="width:100%; padding:0;">
                                <tr>
                                    <td style="height:21px;padding-right:0;" class="large_english ">1. EXPORTER(NAME,ADDRESS,COUNTRY)</td>
                                    <td class="large_arabic">${
                                      previewCooModelAr.exporter
                                    }</td></tr>

                                <tr><td colspan="2" style="height:18px;" ng-if="cooType != 3" class="medium_english"> ${
                                  currentLanguage === "en_US"
                                    ? coo.company_name_e
                                      ? coo.company_name_e
                                      : ""
                                    : coo.company_name
                                    ? coo.company_name
                                    : ""
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px;" class="medium_english">POBOX: ${
                                  coo.pobox
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px;" class="medium_english">Ras Al Khaimah - United Arab Emirates</td></tr>
                                <tr><td colspan="2" style="height:18px;" class="medium_english"></td></tr>
                                <tr><td style="height:21px;" class="large_english b-top">2. CONSIGNEE(NAME,ADDRESS,COUNTRY)</td><td class="large_arabic b-top">${
                                  previewCooModelAr.sentTo
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px" class="medium_english ">${
                                  currentLanguage === "en_US"
                                    ? coo.consignee_country_name_e
                                      ? coo.consignee_country_name_e
                                      : ""
                                    : coo.consignee_country_name
                                    ? coo.consignee_country_name
                                    : ""
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px" class="medium_english22">${
                                  coo.destination1 ? coo.destination1 : ""
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px" class="medium_english22">${
                                  coo.destination2 ? coo.destination2 : ""
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px" class="medium_english22">${
                                  coo.destination3 ? coo.destination3 : ""
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px" class="medium_english22">${
                                  coo.destination4 ? coo.destination4 : ""
                                }</td></tr>
                                <tr><td colspan="2" style="height:18px;" class="medium_english">&nbsp;</td></tr>
                            </table>
                        </td>
                        <td style="padding:0;width:50%;">
                            <table style="width:100%;padding:0;border:none;">
                                <tr>
                                    <td style="height:33px;" class="xlarge_english">UNITED ARAB EMIRATES</td>
                                    <td style="height:33px;" class="xlarge_arabic ">${
                                      previewCooModelAr.uae
                                    }</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="height:125px;" class="b-top">
                                        <img style="height:100%;" src=${
                                          previewCooModelAr.issued_coo_img
                                        } alt="">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:18px;" class="large_english b-top">Certificate No. ${
                                      coo.coo_code ? coo.coo_code : ""
                                    }</td>
                                    <td style="text-align:right; height:18px;" class="large_english b-top">${
                                      coo.coo_issue_date
                                        ? coo.coo_issue_date
                                        : ""
                                    } </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="height:35px;"  class="center_english " >
                                        ${previewCooModelAr.typeOfCopy1}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table style="width:100%;padding:0;border:none;">
                    <tr class="b-left b-right b-top">
                        <td style="padding:0;width:50%;" class="b-right">
                            <table style="width:100%;padding:0;">
                                <tr style="height:18px;" >
                                    <td class="large_english">3. Means of Transport</td>
                                    <td class="large_arabic">${
                                      previewCooModelAr.transport
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td colspan="2" class="medium_english" >${
                                      currentLanguage === "en_US"
                                        ? coo.transportation_name_e
                                          ? coo.transportation_name_e
                                          : ""
                                        : coo.transportation_name
                                        ? coo.transportation_name
                                        : ""
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td class="large_english b-top">4. Estimated Date of Departure</td>
                                    <td class="large_arabic b-top">${
                                      previewCooModelAr.depatureDate
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td colspan="2" class="medium_english" >${
                                      coo.estimated_date_of_departure
                                        ? moment(
                                            new Date(
                                              coo.estimated_date_of_departure
                                            )
                                          ).format("YYYY-MM-DD")
                                        : ""
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td class="large_english b-top">5. Port of Discharge</td>
                                    <td class="large_arabic b-top">${
                                      previewCooModelAr.dischargePort
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td colspan="2" class="medium_english" >${
                                      coo.port_of_discharge
                                        ? coo.port_of_discharge
                                        : ""
                                    }</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding:0;width:50%;">
                            <table style="width:100%;padding:0;">
                                <tr style="height:18px;">
                                    <td  class="large_english" >6. Country of Final Destination</td>
                                    <td  class="large_arabic" >${
                                      previewCooModelAr.outCountry
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td colspan="2" class="medium_english" >${
                                      currentLanguage === "en_US"
                                        ? coo.consignee_country_name_e
                                          ? coo.consignee_country_name_e
                                          : ""
                                        : coo.consignee_country_name
                                        ? coo.consignee_country_name
                                        : ""
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td class="large_english b-top" >7. Invoice No. and Date</td>
                                    <td class="large_arabic b-top" >${
                                      previewCooModelAr.invoiceDate
                                    } </td>
                                </tr>
                                <tr style="height:18px;">
                                    <td colspan="2"  class="medium_english" >${
                                      coo.invoice_no ? coo.invoice_no : ""
                                    }&nbsp;,${
  coo.invoice_issue_date
    ? moment(new Date(coo.invoice_issue_date)).format("YYYY-MM-DD")
    : ""
}</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td class="large_english b-top" >8. Country of Origin of Goods</td>
                                    <td class="large_arabic b-top" >${
                                      previewCooModelAr.originCountry
                                    }</td>
                                </tr>
                                <tr style="height:18px;">
                                    <td colspan="2" class="medium_english" >${origin_country}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table style="width:100%;padding:0;border:none;" >
                    <tr>
                        <td style="width:17%;"   class="large_english b-top b-left" >9.&nbsp;${
                          previewCooModelAr.marksNum
                        }</td>
                        <td style="width:66%;" class="large_english b-top" >10.&nbsp;${
                          previewCooModelAr.kindofPackage
                        }</td>
                        <td style="width:17%;" class="large_english b-top b-right" >11.&nbsp;${
                          previewCooModelAr.quantityUnit
                        }</td>
                    </tr>
                    <tr>
                        <td class="large_english b-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marks&amp;Numbers</td>
                        <td class="large_english">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. and Kind of Packages,Description of Goods(Include Brand Names if Necessary)</td>
                        <td class="large_english  b-right" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity&amp; Unit</td>
                    </tr>
                   
         
           
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line1 ? coo.line1 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line2 ? coo.line2 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line3 ? coo.line3 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line4 ? coo.line4 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">

                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line5 ? coo.line5 : ""
                        }</td>

                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line6 ? coo.line6 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line7 ? coo.line7 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                          coo.line8 ? coo.line8 : ""
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:18px;" colspan="3" class="xxsmall_english_normal_centre22 " >${
                          coo.line9
                            ? coo.line9
                            : currentLanguage === "en_US"
                            ? "As per attached Invoice"
                            : "حسب الفاتورة المرفقة"
                        }</td>
                    </tr>
                    <tr class="b-right b-left">
                        <td style="height:108px" colspan="3" class="xxsmall_english_normal mmHeight noHeight" ></td>
                    </tr>
                </table>
                <table style="width:100%;" >
                    <tr>
                        <td colspan="4" class="large_english b-top  b-left" >12. CERTIFICATION BY THE COMPETENT AUTHORITY</td>
                        <td colspan="3" class="large_arabic b-top  b-right" >${
                          previewCooModelAr.cerification
                        }</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="vertical-align:top; width: 50%;z-index: 1200;" class="small_english b-left" >We hereby certify that evidence has been produced to satisfy us that the goods  <br>
                            specified above originate in/where processed in the country shown in Box 8. this <br>
                            certificate is.therefore issued and certified to the best of our knowledge and <br>
                            belief to be correct and without any liability on our part.</td>
                        <td colspan="3" class="small_arabic b-right ar_certificationDescr" >${
                          previewCooModelAr.certificationDescr
                        }</td>
                    </tr>

                    <tr>
                        <td style="height:30px" class="b-left">&nbsp;</td>
                        <td style="height:30px" colspan="2">

                            <div align="center"style="width:176px;height:82px;" >
                                <img  alt="" style="width:176px;height:82px;" src=${
                                  previewCooModelAr.signature
                                } />
                            </div>
                        </td>
<!--                        <td style="" rowspan="2">&nbsp;</td>-->
                        <td style="" colspan="2" rowspan="2"><img style="width: 200px;height: 190px;margin-left: 25px;" src=${
                          previewCooModelAr.icc
                        } alt=""></td>
                        <td colspan="2" rowspan="2" class="b-right">

                            &nbsp;

                            <div class="stampSty"></div>
                            <span class="footery2 ">
			                <img src=${previewCooModelAr.stamp}>
                            <div class="cooCodeSty2">${
                              coo.coo_code ? coo.coo_code : ""
                            } <br>${
  coo.coo_issue_date ? coo.coo_issue_date : ""
}</div>
                        </span>
                            <!--<div class="cooCodeSty2" align="center">{{coo.coo_code}} <br>{{coo.coo_issue_date | date:'dd/MM/yyyy' }}</div>-->
                            <!--<span  class="cooCodeSty2">{{coo.coo_issue_date | date:'dd/MM/yyyy' }}</span>-->



                        </td>

                    </tr>

                    <tr>
                        <td style="width:17px;height:9px" class="b-left " >&nbsp;</td>
                        <td style="width:90px" class="sign_english">Authorized Signatory</td>
                        <td style="width:60px" class="sign_arabic">${
                          previewCooModelAr.authorizedSign
                        }</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="height:15px;" class="small_english22 b-left " >Once this Certificate is issued it shall be invalid should any alteration be made to <br>this Certificate, without the competent Authority's authorization.</td>
                        <td colspan="3" style="height:15px;" class="small_arabic22 b-right" >${
                          previewCooModelAr.signDescr
                        }</td>
                    </tr>
                </table>
                <table style="width:100%;border:0;border:none;">
                    <tr style="height:36px;">
                        <td ng-controller="qrCOOReader" style="width:50%;padding-left:11px;" class="b-left b-top b-bottom b-right">
                            <p style="margin-top: 10px;height:55px;" class="height80">
                          <img src=${url} alt="Qr Code" style="height:100%"/>
                            </p>

                        </td>
                        <td class="xxsmall_arabic mmLineHeight b-right b-top b-bottom" >
                            <span>للتأكد من صحة بیانات الشھادة یرجي الرجوع لموقع الغرفة</span> <br>
                            <span>For online verification of this certificate,please visit our website</span><br>
                            <span>http://www.rakchamber.ae</span><br>
                            ------------------------------------------<br>
                            <span>Verify ID: ${
                              coo.verify_id ? coo.verify_id : ""
                            }</span>
                        </td>
                    </tr>
                </table>

                <table style="margin-top:1px;width:100%;border:none;" >
                    <tr>
                        <td colspan="2" class="small_english">${
                          previewCooModelAr.rakChamber
                        }<br>
                            RAK Chamber of Commerce &amp; Industry<br>
                            ${previewCooModelAr.pobox}</td>
                        <td  class="small_arabic mFooterPadding" style="width:50%;padding-left:186px;">${
                          coo.company_code
                        }/${coo.coo_code ? coo.coo_code : ""}/${
  coo.coo_issue_date ? coo.coo_issue_date : ""
}/RAKCHAMBER</td>
                    </tr>
                </table>
            </div>


            <!-- page 2 -->
            <div  class="paper " style="direction: ltr; margin-bottom: 100px;">
            <table style="width:100%;padding:0; border:none;">
            <tr class="b-left b-right b-top">
                <td style="padding:0;width:50%;"  class="b-right" >
                    <table style="width:100%; padding:0;">
                        <tr>
                            <td style="height:21px;padding-right:0;" class="large_english ">1. EXPORTER(NAME,ADDRESS,COUNTRY)</td>
                            <td class="large_arabic">${
                              previewCooModelAr.exporter
                            }</td></tr>

                        <tr><td colspan="2" style="height:18px;" ng-if="cooType != 3" class="medium_english"> ${
                          currentLanguage === "en_US"
                            ? coo.company_name_e
                              ? coo.company_name_e
                              : ""
                            : coo.company_name
                            ? coo.company_name
                            : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english">POBOX: ${
                          coo.pobox
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english">Ras Al Khaimah - United Arab Emirates</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english"></td></tr>
                        <tr><td style="height:21px;" class="large_english b-top">2. CONSIGNEE(NAME,ADDRESS,COUNTRY)</td><td class="large_arabic b-top">${
                          previewCooModelAr.sentTo
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english ">${
                          currentLanguage === "en_US"
                            ? coo.consignee_country_name_e
                              ? coo.consignee_country_name_e
                              : ""
                            : coo.consignee_country_name
                            ? coo.consignee_country_name
                            : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination1 ? coo.destination1 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination2 ? coo.destination2 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination3 ? coo.destination3 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination4 ? coo.destination4 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english">&nbsp;</td></tr>
                    </table>
                </td>
                <td style="padding:0;width:50%;">
                    <table style="width:100%;padding:0;border:none;">
                        <tr>
                            <td style="height:31px;" class="xlarge_english">UNITED ARAB EMIRATES</td>
                            <td style="height:31px;" class="xlarge_arabic ">${
                              previewCooModelAr.uae
                            }</td>
                        </tr>
                        <tr>
                        <td colspan="2" style="height:125px;" class="b-top">
                        <img style="height:100%;" src=${
                          previewCooModelAr.issued_coo_img
                        } alt="">
                    </td>
                        </tr>
                        <tr>
                            <td style="height:18px;" class="large_english b-top">Certificate No. ${
                              coo.coo_code ? coo.coo_code : ""
                            }</td>
                            <td style="text-align:right; height:18px;" class="large_english b-top">${
                              coo.coo_issue_date ? coo.coo_issue_date : ""
                            } </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="height:35px;"  class="center_english " >
                                ${previewCooModelAr.typeOfCopy2}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width:100%;padding:0;border:none;">
            <tr class="b-left b-right b-top">
                <td style="padding:0;width:50%;" class="b-right">
                    <table style="width:100%;padding:0;">
                        <tr style="height:18px;" >
                            <td class="large_english">3. Means of Transport</td>
                            <td class="large_arabic">${
                              previewCooModelAr.transport
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              currentLanguage === "en_US"
                                ? coo.transportation_name_e
                                  ? coo.transportation_name_e
                                  : ""
                                : coo.transportation_name
                                ? coo.transportation_name
                                : ""
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top">4. Estimated Date of Departure</td>
                            <td class="large_arabic b-top">${
                              previewCooModelAr.depatureDate
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              coo.estimated_date_of_departure
                                ? moment(
                                    new Date(coo.estimated_date_of_departure)
                                  ).format("YYYY-MM-DD")
                                : ""
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top">5. Port of Discharge</td>
                            <td class="large_arabic b-top">${
                              previewCooModelAr.dischargePort
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              coo.port_of_discharge ? coo.port_of_discharge : ""
                            }</td>
                        </tr>
                    </table>
                </td>
                <td style="padding:0;width:50%;">
                    <table style="width:100%;padding:0;">
                        <tr style="height:18px;">
                            <td  class="large_english" >6. Country of Final Destination</td>
                            <td  class="large_arabic" >${
                              previewCooModelAr.outCountry
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              currentLanguage === "en_US"
                                ? coo.consignee_country_name_e
                                  ? coo.consignee_country_name_e
                                  : ""
                                : coo.consignee_country_name
                                ? coo.consignee_country_name
                                : ""
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top" >7. Invoice No. and Date</td>
                            <td class="large_arabic b-top" >${
                              previewCooModelAr.invoiceDate
                            } </td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2"  class="medium_english" >${
                              coo.invoice_no ? coo.invoice_no : ""
                            }&nbsp;,${
  coo.invoice_issue_date
    ? moment(new Date(coo.invoice_issue_date)).format("YYYY-MM-DD")
    : ""
}</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top" >8. Country of Origin of Goods</td>
                            <td class="large_arabic b-top" >${
                              previewCooModelAr.originCountry
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${origin_country}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width:100%;padding:0;border:none;" >
            <tr>
                <td style="width:17%;"   class="large_english b-top b-left" >9.&nbsp;${
                  previewCooModelAr.marksNum
                }</td>
                <td style="width:66%;" class="large_english b-top" >10.&nbsp;${
                  previewCooModelAr.kindofPackage
                }</td>
                <td style="width:17%;" class="large_english b-top b-right" >11.&nbsp;${
                  previewCooModelAr.quantityUnit
                }</td>
            </tr>
            <tr>
                <td class="large_english b-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marks&amp;Numbers</td>
                <td class="large_english">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. and Kind of Packages,Description of Goods(Include Brand Names if Necessary)</td>
                <td class="large_english  b-right" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity&amp; Unit</td>
            </tr>
           
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line1 ? coo.line1 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line2 ? coo.line2 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line3 ? coo.line3 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line4 ? coo.line4 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">

                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line5 ? coo.line5 : ""
                }</td>

            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line6 ? coo.line6 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line7 ? coo.line7 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line8 ? coo.line8 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal_centre22 " >${
                  coo.line9
                    ? coo.line9
                    : currentLanguage === "en_US"
                    ? "As per attached Invoice"
                    : "حسب الفاتورة المرفقة"
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:108px" colspan="3" class="xxsmall_english_normal mmHeight noHeight" ></td>
            </tr>
        </table>
        <table style="width:100%;" >
            <tr>
                <td colspan="4" class="large_english b-top  b-left" >12. CERTIFICATION BY THE COMPETENT AUTHORITY</td>
                <td colspan="3" class="large_arabic b-top  b-right" >${
                  previewCooModelAr.cerification
                }</td>
            </tr>
            <tr>
                <td colspan="4" style="vertical-align:top; width: 50%;z-index: 1200;" class="small_english b-left" >We hereby certify that evidence has been produced to satisfy us that the goods  <br>
                    specified above originate in/where processed in the country shown in Box 8. this <br>
                    certificate is.therefore issued and certified to the best of our knowledge and <br>
                    belief to be correct and without any liability on our part.</td>
                <td colspan="3" class="small_arabic b-right ar_certificationDescr" >${
                  previewCooModelAr.certificationDescr
                }</td>
            </tr>

            <tr>
                <td style="height:30px" class="b-left">&nbsp;</td>
                <td style="height:30px" colspan="2">

                    <div align="center"style="width:176px;height:82px;" >
                        <img  alt="" style="width:176px;height:82px;" src=${
                          previewCooModelAr.signature
                        } />
                    </div>
                </td>
<!--                        <td style="" rowspan="2">&nbsp;</td>-->
                <td style="" colspan="2" rowspan="2"><img style="width: 200px;height: 190px;margin-left: 25px;" src=${
                  previewCooModelAr.icc
                } alt=""></td>
                <td colspan="2" rowspan="2" class="b-right">

                    &nbsp;

                    <div class="stampSty"></div>
                    <span class="footery2 ">
              <img src=${previewCooModelAr.stamp}>
                    <div class="cooCodeSty2">${
                      coo.coo_code ? coo.coo_code : ""
                    } <br>${coo.coo_issue_date ? coo.coo_issue_date : ""}</div>
                </span>
                    <!--<div class="cooCodeSty2" align="center">{{coo.coo_code}} <br>{{coo.coo_issue_date | date:'dd/MM/yyyy' }}</div>-->
                    <!--<span  class="cooCodeSty2">{{coo.coo_issue_date | date:'dd/MM/yyyy' }}</span>-->



                </td>

            </tr>

            <tr>
                <td style="width:17px;height:9px" class="b-left " >&nbsp;</td>
                <td style="width:90px" class="sign_english">Authorized Signatory</td>
                <td style="width:60px" class="sign_arabic">${
                  previewCooModelAr.authorizedSign
                }</td>
            </tr>
            <tr>
                <td colspan="4" style="height:15px;" class="small_english22 b-left " >Once this Certificate is issued it shall be invalid should any alteration be made to <br>this Certificate, without the competent Authority's authorization.</td>
                <td colspan="3" style="height:15px;" class="small_arabic22 b-right" >${
                  previewCooModelAr.signDescr
                }</td>
            </tr>
        </table>
        <table style="width:100%;border:0;border:none;">
            <tr style="height:36px;">
                <td ng-controller="qrCOOReader" style="width:50%;padding-left:11px;" class="b-left b-top b-bottom b-right">

   <p style="margin-top: 10px;height:55px;">
                      <img src=${url} alt="Qr Code" class="height80" style="height:100%"/>
                    </p>

                </td>
                <td class="xxsmall_arabic mmLineHeight b-right b-top b-bottom" >
                    <span>للتأكد من صحة بیانات الشھادة یرجي الرجوع لموقع الغرفة</span> <br>
                    <span>For online verification of this certificate,please visit our website</span><br>
                    <span>http://www.rakchamber.ae</span><br>
                    ------------------------------------------<br>
                    <span>Verify ID: ${
                      coo.verify_id ? coo.verify_id : ""
                    }</span>
                </td>
            </tr>
        </table>

        <table style="margin-top:1px;width:100%;border:none;" >
            <tr>
                <td colspan="2" class="small_english">${
                  previewCooModelAr.rakChamber
                }<br>
                    RAK Chamber of Commerce &amp; Industry<br>
                    ${previewCooModelAr.pobox}</td>
                <td  class="small_arabic mFooterPadding" style="width:50%;padding-left:186px;">${
                  coo.company_code
                }/${coo.coo_code ? coo.coo_code : ""}/${
  coo.coo_issue_date ? coo.coo_issue_date : ""
}/RAKCHAMBER</td>
            </tr>
        </table>
            </div>

            <!-- page 3 -->
            <div  class="paper " style="direction: ltr ;margin-bottom: 0px;">

            <table style="width:100%;padding:0; border:none;">
            <tr class="b-left b-right b-top">
                <td style="padding:0;width:50%;"  class="b-right" >
                    <table style="width:100%; padding:0;">
                        <tr>
                            <td style="height:21px;padding-right:0;" class="large_english ">1. EXPORTER(NAME,ADDRESS,COUNTRY)</td>
                            <td class="large_arabic">${
                              previewCooModelAr.exporter
                            }</td></tr>

                        <tr><td colspan="2" style="height:18px;" ng-if="cooType != 3" class="medium_english"> ${
                          currentLanguage === "en_US"
                            ? coo.company_name_e
                              ? coo.company_name_e
                              : ""
                            : coo.company_name
                            ? coo.company_name
                            : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english">POBOX: ${
                          coo.pobox
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english">Ras Al Khaimah - United Arab Emirates</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english"></td></tr>
                        <tr><td style="height:21px;" class="large_english b-top">2. CONSIGNEE(NAME,ADDRESS,COUNTRY)</td><td class="large_arabic b-top">${
                          previewCooModelAr.sentTo
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english ">${
                          currentLanguage === "en_US"
                            ? coo.consignee_country_name_e
                              ? coo.consignee_country_name_e
                              : ""
                            : coo.consignee_country_name
                            ? coo.consignee_country_name
                            : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination1 ? coo.destination1 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination2 ? coo.destination2 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination3 ? coo.destination3 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px" class="medium_english22">${
                          coo.destination4 ? coo.destination4 : ""
                        }</td></tr>
                        <tr><td colspan="2" style="height:18px;" class="medium_english">&nbsp;</td></tr>
                    </table>
                </td>
                <td style="padding:0;width:50%;">
                    <table style="width:100%;padding:0;border:none;">
                        <tr>
                            <td style="height:31px;" class="xlarge_english">UNITED ARAB EMIRATES</td>
                            <td style="height:31px;" class="xlarge_arabic ">${
                              previewCooModelAr.uae
                            }</td>
                        </tr>
                        <tr>
                        <td colspan="2" style="height:125px;" class="b-top">
                        <img style="height:100%;" src=${
                          previewCooModelAr.issued_coo_img
                        } alt="">
                    </td>
                        </tr>
                        <tr>
                            <td style="height:18px;" class="large_english b-top">Certificate No. ${
                              coo.coo_code ? coo.coo_code : ""
                            }</td>
                            <td style="text-align:right; height:18px;" class="large_english b-top">${
                              coo.coo_issue_date ? coo.coo_issue_date : ""
                            } </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="height:35px;"  class="center_english " >
                                ${previewCooModelAr.typeOfCopy2}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width:100%;padding:0;border:none;">
            <tr class="b-left b-right b-top">
                <td style="padding:0;width:50%;" class="b-right">
                    <table style="width:100%;padding:0;">
                        <tr style="height:18px;" >
                            <td class="large_english">3. Means of Transport</td>
                            <td class="large_arabic">${
                              previewCooModelAr.transport
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              currentLanguage === "en_US"
                                ? coo.transportation_name_e
                                  ? coo.transportation_name_e
                                  : ""
                                : coo.transportation_name
                                ? coo.transportation_name
                                : ""
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top">4. Estimated Date of Departure</td>
                            <td class="large_arabic b-top">${
                              previewCooModelAr.depatureDate
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              coo.estimated_date_of_departure
                                ? moment(
                                    new Date(coo.estimated_date_of_departure)
                                  ).format("YYYY-MM-DD")
                                : ""
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top">5. Port of Discharge</td>
                            <td class="large_arabic b-top">${
                              previewCooModelAr.dischargePort
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              coo.port_of_discharge ? coo.port_of_discharge : ""
                            }</td>
                        </tr>
                    </table>
                </td>
                <td style="padding:0;width:50%;">
                    <table style="width:100%;padding:0;">
                        <tr style="height:18px;">
                            <td  class="large_english" >6. Country of Final Destination</td>
                            <td  class="large_arabic" >${
                              previewCooModelAr.outCountry
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${
                              currentLanguage === "en_US"
                                ? coo.consignee_country_name_e
                                  ? coo.consignee_country_name_e
                                  : ""
                                : coo.consignee_country_name
                                ? coo.consignee_country_name
                                : ""
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top" >7. Invoice No. and Date</td>
                            <td class="large_arabic b-top" >${
                              previewCooModelAr.invoiceDate
                            } </td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2"  class="medium_english" >${
                              coo.invoice_no ? coo.invoice_no : ""
                            }&nbsp;,${
  coo.invoice_issue_date
    ? moment(new Date(coo.invoice_issue_date)).format("YYYY-MM-DD")
    : ""
}</td>
                        </tr>
                        <tr style="height:18px;">
                            <td class="large_english b-top" >8. Country of Origin of Goods</td>
                            <td class="large_arabic b-top" >${
                              previewCooModelAr.originCountry
                            }</td>
                        </tr>
                        <tr style="height:18px;">
                            <td colspan="2" class="medium_english" >${origin_country}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table style="width:100%;padding:0;border:none;" >
            <tr>
                <td style="width:17%;"   class="large_english b-top b-left" >9.&nbsp;${
                  previewCooModelAr.marksNum
                }</td>
                <td style="width:66%;" class="large_english b-top" >10.&nbsp;${
                  previewCooModelAr.kindofPackage
                }</td>
                <td style="width:17%;" class="large_english b-top b-right" >11.&nbsp;${
                  previewCooModelAr.quantityUnit
                }</td>
            </tr>
            <tr>
                <td class="large_english b-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marks&amp;Numbers</td>
                <td class="large_english">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. and Kind of Packages,Description of Goods(Include Brand Names if Necessary)</td>
                <td class="large_english  b-right" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity&amp; Unit</td>
            </tr>
           
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line1 ? coo.line1 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line2 ? coo.line2 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line3 ? coo.line3 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line4 ? coo.line4 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">

                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line5 ? coo.line5 : ""
                }</td>

            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line6 ? coo.line6 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line7 ? coo.line7 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal " >${
                  coo.line8 ? coo.line8 : ""
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:18px;" colspan="3" class="xxsmall_english_normal_centre22 " >${
                  coo.line9
                    ? coo.line9
                    : currentLanguage === "en_US"
                    ? "As per attached Invoice"
                    : "حسب الفاتورة المرفقة"
                }</td>
            </tr>
            <tr class="b-right b-left">
                <td style="height:108px" colspan="3" class="xxsmall_english_normal mmHeight noHeight" ></td>
            </tr>
        </table>
        <table style="width:100%;" >
            <tr>
                <td colspan="4" class="large_english b-top  b-left" >12. CERTIFICATION BY THE COMPETENT AUTHORITY</td>
                <td colspan="3" class="large_arabic b-top  b-right" >${
                  previewCooModelAr.cerification
                }</td>
            </tr>
            <tr>
                <td colspan="4" style="vertical-align:top; width: 50%;z-index: 1200;" class="small_english b-left" >We hereby certify that evidence has been produced to satisfy us that the goods  <br>
                    specified above originate in/where processed in the country shown in Box 8. this <br>
                    certificate is.therefore issued and certified to the best of our knowledge and <br>
                    belief to be correct and without any liability on our part.</td>
                <td colspan="3" class="small_arabic b-right ar_certificationDescr" >${
                  previewCooModelAr.certificationDescr
                }</td>
            </tr>

            <tr>
                <td style="height:30px" class="b-left">&nbsp;</td>
                <td style="height:30px" colspan="2">

                    <div align="center"style="width:176px;height:82px;" >
                        <img  alt="" style="width:176px;height:82px;" src=${
                          previewCooModelAr.signature
                        } />
                    </div>
                </td>
<!--                        <td style="" rowspan="2">&nbsp;</td>-->
                <td style="" colspan="2" rowspan="2"><img style="width: 200px;height: 190px;margin-left: 25px;" src=${
                  previewCooModelAr.icc
                } alt=""></td>
                <td colspan="2" rowspan="2" class="b-right">

                    &nbsp;

                    <div class="stampSty"></div>
                    <span class="footery2 ">
              <img src=${previewCooModelAr.stamp}>
                    <div class="cooCodeSty2">${
                      coo.coo_code ? coo.coo_code : ""
                    } <br>${coo.coo_issue_date ? coo.coo_issue_date : ""}</div>
                </span>
                    <!--<div class="cooCodeSty2" align="center">{{coo.coo_code}} <br>{{coo.coo_issue_date | date:'dd/MM/yyyy' }}</div>-->
                    <!--<span  class="cooCodeSty2">{{coo.coo_issue_date | date:'dd/MM/yyyy' }}</span>-->



                </td>

            </tr>

            <tr>
                <td style="width:17px;height:9px" class="b-left " >&nbsp;</td>
                <td style="width:90px" class="sign_english">Authorized Signatory</td>
                <td style="width:60px" class="sign_arabic">${
                  previewCooModelAr.authorizedSign
                }</td>
            </tr>
            <tr>
                <td colspan="4" style="height:15px;" class="small_english22 b-left " >Once this Certificate is issued it shall be invalid should any alteration be made to <br>this Certificate, without the competent Authority's authorization.</td>
                <td colspan="3" style="height:15px;" class="small_arabic22 b-right" >${
                  previewCooModelAr.signDescr
                }</td>
            </tr>
        </table>
        <table style="width:100%;border:0;border:none;">
            <tr style="height:36px;">
                <td ng-controller="qrCOOReader" style="width:50%;padding-left:11px;" class="b-left b-top b-bottom b-right">

                     <p style="margin-top: 10px;height:55px;">
                     <img src=${url} alt="Qr Code" class="height80" style="height:100%"/>
                    </p>

                </td>
                <td class="xxsmall_arabic mmLineHeight b-right b-top b-bottom" >
                    <span>للتأكد من صحة بیانات الشھادة یرجي الرجوع لموقع الغرفة</span> <br>
                    <span>For online verification of this certificate,please visit our website</span><br>
                    <span>http://www.rakchamber.ae</span><br>
                    ------------------------------------------<br>
                    <span>Verify ID: ${
                      coo.verify_id ? coo.verify_id : ""
                    }</span>
                </td>
            </tr>
        </table>

        <table style="margin-top:1px;width:100%;border:none;" >
            <tr>
                <td colspan="2" class="small_english">${
                  previewCooModelAr.rakChamber
                }<br>
                    RAK Chamber of Commerce &amp; Industry<br>
                    ${previewCooModelAr.pobox}</td>
                <td  class="small_arabic mFooterPadding" style="width:50%;padding-left:186px;">${
                  coo.company_code
                }/${coo.coo_code ? coo.coo_code : ""}/${
  coo.coo_issue_date ? coo.coo_issue_date : ""
}/RAKCHAMBER</td>
            </tr>
        </table>

            </div>
        </div>
</div>

`;
