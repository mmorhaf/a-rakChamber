export const HtmlMembershipEstablishmentProfile = (
  objProfile,
  activities,
  previewCooModelAr
) => `
<html>
<head>
<style>
    .paper .clear{clear:both;content: "";display: block;padding: 10px;}
    .A4-height{height: 35cm;}
    .paper * {direction: ltr !important;}
    .rtl {text-align: right !important;}
    .paper  {
        font-size: 14px;
        border:1px solid #ccc;
        display:block;
        margin: 10px auto;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color:black;
        background-color: #ffffff;
        max-width: 21cm;
        padding:7px;
    }
    .box-header h2, .box-header h3, .box-header h4 {
        margin: 0;
        font-size: 18px;
        line-height: 1;
    }
</style>
</head>
<body>
<div class="paper ">
    <div class="p-a-xs">

        <div class="row box-body">
            <div class="col-md-12 " style="direction: ltr !important; font-family: 'Droid Arabic Kufi', Arial, sans-serif !important;">


                <div id="profile_printSection " class="visible-print box" >

                    <div class="box-header">
                        <div class="row"  style="direction: ltr !important;">
                            <div class="col-md-4"><div class="header-text"><h2 class="">Establishment Profile</h2></div></div>
                            <div class="col-md-4 text-center"><img class="hdr-img" src=${
                              previewCooModelAr.img
                            } style="height: 110px" title="chmberlogo" alt="chmberlogo"></div>
                            <div class="col-md-4" ><h2 class="rtl">بيانات المنشأة</h2>
                            </div>
                            <div class="line"></div>
                            <!-- // Start page-content -->
                        </div>
                    </div>


                    <div class="row"  style="direction: ltr !important;">
                        <div class="col-md-4 ">&nbsp; &nbsp;Date: &nbsp;${new Date()
                          .toISOString()
                          .slice(0, 10)}</label> &nbsp; </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4 rtl" >&nbsp; &nbsp; التاريخ:  &nbsp;${new Date()
                          .toISOString()
                          .slice(0, 10)}</label> &nbsp; </div>
                        <div class="line"></div>
                    </div>

                </div>

                <div class="visible-print box">
                    <table class="table" ng-repeat="objProfile in company_profile" style="border-width: 5px;">
                        <tbody>
                        <tr class="">
                            <td class="" >Trade Name (Arabic)</td>
                            <td class="text-center">${
                              objProfile.company_name
                                ? objProfile.company_name
                                : ""
                            }</td>
                            <td class="rtl" >الاسم التجاري (باللغة العربية)</td>
                        </tr>
                        <tr class="">
                            <td class="">Trade Name (English)</td>
                            <td class="text-center">${
                              objProfile.company_name_e
                                ? objProfile.company_name_e
                                : ""
                            }</td>
                            <td class="rtl" >الاسم التجاري (باللغة الإنجليزية)</td>
                        </tr>
                        <tr class="">
                            <td class="">Company Legal Status (Arabic)</td>
                            <td class="text-center">${
                              objProfile.company_legal_status
                                ? objProfile.company_legal_status
                                : ""
                            }</td>
                            <td class="rtl" >الشكل القانوني (باللغة العربية)</td>
                        </tr>
                        <tr class="">
                            <td class="">Company Legal Status (English)</td>
                            <td class="text-center">${
                              objProfile.company_legal_status_e
                                ? objProfile.company_legal_status_e
                                : ""
                            }</td>
                            <td class="rtl" >الشكل القانوني (باللغة الإنجليزية)</td>
                        </tr>
                        <tr class="">
                            <td class="">Trade Registration No</td>
                            <td class="text-center">${
                              objProfile.trade_registration_no
                                ? objProfile.trade_registration_no
                                : ""
                            }</td>
                            <td class="rtl" >رقم الرخصة التجارية</td>
                        </tr>
                        <tr class="">
                            <td class="">Telephone Number</td>
                            <td class="text-center">${
                              objProfile.phone ? objProfile.phone : ""
                            }</td>
                            <td class="rtl" >رقم الهاتف</td>
                        </tr>
                        <tr class="">
                            <td class="">Fax  Number</td>
                            <td class="text-center">${
                              objProfile.fax ? objProfile.fax : ""
                            }</td>
                            <td class="rtl" >رقم الفاكس</td>
                        </tr>
                        <tr class="">
                            <td class="">Address</td>
                            <td class="text-center"><p>${
                              objProfile.emirate_name
                                ? objProfile.emirate_name
                                : ""
                            }, ${
  objProfile.company_city ? objProfile.company_city : ""
}, ${objProfile.street_name ? objProfile.street_name : ""}</p>
                                <p>${
                                  objProfile.emirate_name_e
                                    ? objProfile.emirate_name_e
                                    : ""
                                }, ${
  objProfile.company_city_e ? objProfile.company_city_e : ""
}, ${objProfile.street_name_e ? objProfile.street_name_e : ""}</p></td>
                            <td class="rtl" >العنوان</td>
                        </tr>
                        <tr class="">
                            <td class="">E-mail</td>
                            <td class="text-center">${
                              objProfile.email ? objProfile.email : ""
                            }</td>
                            <td class="rtl" >البريد الإلكتروني</td>
                        </tr>
                        <tr class="">
                            <td class="">P.O.Box</td>
                            <td class="text-center">${
                              objProfile.pobox ? objProfile.pobox : ""
                            }</td>
                            <td class="rtl" >صندوق البريد</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div class="box">
                  <table class="table">
                    <tbody>
                        <tr class="">
                            <td class="">Activity Name (ARABIC)</td>

                            <td class="">

                            ${activities.map(
                              (item) =>
                                `<table class="table">
                                <tbody>
                                  <tr class="text-center">
                                    <td>${item.activity_name}</td>
                                  </tr>
                                </tbody>
                              </table>`
                            )}
                            </td>

                            <td class="rtl" >اسم النشاط (باللغة العربية)</td>
                         </tr>

                        <tr class="">
                            <td class="">Activity Name (English)</td>

                            <td >

                            ${activities.map(
                              (item) =>
                                ' <table class="table" >\n' +
                                "<tbody>\n" +
                                '<tr class="text-center">\n' +
                                "<td>\n" +
                                item.activity_name_e +
                                "</td>\n" +
                                "</tr>\n" +
                                "</tbody>\n" +
                                "</table>"
                            )}
                            </td>

                            <td class="rtl" >اسم النشاط (باللغة الإنجليزية)</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <p class="rtl" >
                ملاحظة: تصدر هذه البيانات دون أي مسؤولية من غرفة تجارة وصناعة رأس الخيمة وظهور اسم الشركة في نتائج البحث لا يعني بالضرورة أن المنشأة مازالت سارية فقد تكون الشركة منتهية.
                </p>
                <p>
                    * This information are issued without any responsibility on RAK Chamber of Commerce &amp; Industry, and the appearance of company's name in search results does not necessarily mean that the registration of the company at RAK Chamber is still valid, company registration might be expired.
                </p>
                <div class="footer col-sm-12 text-center text-chm-blue">
                    <p>

                    الإمارات العربية المتحدة - رأس الخيمة - United Arab Emirates - Ras Al Khaimah<br>
                        &nbsp; ص.ب : 87 :P.O.Box
                        &nbsp; هاتف: 0097172260000 :Tel
                        &nbsp; فاكس: 0097172070292 :Fax
                        Website:<a href="www.rakchamber.ae" title="">www.rakchamber.ae</a>  &nbsp; - &nbsp; <a href="mailto:info@rakchamber.ae">info@rakchamber.ae</a>

                    </p>

                </div>


            </div><!-- // End page-content-inner -->

        </div>
    </div>

</div>

</body>
</html>

 
`;
