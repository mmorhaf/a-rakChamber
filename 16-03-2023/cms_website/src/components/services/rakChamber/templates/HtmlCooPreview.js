import moment from "moment";
export const HtmlCooPreview = (
  coo,
  origin_country,
  previewCooModelAr,
  currentLanguage
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
      background: url(${previewCooModelAr.copy}) no-repeat center;
      background-size: contain;
      padding:7px;
      width:800px;
    }
    @media (max-width: 1180px) {
      .paper {
        width:100%;
      }
    }
    .paper-footer {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 7px;
      font-weight: bolder;
      padding-left: 6px;
      padding-top: 3px;
      color: black;
  }
    .ar_certificationDescr{
        vertical-align:top; width: 50%;z-index: 1200;
    }

    .footery2{

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
          line-height:2

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
.width {
  width :762px!important;
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
      
    }
    
</style>

<div id="printSection_aura">
 <div id="printSection" class="paper  p-a-xs" style=" background-color: #fff;overflow-x:scroll;">

  <table style="width:380px;padding:0; border:none;">
    <tr class="b-left b-right b-top">
        <td style="padding:0;width:50%;"  class="b-right" >
         <table style="width:380px; padding:0;">
             <tr>
               <td style="height:21px;padding-right:0;" class="large_english">1. EXPORTER(NAME,ADDRESS,COUNTRY)&nbsp;|&nbsp; <span class="large_arabic">${
                 previewCooModelAr.exporter
               }</span></td>
               </tr>
             <tr><td colspan="2" style="height:18px;" class="medium_english ">
                 <!--{{currentLanguage === "en_US" ? coo.company_name_e:coo.company_name}}-->
                 ${
                   currentLanguage === "en_US"
                     ? coo.company_name_e
                       ? coo.company_name_e
                       : ""
                     : coo.company_name
                     ? coo.company_name
                     : ""
                 }</td></tr>
             <tr><td colspan="2" style="height:18px;" class="medium_english ">POBOX</td></tr>
             <tr><td colspan="2" style="height:18px;" class="medium_english ">Ras Al Khaimah - United Arab Emirates</td></tr>
             <tr><td colspan="2" style="height:18px;" class="medium_english "></td></tr>
             <tr><td style="height:21px;" class="large_english b-top ">2. CONSIGNEE(NAME,ADDRESS,COUNTRY)&nbsp;|&nbsp; <span class="large_arabic height35">${
               previewCooModelAr.sentTo
             }</span></td>
             <tr><td colspan="2" style="height:18px" class="medium_english ">${
               currentLanguage === "en_US"
                 ? coo.consignee_country_name_e
                   ? coo.consignee_country_name_e
                   : ""
                 : coo.consignee_country_name
                 ? coo.consignee_country_name
                 : ""
             }</td></tr>
             <tr><td colspan="2" style="height:18px" class="medium_english22 ">${
               coo.destination1 ? coo.destination1 : ""
             }</td></tr>
             <tr><td colspan="2" style="height:18px" class="medium_english22 ">${
               coo.destination2 ? coo.destination2 : ""
             }</td></tr>
             <tr><td colspan="2" style="height:18px" class="medium_english22 ">${
               coo.destination3 ? coo.destination3 : ""
             }</td></tr>
             <tr><td colspan="2" style="height:18px" class="medium_english22 ">${
               coo.destination4 ? coo.destination4 : ""
             }</td></tr>
             <tr><td colspan="2" style="height:18px;" class="medium_english ">&nbsp;</td></tr>
         </table>
        </td>
        <td style="padding:0;width:50%;">
         <table style="width:380px;padding:0;border:none;">
               <tr>
                   <td style="height:33px;" class="xlarge_english ">UNITED ARAB EMIRATES</td>
                   <td style="height:33px;" class="xlarge_arabic ">${
                     previewCooModelAr.uae
                   }</td>
               </tr>
                <tr>
                   <td colspan="2" style="height:125px;" class="b-top"><img src=${
                     previewCooModelAr.img
                   } width="200" alt="Flowers in Chania"/></td>
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
                    ${previewCooModelAr.typeOfCopy}</td>
                </tr>
            </table>
        </td>
    </tr>
   </table>




   <table style="width:380px;padding:0;border:none;">
     <tr class="b-left b-right b-top">
         <td style="padding:0;width:380%;" class="b-right">
             <table style="width:380px;padding:0;">
                <tr style="height:18px;" >
                    <td class="large_english">3. Means of Transport</td>
                    <td class="large_arabic">${previewCooModelAr.transport}</td>
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
         <td style="padding:0;width:380px;">
             <table style="width:380px;padding:0;">
               <tr style="height:16px;">
                   <td  class="large_english" >6. Country of Final Destination</td>
                   <td  class="large_arabic" >${
                     previewCooModelAr.outCountry
                   } </td>
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





   <table style="padding:0;border:none;" width="763px">
     <tr>
       <td style="width:17%!important;"   class="large_english b-top b-left" >9.&nbsp;${
         previewCooModelAr.marksNum
       }</td>
       <td style="width:66%!important;" class="large_english b-top" >10.&nbsp;${
         previewCooModelAr.kindofPackage
       }</td>
       <td style="width:17%!important;" class="large_english b-top b-right" >11.&nbsp;${
         previewCooModelAr.quantityUnit
       }</td>
     </tr>
     <tr>
       <td  class="large_english b-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marks&amp;Numbers</td>
       <td  class="large_english">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. and Kind of Packages,Description of Goods(Include Brand Names if Necessary)</td>
       <td  class="large_english  b-right" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity&amp; Unit</td>
     </tr>
     <tr class="b-right b-left">
       <td style="height:63px;" colspan="3" class="xxsmall_english_normal_centre " >
         
          <!-- <p ng-repeat="elem in origin_countries">{
            currentLanguage === "en_US" ? elem.name_e : elem.name
          }</p> 
      <span ng-if='printOriginList'>
          <p class="inline" ng-repeat="elem in origin_countries">{
            currentLanguage === "en_US"
              ? elem.country_name_e
              : elem.country_name
          },</p>
          </span>-->
         
       </td>
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
       <td style="height:18px;" colspan="3" class="xxsmall_english_normal_centre22" >${
         coo.line9
           ? coo.line9
           : currentLanguage === "en_US"
           ? "As per attached Invoice"
           : "حسب الفاتورة المرفقة"
       }</td>
     </tr>
     <tr class="b-right b-left">
       <td style="height:108px;" colspan="3" class="xxsmall_english_normal mmHeight noHeight" ></td>
     </tr>
   </table>



   <table style="width: 763px" >
 <tr>
   <td colspan="4" class="large_english b-top  b-left" >12. CERTIFICATION BY THE COMPETENT AUTHORITY</td>
   <td colspan="3" class="large_arabic b-top  b-right" >${
     previewCooModelAr.cerification
   }</td>
 </tr>
 <tr>
   <td colspan="4" style="vertical-align:top; width: 50%;" class="small_english b-left" >We hereby certify that evidence has been produced to satisfy us that the goods  <br>
       specified above originate in/where processed in the country shown in Box 8. this <br>
     certificate is.therefore issued and certified to the best of our knowledge and <br>
 belief to be correct and without any liability on our part.</td>
   <td colspan="3" style="vertical-align:top; width: 50%;" class="small_arabic b-right " >${
     previewCooModelAr.certificationDescr
   }</td>
 </tr>

 <tr>
   <td style="height:30px" class="b-left">&nbsp;</td>
   <td style="height:30px" colspan="2"><div align="center"><img  alt="" style="width:176px;height:82px;" /></div></td>
   <td style="" rowspan="2">&nbsp;</td>
   <td colspan="3" rowspan="2" class="b-right">&nbsp;</td>
 </tr>
 <tr>
   <td style="width:17px;height:9" class="b-left " >&nbsp;</td>
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



   <table style="width:763px;border:0;border:none;">
 <tr style="height:36px;">
   <td style="width:50%;padding-left:11px;" class="b-left b-top b-bottom"></td>
   <td class="xxsmall_arabic b-right b-top b-bottom" ></td>
 </tr>
 </table>



   <table style="margin-top:1px;width:765px;border:none;" >
     <tr>
       <td colspan="2" class="paper-footer">${
         previewCooModelAr.rakChamber
       }<br />
         RAK Chamber of Commerce &amp; Industry<br />
         ${previewCooModelAr.pobox}</td>
     </tr>
   </table>

 
   </div>
   </div>

</div> `;
