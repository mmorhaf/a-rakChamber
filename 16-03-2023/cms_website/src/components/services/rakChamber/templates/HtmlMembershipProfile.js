export const HtmlMembershipProfile = (
  company_MemberShipProfile,
  activities,
  previewCooModelAr,
  isRTL
) => `
<html>
<head>
<style>
/*!
 * Bootstrap v2.2.2
 *
 * Copyright 2012 Twitter, Inc
 * Licensed under the Apache License v2.0
 * aaaa://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world @twitter by @mdo and @fat.
 */


#membr_printSection.paper {
  background: linear-gradient(rgb(255 255 255 / 80%), rgb(255 255 255 / 80%)) , url(${
    previewCooModelAr.copy
  }) no-repeat center;
  background-size: contain;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}


/* Stylesheet content from assets/css/style.css in folder common */

/* Stylesheet content from assets/css/style.css in folder common */
@charset "utf-8";

/*@import "common.css";*/

/* CSS Document */

/*@import url(https://fonts.googleapis.com/css?family=Lato:700,400);*/
/* @import "../fonts/lato/stylesheet.css"; */

/* --- Global ---  */


.light {
    font-family: 'latolight';
}

.bold, strong {
    font-family: 'latobold';
}
#WLdialogTitle{
	color: #000;
}
/* Floating Box */
.floating:after {
    display: block;
    content: '';
    clear: both;
}

/* Clear Fix */
.clearfix:before, .clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}

.clr, .clear {
    clear: both;
}

.overflowHidden {
    overflow: hidden !important;
}

.hover{
   -moz-transition: all .3s cubic-bezier(0.55,0.085,0.68,0.53);
    -o-transition: all .3s cubic-bezier(0.55,0.085,0.68,0.53);
    -webkit-transition: all .3s cubic-bezier(0.55,0.085,0.68,0.53);
    transition: all .3s cubic-bezier(0.55,0.085,0.68,0.53);
}


/* !Floating Box */

/* >>> Grid view ################################# */
.grid {
}

.grid:after, .mobileGrid:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
}

.grid > [class^=cell] {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.grid.expanded {
    margin: 0 -8px;
}

.grid.expanded > [class^=cell] {
    padding: 0 8px;
}

[lang='ar'] .grid > [class^=cell] {
    float: right;
}

.tableGrid {
    display: table;
    width: 100%;
}

.tableGrid > [class^=cell] {
    display: table-cell;
    vertical-align: middle;
}

.cell2 {
    width: 16.6666%;
}

.cell3 {
    width: 25%;
}

.cell4 {
    width: 33.3333%;
}

.cell5 {
    width: 41.6666%;
}

.cell6 {
    width: 50%;
}

.cell7 {
    width: 58.3333%;
}

.cell8 {
    width: 66.6666%;
}

.cell9 {
    width: 75%;
}

.cell12 {
    width: 100%;
}

/* >>> !Grid view ################################# */


/* Utils ################################# */
.hide {
    display: none !important;
}

/*.tabs-hidden{display:none;}*/


.block {
    display: block !important;
}

.inline {
    display: inline !important;
}

.relative {
    position: relative;
}

/* !Utils ################################# */

/* Forms ############################# */

.input, .select {
    width: 100%;
    border: 1px solid #d9d9d9;
    height: 43.07px;
    border-radius: 4px;
    padding-left: 14.6px;
    padding-right: 14.6px;
    font-size: 11.5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* color: #8a8a8a; */
    background-color: #FFF;
    line-height: 30px;
}
.textarea{
	 height: 180px;
}


.select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("../images/select.png");
    background-repeat: no-repeat;
    background-size: 13px;
    background-position: 98% center;
}

.button {
    width: 100%;
    height: 48.6px;
    background-color: #b2c900;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-size: 17px;
    padding-left: 14px;
    padding-right: 14px;
}

.small-btn {
    height: 42px
}

.btn-blue {
    background-color: #00388b;
}
.btn-gray {
    background-color: #508FB3;
}


.gris-btn {
    background-color: #555555;
}

.formRow {
    margin-bottom: 9.3px;
}

.formRowBtn {
    margin-top: 40px;
    text-align: center;
}

.padding-right-input {
    padding-right: 5px;
}

[lang='ar'] .padding-left-input {
    padding-left: 5px;
}

.padding-right-button {
    padding-right: 2.7px;
}

[lang='ar'] .padding-left-button {
    padding-left: 2.7px;
}

/* !Forms ############################# */

/* ################################################################ PAGES */
.showMenu {
    overflow: hidden;
}




#header img {
    position: absolute;
}

[lang='ar'] .right-icon {
    left: 21.8px;
    right: auto;
}

[lang='ar'] .left-icon {
    right: 21.8px;
    text-align: right;
}
.right-icon {
    right: 21.8px;
    top: 50%;
    width: 23.22px;
    height: 26.6px;
    margin-top: -20px;
    position: absolute;
    background-size: 22.22px;
    background-repeat: no-repeat;
    padding: 20px 20px;
    background-position: center center;
    cursor: pointer;
    display: block;
}
.menu-icon{
    background-image: url("../images/menu-icon.png");
    
}
.exit-icon{
    background-image: url("../images/switch-icon.png");
}
.back-icon{
    background-image: url("../images/back-icon.png");
}
.left-icon {
    left: 21.8px;
    top: 50%;
    width: 21.5px; 
    height: 18.5px; 
    margin-top: -18px;
    position: absolute;
    background-size: 21.5px;
    background-repeat: no-repeat;
    padding: 20px 20px;
    background-position: center center;
    cursor: pointer;
    text-align: left;
}
[lang='ar'] .menu-icon {
    left: 60px;
    right: auto;
}
[lang='en'] .menu-icon {
    right: 60px;
    left: auto;
}
[lang='ar'] .isIOS.showMenu .left-icon {
    left: 21.8px;
    right: auto;
}

[lang='ar'] .isIOS.showMenu .right-icon {
    right: 21.8px;
    left: auto;
}

#header2 {
    height: 80px;
    line-height: 30px;
    border-bottom: 3.4px solid #b2c900;
    background: url(../images/bd50_footer.png) repeat rgba(0,0,0,.25);
    text-align: center;
    display: table;
    width: 100%;
}

#header2 h2 {
    display: table-cell;
    vertical-align: middle;
}



/* #footer { */
/* } */

/* .link-footer{background-repeat: no-repeat; height: 74px;background-size: 74px; float: left;width: 120px;} */

/* #footer a { */
/*     padding: 81.5px 0 17.3px; */
/*     display: block; */
/*     margin: 0px 20px; */
/*     text-align: center; */
/*     background-size: 50.6px auto; */
/*     background-repeat: no-repeat; */
/*     background-position: center 21.8px; */
/*     font-size: 11.5px; */
/* } */

/* #footer a.contacts { */
/*     background-image: url("../images/contacts.png"); */
/* } */
/* #footer a.feedback { */
/*     background-image: url("../images/feedback.png"); */
/* } */
/* #footer a.coo-verification { */
/*     background-image: url("../images/coo-verification.png"); */
/* } */

.separator {
    background-image: url("../images/separator.png");
    background-size: 1px;
    background-repeat: no-repeat;
    background-position: right 34.7px;
}

[lang='ar'] .separator {
    background-position: left 34.7px;
}


/* #content{ */
	/* margin-top: 1%; */
    /* padding-top: 0px; */
/* } */

#content-main{
    margin-top: 2.5%;
    padding-top: 0px;
     
}

#content-menu {
     margin-top: 0px;
    padding-top: 0px;
}



/*******************
General styling
********************/


.large-margin {
    margin-right: 3.7%;
    margin-left: 3.7%;
}

.medium-margin {
    margin-right: 2.5%;
    margin-left: 2.5%;
}

.small-margin {
    margin-right: 0.8%;
    margin-left: 0.8%;
}


/*****Css Menu******/
#main-menu #header {
    height: 131px;
    line-height: 131px;
    border-bottom: 3.4px solid #b2c900;
}



#main-menu ul {
    margin-bottom: 72px;
    margin-top: 10px;
}

#main-menu li {
    border-bottom: 1px solid #ebebeb;
}

#main-menu li:last-child {
    border: 0;
}

.bg-nav {
    background-repeat: no-repeat;
    display: block;
    padding: 18px 43px 18px 43px;
    background-position: left center;
    color: #000;
    background-size: 20px;
}

[lang='ar'] .bg-nav {
    background-position: right center;
}

.dashboard-menu {
    background-image: url("../images/dashboard.png")
}

.newcoo-menu {
    background-image: url("../images/newcoo-menu.png");
        background-size: 18px;
}
.newcoo-menu_dis {
    background-image: url("../images/newcoo-menu_dis.png");
        background-size: 18px;
            cursor: auto;
    		color: #767676;
}

.coolist-menu {
    background-image: url("../images/coolist-menu.png");
        background-size: 18px;
}

.payment-menu {
    background-image: url("../images/payment-menu.png");
        background-size: 18px;
}

.verification-menu {
    background-image: url("../images/verification-menu.png")
}

.profile-menu {
    background-image: url("../images/profile-menu.png")
}

.contacts-menu {
    background-image: url("../images/contacts-menu.png")
}

.logout-menu {
    background-image: url("../images/logout.png")
}
.feedback-menu {
    background-image: url("../images/feedback-menu.png")
}
.member-menu {
    background-image: url("../images/member-menu.png")
}
.board-menu {
    background-image: url("../images/board-menu.png")
}
.employee-menu {
    background-image: url("../images/employee-menu.png")
}
.membership_status-menu {
    background-image: url("../images/membership_status-menu.png")
}


/*******Css page Login*******/

#content-login {
    position: relative;
    margin-top: 15%;
    margin-bottom: 0px;
    margin-bottom: 15%;
}



.language {
    position: absolute;
    height: 60px;
    width: 200px;
    top:50%;
    margin-top: -30px;
    left: 9px;
    right: auto;
}

[lang='ar'] .language {
    right: 9px; 
    left: auto;
    
}

.icon-language {
    height: 34.02px;
    width: 34.02px;
    background-size: 100% auto;
    background-repeat: no-repeat;
    display: inline-block;
}

.language .english {
    background-image: url("../images/english-active.png");
/*     margin-right: 11.4px; */
}

[lang='ar'] .language .english {
    /*margin-left: 11.4px;*/
    margin-right: 0;
}


.language .arabic {
    background-image: url("../images/arabic.png");
}


[lang='ar'] .language .english {
    background-image: url("../images/english.png");
}

[lang='ar'] .language .arabic {
    background-image: url("../images/arabic-active.png");
}

.language .raklogo {
    background-image: url("../images/round-chm-logo.png");
         
}


.logo {
    text-align: center
}

.logo img {
    width: 122.5px;
    height: 136.1px;
}

#content-login input {
    height: 47.9px;
}

.password {
    margin-top: 13.6px;
}

.password a {
    color: #00388b;
    padding-left: 13.5px;
    font-size: 14px;
    font-weight: 700;
    padding-right: 13.5px;
}

#content-login .formRowBtn {
    margin-top: 30.5px;
}

.create-account {
    text-align: center;
    margin-top: 38.1px;
}

.create-account span {
    font-size: 14px;
}

.account {
    color: #00388b;
    font-size: 13px;
    font-weight: 700;
    background-image: url("../images/account.png");
    background-repeat: no-repeat;
    background-position: right 5.5px;
    background-size: 4.1px;
    padding-right: 8px;
}

/******Css page Registration*******/

.content-registration {
    margin-top: 46.8px;
    margin-bottom: 37.8px;
}

/******css page Coo Verfication*******/

.content-verification {
    margin-top: 55.5px;
    padding-bottom: 20px
}

.content-verification .input, .content-verification .button {
    height: 65.9px;
    margin-bottom: 8.6px;
}

.content-verification .btn-blue {
    background-color: #00388b;
}

.content-verification .formRowBtn {
    margin-top: 71.6px;
}

/*******Css Page contats******/

.content-contacts {
    margin-top: 37.5px;
    padding-bottom: 47.9px;
}

.block-contacts {
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    padding: 10.4px 17.3px 10.4px 17.3px;
    margin-bottom: 19.09px;
}

.block-contacts h4 {
    margin-bottom: 25.6px;
    font-size: 15px;
}

.block-contacts li {
    margin-bottom: 15.6px;
}

a.contact-icon {
    display: block;
    background-repeat: no-repeat;
    padding-left: 50.3px;
    background-position: left center;
    font-size: 14px;
    color: #000;
    background-size: 13px;
}

[lang='ar'] a.contact-icon {
    padding-right: 50.3px;
    background-position: right center;
}



/*****Css page Dashboard******/
#bg-profile {
    background-image: none;
    height: 60px;
    background-position: center center;
    background-size: cover;
    text-align: center;
}

#bg-profile span {
    color: #b2c900;
    font-size: 20px;
    padding-top: 3%;
    font-weight: 400;
    padding-bottom: 3%;
    display: block;
}

#bg-profile h2 {
    color: #464545;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 18px;
    display: block;
}



.content-dashboard {
    margin-top: 0px;
    padding-bottom: 0px;
}

.icon-dashboard {
    display: block;
    background-size: 130px 130px;
    background-repeat: no-repeat;
    padding: 175px 0 15px;
    text-align: center;
    color: #202020;
    background-position: center center;
    margin: 0 15px;
}

.new-coo {
    background-image: url("../images/new-coo.png");
}
.new-coo_dis{
	background-image: url("../images/new-coo_dis.png");
	    cursor: auto;
    color: #767676;
}



.coo-list {
    background-image: url("../images/coo-list.png");
}

.coo-payment {
    background-image: url("../images/payment.png");
}

.coo-verification {
    background-image: url("../images/verification.png");
}

.profile {
    background-image: url("../images/profile.png");
}

.contacts-icon {
    background-image: url("../images/contacts-icon.png");
}
.feedback-icon {
    background-image: url("../images/feedback.png");
}

.member-icon {
    background-image: url("../images/member.png");
}
.board-icon {
    background-image: url("../images/board.png");
}
.employee-icon {
    background-image: url("../images/employee.png");
}

.membership-status {
    background-image: url("../images/membership_status.png");
}
.verification-icon {
    background-image: url("../images/verification_services3.png");
}
.assets-verification {
    background-image: url("../images/assets_verification.png");
}
.member-verification {
    background-image: url("../images/member_verification.png");
}



/*******Css page New COO********/
/**css tabs**/
#main-newcoo {
}

#main-newcoo ul {
    padding: 13.5px 6px 8.5px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #f8f8f8;
}

#details.bg-details ul {
    background-color: #fff
}

#main-newcoo li {
    border-right: 1px solid #c2c2c2;
}

#main-newcoo li:last-child {
    border: 0;
}

#main-newcoo li a {
    color: #c7c7c7;
    font-size: 10.4px;
    padding: 5px;
    margin-left: 5px;
}

.cell.active a {
    color: #464545 !important;
}

#main-newcoo li a.bg-number {
    background-repeat: no-repeat;
    padding-left: 17.5px;
    background-size: 12px auto;
    display: block;
    background-position: left center;
}

.numone {
    background-image: url("../images/one.png");
}

.cell.active .numone-active {
    background-image: url("../images/one-active.png");
}

.numtwo {
    background-image: url("../images/two.png");
}

.cell.active .numtwo-active {
    background-image: url("../images/numtwo-active.png");
}

.numthree {
    background-image: url("../images/three.png");
}

.cell.active .numthree-active {
    background-image: url("../images/numthree-active.png");
}

.numfour {
    background-image: url("../images/four.png");
}

.cell.active .numfour-active {
    background-image: url("../images/numfour-active.png");
}

[lang='ar'] #main-newcoo li {
    border-left: 1px solid #c2c2c2;
    border-right: 0
}

[lang='ar'] #main-newcoo li:last-child {
    border-left: none;
}

[lang='ar'] #main-newcoo li a.bg-number {
    background-position: right center;
    padding-right: 17.5px;
    padding-left: 5px;
}

[lang='ar'] #main-newcoo li a {
    margin-right: 5px;
}

[lang='ar'] .select {
    background-position: 2% center;
}

[lang='ar'] .content-newcoo .bg-date {
    background-position: 3% center;
    text-align: right;
}

[lang='ar'] .aed {
    text-align: left
}

.tabs-visibility {
    display: none;
}

.tabs-visibility.active {
    display: block;
}

.tabs-hidden {
    display: none;
}

.tabs-hidden.active {
    display: block;
}

.tabs-show {
    display: none;
}

.tabs-show.active {
    display: block;
}

/**css general information**/
.content-newcoo {
    margin-top: 25.6px;
    margin-bottom: 15px;
}

.input-gris {
    border: 0;
    background-color: #f4f4f4;
}

.form-color {
    color: #464545;
}
.content-newcoo .button {
    width: 100%;
    max-width: 165px;
}

.content-newcoo .bg-date {
    background-image: url("../images/calendar.png");
    background-repeat: no-repeat;
    background-size: 20.8px;
    background-position: 97% center;
    padding-right: 0px;
}

.bottom-company {
    margin-bottom: 34px;
}

.pos-bg {
    padding-top: 18px;
    padding-bottom: 18px;
}

.bg-fees {
    background-color: #ebebeb;
    font-size: 13px
}

.blue {
    color: #00388b;
}

.aed {
    color: #00388b;
    text-align: right;
    font-size: 13px
}

.bottom-new {
}

.btn-margin {
    margin: 0;
}

.content-newcoo .formRowBtn {
    padding-top: 30px;
    padding-bottom: 19px;
    margin: 0;
}

/**Css page Consignee country of origin**/
#consignee label {
    color: #464545;
    font-weight: normal;
}


.consignee-content {
    margin-top: 20px;
    padding-bottom: 20px;
}

.formRowBtn {
    margin-top: 18.6px;
}

.footerPos .formRowBtn {
    margin-top: 0;
}

#consignee .formRow {
    margin-bottom: 7.2px;
}

/**css details**/
#details {
}

#details ul {
    padding: 0;
}

#details li {
    padding-top: 16px;
    padding-bottom: 16px;
    text-align: center;
}

#details li, #details li:last-child {
    border-bottom: 3px solid #f2f2f2;
}

#details li.active {
    border-bottom: 3px solid #00388b;
}

#details li .tab-style {
    color: #464545;
    padding: 0;
    font-size: 12.5px;
}

#details li.active a {
    color: #00388b;
}

#details .tab-details .btn-add {
    right: 4px;
    top: 0px;
    color: #00388b;
}

[lang='ar'] #details .tab-details .btn-add {
    left: 4px;
    right: auto;
}

[lang='ar'] .btn-add {
    padding: 13px 18px 13px 34px;
    border-right: 1px solid #c5c5c5;
    border-left: 0
}

.btn-add {
    padding: 13px 34px 13px 18px;
    background-image: url("../images/add.png");
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: right center;
    font-size: 14px;
    display: block;
    position: absolute;
    border-left: 1px solid #c5c5c5;
}

#details .tab-details {
    margin-bottom: 63px;
    color: #3a3a3a;
    font-size: 18.5px;
    padding: 5px;
}

#details .tab-details .sub-tabs-content {
    display: none;
}

#details .tab-details .sub-tabs-content.active {
    display: block;
}

#details .tab-details .sub-tabs-content.has-top-bar {
    position: relative;
    padding-top: 48px
}

#details .tab-details .click {
    text-align: center;
    padding: 46px 0 20px;
}

#advanced-details .content-newcoo {
    margin-bottom: 20px;
}

#advanced-details .formRow {
    margin-bottom: 6.9px;
}

#advanced-details .content-newcoo .formRowBtn {
    margin-bottom: 0;
}

#advanced-details .input {
    height: 38px;
    font-size: 8.6px;
}

#advanced-details .button {
    width: 100%;
}

.footerPos {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 32px;
    
    background-color: #fff;
    margin: 0 auto;
    width: 90%;
}

/**Css popin **/
#mainPopin {
    position: fixed;
    top: 84px;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    -webkit-align-items: center;
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
}

.popin {
    border: 1px solid #e3e3e3;
    box-shadow: 0px 0px 15px -5px;
    border-radius: 4px;
    background-color: #FFF;
    width: 341px;
    max-width: 90%;
    margin: 0 auto;
}

.margin-popin {
    margin-right: 12px;
    margin-left: 12px;
    margin-bottom: 19px;
}

.content-popin .closex {
    background-image: url("../images/close.png");
    background-size: 15px;
    padding-right: 22px;
    height: 22px;
    background-repeat: no-repeat;
    border: 0;
    background-color: #fff;
    background-position: center center;
}

.content-popin .close-btn {
    text-align: right;
    margin-top: 11px;
}

.content-popin .input, .content-popin .select {
    height: 36px;
}

.content-popin .aed {
    color: #00388b;
}

.content-popin .bg-fees {
    margin-top: 8.7px;
}

.content-popin label {
    padding-bottom: 3.8px;
}

.content-popin .formRow {
    margin-bottom: 7px;
}

.content-popin .formRowBtn {
    margin-top: 27px;
}

.content-popin .small-btn {
    height: 43px;
    font-size: 13px;
}

.hidden {
    display: none !important;
}

/**Css Hscode details table**/
#tab-hsdetails {
}

#tab-hsdetails a {
    color: #000;
}

.table-content {
    border-bottom: 1px solid #d5d5d5;
    padding: 10.7px 5px 7px 5px;
}

.table-header {
    font-size: 10.4px;
}

.text-align {
    text-align: center
}
.text-italic{
	font-style:italic;
}

.hs-details {
    font-size: 13.8px;
    font-weight: 700
}

.block_gris .text-center {
    text-align: center;
    border-right: 1px solid #d5d5d5;
    padding-bottom: 5px;
    padding-right: 3px;
    padding-left: 3px;
}

.block_gris .text-center:last-child {
    border-right: none;
}

[lang='ar'] .block_gris .text-center:last-child {
    border-right: 1px solid #d5d5d5;
    border-left: none;
}

[lang='ar'] .block_gris .text-center:first-child {
    border-right: none;
}

.style-bg {
    font-size: 10.4px;
    background-repeat: no-repeat;
    background-position: right center;
    padding-right: 18px;
}

.bg-view {
    background-image: url("../images/view.png");
    background-size: 14px;
}

.bg-edit {
    background-image: url("../images/edit.png");
    background-size: 12.5px;
}

.bg-delete {
    background-image: url("../images/delete.png");
    background-size: 11px;
}

/* .block_gris {
    background-color: #f4f4f4;
    margin-bottom: 6px;
    position: relative;
} */
.block_gris {
    background-color: #f4f4f4;
    margin-bottom: 0;
    position: relative;
    padding: 10px !important;
	border-bottom: 1px solid #dcdcdc;
}

#tab-hsdetails .top {
    margin-top: 5px;
    position: relative;
    padding-bottom: 0px;
    margin-bottom: 40px
}

#tab-hsdetails .formRowBtn {
    margin-top: 40px;
}

#tab-hsdetails .bottom {
    margin-bottom: 12.5px
}

#tab-hsdetails .hscode-table .btn-add {
    left: 78%;
    top: -50px;
    border-left: 1px solid #c5c5c5;
    padding: 10px 37px 10px 9px;
}

/**Css remarks**/
#remarks .content-newcoo {
    /* margin-top: 40px; */
    margin-bottom: 20px;
}

#remarks label {
    color: #00388b;
    font-size: 13px;
    font-weight: 700
}

#remarks .formRow {
    margin-bottom: 0px;
}

#remarks .input {
    height: 100px;
}
.file-name-input{
	width: 88% !important;
	display: inline;
}

.file-btns{
	/* width: 5% !important; */
	width: 50px !important;
	display: inline-block;
	vertical-align: middle;
	height: 36px;
	background-color: #fff;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: 60%;
	border-radius: 7px;
	
}
 .btn-pdf{	
	background-image: url('../images/pdf-ico.png');
 }.btn-pdf-gray{	
	background-image: url('../images/pdf-ico-gray.png');
 }
  .btn-print{	
	background-image: url('../images/print.png');
 }
  .btn-upload{	
	background-image: url('../images/file-search.png');
 }.btn-upload-gray{	
	background-image: url('../images/file-search-gray.png');
 }
 
#remarks #filename{
	height: 36px !important;
}

#remarks .button {
    width: 100%;
    max-width: 100%;
}

#remarks .content-newcoo .formRowBtn {
    margin: 0;
}

/*******Css page COO List*********/
.content-coolist {
    padding-bottom: 9px;
    padding-top: 74px;
}

.filter-block .link {
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    color: #515151;
    padding: 6px;
    margin-right: 3.8px;
    font-size: 10.4px;
    min-width: 43px;
    display: inline-block;
    text-align: center;
}

.filter-block .link.active {
    background-color: #8b8b8b;
    color: #fff;
    border: none;
}

.bottom-header {
    margin-top: 21.9px;
    margin-bottom: 10.4px; 
    
    position: relative;
}

.bottom-header span {
    color: #b1b1b1;
    font-size: 10.4px;
    display: block;
}

.filter-block {
    margin-right: 65.3px;
}

.bottom-header .btn-add {
     top: -16px;
    left: 78%;
    padding: 10px 29px 10px 10px;
    margin: 10px 0 10px 0; 
    
}

.border {
    /* border-right: 1px solid #c1c1c1; */
}

.pos_title {
    padding-left: 7px;
    padding-right: 5px;
}

.content-coolist .block_gris {
    padding: 15.6px
}

.statut {
    margin-bottom: 8.6px;
}

.payment {
    text-align: right;
    color: #97aa01;
    font-weight: 700;
    min-height: 30px;
}

.unpayed {
    color: #818181
}

.information {
    color: #939292;
    font-size: 12px
}

.date {
    font-size: 11px
}

.background-icon {
    background-repeat: no-repeat;
    background-size: 20px auto;
    color: #000;
    display: inline-block;
    padding-right: 25px;
    background-position: 100% top;
    padding-top: 3px;
    padding-bottom: 2px;
}

.pending-icon {
    background-image: url("../images/pending-icon.png");
}

.rejected-icon {
    background-image: url("../images/rejected-icon.png");
}

.approved-icon {
    background-image: url("../images/approved-icon.png");
}

[lang='ar'] .bottom-header .btn-add {
    right: 78%;
    padding: 10px 10px 10px 29px;
    left: auto;
}

[lang='ar'] .filter-block {
    margin-left: 65.3px;
    margin-right: 0;
}

[lang='ar'] .btn-add {
    background-position: left center;
}

[lang='ar'] .background-icon {
    padding-left: 25px;
    background-position: 0% top;
    padding-right: 0;
}

[lang='ar'] .payment {
    text-align: left
}

[lang='ar'] .border {
    /* border-left: 1px solid #c1c1c1; */
    border-right: none
}

[lang='ar'] .pos_title {
    padding-right: 7px;
    padding-left: 0px;
}

/**Payment list***/
.btn-size {
    width: 100%;
    max-width: 165px;
}

.payment-lists {
    margin-top: 21.8px;
    margin-bottom: 212px;
}

.payment-lists .statut {
    position: relative;
    margin-right: 0px;
}

.checkbox {
    position: absolute;
    left: 5px;
    top: 6px;
}


.pay-btn {
    padding-bottom: 30px
}

.checkbox input[type=checkbox]:checked + label {
    background-image: url("../images/payment-blue.png");
}


/****Css Pofile****/

.tabs-profile {
}

.tabs-profile-content {
    margin-top: 26.5px;
    padding-bottom: 34px
}

#main-profile ul {
    padding: 12px 14px 21px 14px;
    background-color: #f8f8f8;
}

#main-profile li {
    border-right: 1px solid #c2c2c2;
}

#main-profile li:last-child {
    border-right: none;
}


#main-profile li a {
    color: #c7c7c7;
    font-size: 10.4px;
    padding: 9px;
    margin-left: 4px;
    display: block;
    font-weight: 700
}

#main-profile li a.active {
    color: #464545
}

.block-info {
    margin-bottom: 16px;
}

.label-info {
    font-size: 13.4px;
    color: #464545;
    display: block;
    padding-bottom: 5px;
}

.style-info {
    font-size: 10.4px;
    font-weight: 700;
    display: block;
}

.activity {
    font-size: 10.4px
}

.margin-bottom {
    margin-bottom: 12px
}

#company-information .formRowBtn, #personal-information .formRowBtn {
    margin-top: 14px;
    margin-bottom: 0px
}

#change-password .formRowBtn {
    margin-bottom: 34px
}

#main-profile .button {
    width: 100%;
    max-width: 304px;
}
.A4-height{
	height: 29.7cm;
}



@media (max-height: 600px) {
    #content-login {
        margin-top: 50px;
        margin-bottom: 97px;
        padding-bottom: 25px;
    }

    #footer {
        height: 97px
    }

    .language {
        top: -40px;
    }

    .formRow {
        margin-bottom: 7px;
    }

    #content-login .button {
        height: 40px;
    }

    .password {
        margin-top: 10px;
    }

    .create-account {
        margin-top: 20px;
    }

    #content-login .formRowBtn {
        margin-top: 15px;
    }


    .separator {
        background-position: right 20px;
    }

}


@media (max-width: 480px) {
	

	
	
	
	/* html {
	  background:  url(../images/rakchamber_b_light.png)  no-repeat center center fixed #92B5D8; 
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;

} */

    .filter-block .link {
        margin-right: 3px;
        font-size: 10px;
        min-width: 40px;
    }
    
    
    
    /******/
    .language {
	    position: absolute;
	    height: 24px;
	    width: auto;
	    left: 3px;
	    right: auto;
	    top: 50%;
	    margin-top: -12px;
	    padding: 3px;
	}
	
	[lang='ar'] .language {
	    right: 3px; 
	    left: auto;
	    
	}
	
	.icon-language {
	    height: 24px;
	    width: 24px;
	    background-size: 100% auto;
	    background-repeat: no-repeat;
	    display: inline-block;
	}

	.right-icon {
	    right: 10px;
	    padding: 3px;
	}
	
	.exit-icon, .back-icon {

        height: 16px;
	    width: 16px;
	    background-size: 100% auto;
	    margin-top: -8px;
	    top: 50%;
	}

	.menu-icon {
		height: 16px;
	    width: 16px;
	    background-size: 100% auto;
	    margin-top: -8px;
	    top: 50%;
   
	}

	[lang='en'] .menu-icon {
	    right: 33px;
	    left: auto;
	}
	 
	[lang='ar'] .right-icon {
	    left: 10px;
	    right: auto;
	}

	[lang='ar'] .menu-icon {
	    left: 36px;
	    right: auto;
	}
    
    #header h1{
        font-size: 11px;
        line-height: 84.02px;

	}
	
	#bg-profile span {
    color: #b2c900;
    font-size: 16px;
    padding-top: 3%;
    font-weight: 400;
    padding-bottom: 2%;
    display: block;
}

#bg-profile h2 {
    color: #464545;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    display: block;
}
.icon-dashboard {
    display: block;
    background-size: 78px auto;
    background-repeat: no-repeat;
    padding: 115px 0 10px;
    text-align: center;
    color: #202020;
    background-position: center 26px;
    margin: 0 15px;
	}
    
    
}

@media (max-width: 320px) {
	
    
}

#resultLoading img {
    width: 38px !important;
    height: auto !important;
}

.keyboard-open #footer {
    display: none;
}

.transparent-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    background-color: transparent;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
}

/*** ERROR **/

.error, [ng-message] {
    font-size: 12px;
    color: #F00;
    padding: 2px;
    position: relative;
}

/*** Coo list : cert number fix width ***/
.cert-number h2 {
    width: 185px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 40px;
}
.cert-number .date {
    margin: 0 40px;
}

/*** Multi Select ***/
button.dropdown-toggle {
    width: 100%;
    background-color: #FFF;
    border: 1px solid #CCC;
    border-radius: 2px;
    height: 35px;
    text-align: left;
    color: #8a8a8a;
    box-sizing: border-box;
    padding: 0px 20px 0px 20px;
}

button.dropdown-toggle.ng-binding.btn.btn-default {
    background-image: url("../images/select.png");
    background-repeat: no-repeat;
    background-size: 13px;
    background-position: 98% center;
}
.multiselect-parent li {
    padding: 0px 0px;
    border: 0px !important;
    box-sizing: border-box;
    line-height: 20px;
}

.multiselect-parent li a {
    color: #000 !important;
    font-size: 14px !important;
    border-bottom: 1px solid #CCC;
    width: 100%;
    display: block;
    margin: 0px !important;
    padding: 8px 20px !important;
}

.dropdown-menu {
    padding: 0px !important;
}

/**** LOADER ***/

.showbox {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5%;
}

.loader {
    position: relative;
    margin: 0px auto;
    width: 100px;
}
.loader:before {
    content: '';
    display: block;
    padding-top: 100%;
}

.circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@-webkit-keyframes rotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@-webkit-keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124px;
    }
}
@keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124px;
    }
}
@-webkit-keyframes color {
    100%, 0% {
        stroke: #00388b;
    }
    40% {
        stroke: #97aa01;
    }
    66% {
        stroke: #00388b;
    }
    80%, 90% {
        stroke: #97aa01;
    }
}
@keyframes color {
    100%, 0% {
        stroke: #00388b;
    }
    40% {
        stroke: #97aa01;
    }
    66% {
        stroke: #00388b;
    }
    80%, 90% {
        stroke: #97aa01;
    }
}

/**** /LOADER ***/


/* # Panel Menu */
.transition {
    transition: all 0.3s linear;
}
.no-transition .transition {
    transition: none !important;
}



/***********************/

.overlay {
    visibility: hidden;
    position: fixed; top: 0px;bottom: 0;left: 0;
    background-color: rgba(0, 0, 0, 0.56);
    z-index: 9999;
    transition: all 0.0s linear;
    width: 90%;
    margin: 0px auto;
}

.showMenu .overlay {visibility: visible; right: 0;}


#menuleft {
    position: fixed;
    top: 84.02px; 
    bottom:0;
    right: -80%;/*-82%*/
    z-index: 10000;
    width: 80%;/*82%*/
    background-color: #FFF;
    display: block;
    overflow-y: auto;
    min-width: 235px;
}

.showMenu #menuleft {
    right: 5%;
    box-shadow: 14px -8px 20px -13px #000;
    z-index: 99999999;
    background: rgba(255,255,255,0.8);
}
[lang='ar'] #menuleft{
    left: -80% !important;
    right: auto;
}

[lang='ar'] .showMenu #menuleft {
    left : 5% !important;
    right: auto;
}









*:not(input,textarea,select) {
    -webkit-touch-callout: none;
    -webkit-user-select: none; /* Disable selection/Copy of UIWebView */
}
* {outline:0 !important;}
.selectedA{
    background-image: url("../images/select.png");
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: 2px center;
    text-decoration: underline;
}
.separator-bug {
    float: left;
    height: 33px;
    width: 1px;
    background-color: #CCC;
}
[lang='ar'] .separator-bug {
    float: right;
}
[lang='ar'] .account {
    background-image: url("../images/account-ar.png");
    background-position: left center;
    padding: 0px 0px 0px 5px;
}

[lang='ar'] button.dropdown-toggle.ng-binding.btn.btn-default {
    text-align: right;
    background-position: 2% center;
}
input:disabled{
    opacity : 1 !important;
}
#receitPopup {
    display : none;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    width: 100%;
    height: 100%;
    z-index: 9999999;
}

.popupBody {
    margin: auto;
    width: 90%;
    top: 15%;
    display: block;
    position: relative;
    height: auto;
    background: #FFF;
    box-sizing: border-box;
    padding: 20px;
    font-size: 13px;
    padding-bottom: 5px;
}

.popupBody img {
    width: 65px;
    display: block;
    float: left;
}
.receipt-title {
    float: left;
    line-height: 70px;
    padding-left: 20px;
    font-size: 20px;
    text-transform: capitalize;
}
.popup-info {
    padding: 5px 0px;
}

.popup-info > div {
    width: 49%;
    display: inline-block;
}
.popupBody .clearfix {
    margin-bottom: 10px;
}
.center-btn{
    margin : 10px auto;
    display : block;
}
.fixed-payment-footer {
    position: fixed;
    bottom: 0;
    width: 90%;
    background-color: #FFF;
}
#WLdialogBody a {
    color: #0C3B86;
    z-index: 99999999999999999999;
    display: block;
}

.form-control {
    padding: 10px 20px;
    border: 1px solid #CCC;
}

.stampCount, .copyCount {
    width: 35px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    margin: 0px 8px;
    height: 25px;
}
.no-overflow{
	overflow : hidden;
}

.web #main-newcoo li a{
	font-size: 14px;
}
.web label{
	font-size : 16px;
}
.web .input, .web .select{
	font-size : 15.5px;
}
[lang = "ar"] #details .autocomplete li{
    text-align : right !important;
}
[lang="ar"] .receipt-title{
    padding : 0px;
    float : right;
}



/******************** Memebrship Inquiry*******************/
.shape{	
	border-style: solid; border-width: 0 70px 40px 0; float:right; height: 0px; width: 0px;
	-ms-transform:rotate(360deg); /* IE 9 */
	-o-transform: rotate(360deg);  /* Opera 10.5 */
	-webkit-transform:rotate(360deg); /* Safari and Chrome */
	transform:rotate(360deg);
	
	/* border-width: 40px 70px;
    float: left;
    transform: rotate(0deg); */
}
.status,.evaluation{
	background:rgba(255,255,255,0.8); border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden; height:40vh;
	width: 85%;margin: 0px auto;
}
#evaluation-box{
	
}
#evaluation-box h3{
	font-size: 16px;
    font-weight: 700;
    background: #2163a2;
    color: #fff;
    padding: 14px 20px;
}
.evaluation{
	width: 60%;
	height: auto !important;
}
.evaluation .faces{
	    padding: 20px 10px 40px;
}
.status-radius{
	border-radius:7px;
}
.status-border{
	border-radius:7px;
   border: 15px solid #2163a2;
}
.active_status {	border-color: #83AA40; }
.active_status .shape{
	border-color: transparent #83AA40 transparent transparent;
	border-color: rgba(255,255,255,0) #83AA40 rgba(255,255,255,0) rgba(255,255,255,0);
	
	    /* border-color: #83aa40 rgba(255,255,255,0) rgba(255,255,255,0) #83aa40; */
}
.active_status p{
	color:#83AA40 ; font-weight: bold;
}


.reserved_status {	border-color: #F6921E; }
.reserved_status .shape{
	border-color: transparent #F6921E transparent transparent;
	border-color: rgba(255,255,255,0) #F6921E rgba(255,255,255,0) rgba(255,255,255,0);
}
.reserved_status p{
	color:#F6921E ; font-weight: bold;
}


.canceled_status {	border-color: #C35831; }
.canceled_status .shape{
	border-color: transparent #C35831 transparent transparent;
	border-color: rgba(255,255,255,0) #C35831 rgba(255,255,255,0) rgba(255,255,255,0);
}
.canceled_status p{
	color:#C35831 ; font-weight: bold;
}

.shape-text{
	color:#fff; font-size:12px; font-weight:bold; position:relative; right:-40px; top:2px; white-space: nowrap;
	-ms-transform:rotate(30deg); /* IE 9 */
	-o-transform: rotate(360deg);  /* Opera 10.5 */
	-webkit-transform:rotate(30deg); /* Safari and Chrome */
	transform:rotate(30deg);
}	
.status-content{
	padding:20px 20px 10px;
}
.evaluation .status-content {
    padding: 0px 0px 10px;
}
.status img{
	    width: 20vw; height: auto; display: inline-block; vertical-align: middle; float: right; max-width:200px;
}
.evaluation img{
	    width: 15vw; height: auto; display: inline-block; vertical-align: middle;  max-width:137px; margin: 10px auto; cursor: pointer; 
}

[lang='ar'] .status img{
	width: 20vw; height: auto; display: inline-block; vertical-align: middle; float: left; max-width:200px;
}

.evaluation .cell4 {
		    background: transparent;
	    transition: background 0.5s linear 0s;
	}
.evaluation .cell4:hover, .evaluation .cell4:active{
	background: rgba(0, 0, 0, 0.06);
}



.h-full{
	height: 100%;
}
.inline-flex{
	display: inline-flex!important;
}

/******************************/
.row-col {display: table;table-layout: fixed;border-spacing: 0;width: 100%; }
.row-col > [class*="cell"]{vertical-align: top;float: none;padding: 0;position: static; min-height:20px;display: table-cell;}
.row-col.row-col-head {min-height:40px;}
.row-col.row-col-head> [class*="cell"] {background-color: #b2c900;border: 0.5px solid #ccc;color: #000; cursor: pointer;}
.row-col.row-col-head .row-col-head> .lt-grey{background-color: #ebebeb !important; font-size: 11.5px;}

.lt-grey{background-color: #ebebeb !important; font-size: 11.5px;vertical-align: top;min-height:20px;}

.bold-txt{font-weight: bold;}
.underline-txt{font-weight: bold; text-decoration:underline;}
.dir-rtl{direction:rtl !important;text-align: start;} 
.dir-ltr{direction:ltr !important;}
.alignCenter {text-align: center !important;}
.alignJustify {text-align: justify !important;} 
.alignRight { text-align: right !important;}
.alignLeft { text-align: left !important;}

.blue-txt{color: #00388b !important;}
.odd{background: rgba(0, 0, 0, 0.1) !important; font-size: 11.5px;vertical-align: top;min-height:20px;
}.even{background-color: #ebebeb !important; font-size: 11.5px;vertical-align: top;min-height:20px;} 

/***2018*/
.fees-icon {
    background-image: url("../images/fees_inquery.png");
}
/***2018*/
.fees-menu {
    background-image: url("../images/fees_inquery_menu.png");
    background-size: 30px;
}
/**new **/
.membership-enquiry-icon {
    background-image: url("../images/membership_inquery.png");
}
.membership-enquiry-menu {
    background-image: url("../images/membership_inquery_menu.png");
    background-size: 30px;
}



/*****************************
for membership verification:
*****************************/
.margin-bottomDown {margin-bottom: 100cm}

.paper .clear{clear:both;content: "";display: block;padding: 10px;}

.paper.membership-profile {
	  background-image: url(../images/RAK_chamber_larg-o.png);
	  	-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;
	    background-position: center;
	    background-repeat: no-repeat;
  }
  
  
 .A4-height{height: 29.7cm;} 
.paper .margin-bottom {margin-bottom: 12px}
/*.paper * {direction: ltr!important;}*/
.paper .footer-content *{direction: rtl!important;}
 .paper  {
 font-size: 14px; 
	border:1px solid #ccc;
  display:block;
  margin: 10px auto;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:black;
  background-color: #ffffff;
  /*width:80%;*/
  max-width: 21cm;
  padding:7px;
  

  }.paper .hdr-img{
  	display: block;
    width: 31%;
    height: auto;
    text-align: right;
    margin: auto;
  }.paper header{
    width: 97%;
        height: 10%;
        margin-bottom: 1%;
            margin-left: auto;
            margin-right: auto;
  }.paper header .cell6{
        height: 97%;
  }.paper header .cell6.title{
       /*  padding: 2%; */
        background: #2f5591;
  }
  .paper header .cell6 .header-text{padding-top:4%}
  .paper header .cell6.title h3{
  		color: #fff;
  		/* font-size:20px; */ 
  		vertical-align:middle; line-height:1;
  		margin: 2% auto;
        font-weight: bolder;
        font-size: 1vw;
        /* margin-top: 2%; */
  }.paper .line{
  	width: 100%;
      height: 5%;
      background-image:linear-gradient(to right,  #2f5591 75%, #719acc 75% 78% ,#2f5591 78% 84%, #719acc 84% );
      margin-left: auto;
      margin-right: auto;
  }.paper .paper-content{
  		width: 97%;height: auto;margin-top: 6%;margin-left: auto;margin-right: auto;margin-top: 6%;
        /* width: 97%;
        height: 88%; 
        margin-left: auto;
    margin-right: auto;*/
    flex: 1 1 auto;
  }.paper-content-inner{height:100%;}
  
  .paper.membership-profile  .paper-content .cell12ar{
    flex-direction: row-reverse;
}
.paper.membership-profile  .paper-content .cell12ar .left{
    direction: ltr!important;
    flex-direction: row!important;
}
.paper.membership-profile  .paper-content .cell12ar > div >div{
    flex-direction: ${isRTL ? "row" : "row-reverse"};
}
  .paper.membership-profile  .paper-content .cell12{
        height: auto;
        display:flex;
  }.paper.membership-profile  .paper-content .cell12> .cell6{
        height: auto;
  }.paper.membership-profile  .paper-content .cell12> .left > div >span{
    direction:ltr;
}
  .paper.membership-profile  .paper-content .cell12> .right{
direction:ltr;
}
.paper.membership-profile  .paper-content .cell12> .right .column{
    margin-right: 10px;
    }
  .paper.membership-profile  .paper-content .cell12.member_activity{
        height: auto;
        display: flex;
  }.paper.membership-profile  .paper-content .cell12> .cell6> div{
        width: 98%;
        height:  100%;
        background: #d9edf6ad;
        padding: 10px 10px 2px 10px ;
        border-radius: 7px;
        display: flex;
  }
  @media (max-width: 600px) {
    .paper.membership-profile  .paper-content .cell12> .cell6> .rightBoxes{
        text-align: right;
        flex-direction: column-reverse;
    }.paper.membership-profile  .paper-content .cell12> .cell6> .rightBoxes> .cell4 ,.paper.membership-profile  .paper-content .cell12> .cell6> .rightBoxes> .cell8{
        width: 100%;
        text-align: end!important;
    }.paper.membership-profile  .paper-content .cell12> .cell6> .leftBoxes{
        text-align: right;
        flex-direction: column;
    }.paper.membership-profile  .paper-content .cell12> .cell6> .leftBoxes> .cell4,.paper.membership-profile  .paper-content .cell12> .cell6> .leftBoxes> .cell8{
        width: 100%;
        text-align: start!important;
    }
  }
  .paper.membership-profile .paper-content .cell12> .cell6 > .column{
    flex-direction: column;
    align-items: flex-end;
} .paper.membership-profile .paper-content .cell12> .cell6 > .startColumn{
    flex-direction: column;
    align-items: flex-start;
    direction: ltr;
}
  
 .paper p {margin:0px;} 
 .paper .paper-content .cell12{}

.cell_gris {background-color: transparent;margin-bottom: 0;position: relative;border-top: 1px solid #ccc;border-right: 1px solid #ccc;border-left: 1px solid #ccc;padding: 5px !important;}
.paper .footer-content{text-align:center; width:98%; line-height:2; font-weight: bold; color:#2f5591;border-top: 1px solid #ccc; height:6%;}
.paper .footer-content .footer-text p{float : right;width: 100%;line-height: 1.5;}
.paper .footer-content .footer-text p.footer-p2{line-height: 1;}
.table-data .grid:after{content:"" !important;} 
.table-data .cell12.row-col-head [class*='cell']{line-height:2; padding:5px;} 
.table-data .cell12 [class*='cell']{line-height:1; padding:5px;}
.cell6.grid .row-col{min-height:30px;}


  
.failure_msg{
    margin: 2% auto; 
    background: #ffe0e0;
    width: 80%;
    border-radius: 7px;
    padding: 10px;
}
@media (max-width: 899px) {
    .A4-height {
    	height: 1700px;
    }.A4-height.fees {
    	height: 1200px;
    }
    .evaluation{
	width: 85%;
	}
	.evaluation .cell4 {
		width: 97% !important;
    margin-bottom: 10px;
    border: 1px solid #b1a8a833;
	}

}@media (max-width: 480px) {
    .paper header .cell6.title h3, 
    .paper .paper-content{
        font-size: 3vw;
    }
    .evaluation{
	width: 85%;
	}
}

  
/*   [lang='ar'] .paper * {
    direction: ltr;
} */

[lang='ar'].paper *, .table-data *{
	direction: ltr !important;
}
[lang='ar'].paper .footer-content *{direction: rtl!important;}

.file-btns{
	/* width: 5% !important; */
	width: 50px !important;
	display: inline-block;
	vertical-align: middle;
	height: 36px;
	background-color: #fff;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: 60%;
	border-radius: 7px;
	
}
 .btn-print{	
	background-image: url('../images/print.png');
 }
 .padding-7{
 	padding: 7px;
 }


.fixed-height-container
{
  /*float:right;
  height: 250px;
   width:250px;  */
  padding:3px; 
    background:#d9d9d9;
}
.scroll-table
{
      height: 98%;
   /* overflow:auto; */
    background:#fff;
}

.visible-print  { display: none !important; }
  .hidden-print   { display: inherit !important; }
/*****************************
for Printing
******************************/
@media print {
    #membr_printSection_aura{overflow: hidden;}
    .A4-height{height:36.5cm}
     .paper *{font-size: 13px!important;}
    .paper {margin:10px; width:100%;max-width: 25.7cm;background-size: 80%;background-size: 90%!important;}
    .paper .margin-bottom {margin-bottom: 6px;}
  .visible-print  { display: inherit !important; }.hidden-print   { display: none !important; }
  .left {
    float: left !important;
     }

     .right {
    float: right !important;
      }
      .grid > [class^=cell] {
    float: left;
      }
      .paper.membership-profile .paper-content .cell12ar {
        flex-direction: row;
    }
}

.txt-black{
    color: #000;
}
.txt-grey{
    color :#4c4c4c;
}
.txt-red{
	color: #c53e27;
}
.txt-green{
	color:#85aa41;
}
.txt-orang{
	color:#f5952c;
}
.membershipStatus-home img{
	width:24px;
	height: auto;
	vertical-align: middle;
}
/********************************/

.payment_button{
	position:absolute; left: 78%; 
}
.emp-notes{
	font-size: 11pt;
    color: #4c4c4c;
    padding: 10px 5px 5px;
}
.emp-notes a{
	font-size: inherit;
    color: inherit;
    text-decoration: underline;
}
.show-note{
	display: block !important;
}
button:disabled {
    background-color: #ccc;
}
#pp-payment{
	 position: absolute;
    left: 36%;
    top: 56px;
    text-align: right;
    width: 40%;
}

</style>
</head>
<body>
<div ng-hide="error_" class="">
  <!-- <button ng-disabled="error_" type="button" class="file-btns btn-print" ng-click="printDiv()"></button> -->
</div> 


<div  id="membr_printSection_aura"> 
 <div id="membr_printSection" class="paper  membership-profile A4-height" style="direction: ltr !important;">
  <header>
    <div class="grid row-col h-full">
      <div class="cell6 right"><img class="hdr-img" src=${
        previewCooModelAr.img
      }></div>
      <div class="cell6 left title"><div class="header-text"><h3 class="alignCenter">شهادة تسجيل العضوية</h3><h3 class="alignCenter">MemberShip Certificate</h3></div></div>
    </div>
    <div class="line"></div>
  </header>
  
  ${
    company_MemberShipProfile?.length != 0 || activities?.length != 0
      ? ` <div ng-hide="error_" class="grid margin-bottom paper-content" >
    <div class="alignCenter" style="padding:7px; font-weight: bold;" >Copy For Preview & Verify Only  &nbsp; &nbsp; &nbsp;   نسخة للعرض والتحقق فقط</div>

    <div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
      <div class="cell6 left">
        <div class="leftBoxes"><span class="cell4 bold-txt left"> Membership No.</span><span class="cell8 left alignRight">${
          company_MemberShipProfile?.company_code
            ? company_MemberShipProfile.company_code
            : ""
        }</span> </div>
      </div>
      <div class="cell6 left">
        <div  class="rightBoxes"><span class="cell4 left ">${
          company_MemberShipProfile?.company_code
            ? company_MemberShipProfile.company_code
            : ""
        }</span><span class="cell8 bold-txt left alignRight">رقم العضوية </span></div>
      </div>
    </div>

    <div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
      <div class="cell6 left">
        <div class="leftBoxes"><span class="cell4 bold-txt left">Registration No.</span><span class="cell8 left alignRight">${
          company_MemberShipProfile?.trade_registration_no
            ? company_MemberShipProfile.trade_registration_no
            : ""
        }</span></div>
      </div>
      <div class="cell6 left">
       <div class="rightBoxes"> <span class="cell4 left ">${
         company_MemberShipProfile?.trade_registration_no
           ? company_MemberShipProfile.trade_registration_no
           : ""
       }</span><span class="cell8 bold-txt left alignRight">رقم السجل التجاري </span></div>
     </div>
   </div>


   <div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
    <div class="cell6 left">
      <div class="leftBoxes"><span class="cell4 bold-txt left">License Type</span><span class="cell8 left alignRight">${
        company_MemberShipProfile?.company_category_e
          ? company_MemberShipProfile.company_category_e
          : ""
      }</span></div>
    </div>
    <div class="cell6 left">
      <div class="rightBoxes"><span class="cell4 left ">${
        company_MemberShipProfile?.company_category
          ? company_MemberShipProfile.company_category
          : ""
      }</span><span class="cell8 bold-txt left alignRight">نوع الرخصة </span></div>
    </div>
  </div>


  <div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
    <div class="cell6 left">
     <div class="leftBoxes"><span class="cell4 bold-txt left">Trade Name</span><span class="cell8 left alignRight">${
       company_MemberShipProfile?.company_name_e
         ? company_MemberShipProfile.company_name_e
         : ""
     }</span></div>
   </div>
   <div class="cell6 left">
    <div class="rightBoxes"><span class="cell4 left ">${
      company_MemberShipProfile?.company_name
        ? company_MemberShipProfile.company_name
        : ""
    }</span><span class="cell8 bold-txt left alignRight">الاسم التجاري </span></div>
  </div>
</div>


<div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
  <div class="cell6 left">
   <div class="leftBoxes"><span class="cell4 bold-txt left">Legal Status</span><span class="cell8 left alignRight">${
     company_MemberShipProfile?.company_legal_status_e
       ? company_MemberShipProfile.company_legal_status_e
       : ""
   }</span></div>
 </div>
 <div class="cell6 left">
  <div class="rightBoxes"><span class="cell4 left ">${
    company_MemberShipProfile?.company_legal_status
      ? company_MemberShipProfile.company_legal_status
      : ""
  }</span><span class="cell8 bold-txt left alignRight">الشكل القانوني </span></div>
</div>
</div>

 <div class="${isRTL && "cell12ar"} cell12  margin-bottom member_activity">

<div class="cell6 left">
<div class="startColumn">
   <span class="${isRTL && "cell12ar"} cell12 bold-txt left ${
          isRTL && "align"
        } ">Activity</span> 
    <lable class="row left" style="max-width:99%">
      <ul style="padding-inline-start: 40px;" class="${isRTL && "align"}">
  ${activities
    .map(
      (item) =>
        `<li
      ng-repeat="item in MemberShipProfileactivities"
      style=" font-family:verdana; "
    >
    <span>${item.name_e}</span>
    </li>`
    )
    .join("")}
      </ul>
    </lable>

</div>
</div>

<div class="cell6 right">
<div class="column">
<span class="cell12 bold-txt right alignRight" style="vertical-align: top;
display: table-cell;float: none;">نوع النشاط</span>

<lable class="row right ${isRTL && "pr"}" style="max-width:99%">
<ul style="padding-inline-end: 40px;">
${activities
  .map(
    (item) =>
      `<li
        ng-repeat="item in MemberShipProfileactivities"
        class="dir-rtl"
        >   
          <span style="font-family:verdana;">${item.name}</span>
    </li>`
  )
  .join("")}
</ul>
</lable>
</div>
</div>

</div>


<div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
  <div class="cell6 left">
   <div class="leftBoxes"><span class="cell4 bold-txt left">Member Since</span><span class="cell8 left alignRight">${
     company_MemberShipProfile?.membership_date
       ? company_MemberShipProfile.membership_date
       : ""
   }</span></div>
 </div>
 <div class="cell6 left">
  <div class="rightBoxes"><span class="cell4 left ">${
    company_MemberShipProfile?.membership_date
      ? company_MemberShipProfile.membership_date
      : ""
  }</span><span class="cell8 bold-txt left alignRight">تاريخ الانتساب </span></div>
</div>
</div>


<div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
  <div class="cell6 left">
   <div class="leftBoxes"><span class="cell4 bold-txt left">Issue Date</span><span class="cell8 left alignRight">${
     company_MemberShipProfile?.membership_issue_date
       ? company_MemberShipProfile.membership_issue_date
       : ""
   }</span></div>
 </div>
 <div class="cell6 left">
   <div class="rightBoxes"> <span class="cell4 left ">${
     company_MemberShipProfile?.membership_issue_date
       ? company_MemberShipProfile.membership_issue_date
       : ""
   }</span><span class="cell8 bold-txt left alignRight">تاريخ الإصدار</span></div>
 </div>
</div>

<div class="${isRTL && "cell12ar"} cell12 grid margin-bottom">
  <div class="cell6 left">
   <div class="leftBoxes"><span class="cell4 bold-txt left">Expiry Date</span><span class="cell8 left alignRight">${
     company_MemberShipProfile?.membership_expiry_date
       ? company_MemberShipProfile.membership_expiry_date
       : ""
   }</span></div>
 </div>
 <div class="cell6 left">
  <div class="rightBoxes"><span class="cell4 left ">${
    company_MemberShipProfile?.membership_expiry_date
      ? company_MemberShipProfile.membership_expiry_date
      : ""
  }</span><span class="cell8 bold-txt left alignRight">تاريخ الانتهاء</span></div>
</div>
</div>

</div>`
      : ""
  }



${
  company_MemberShipProfile.length == 0 && activities.length == 0
    ? `<div ng-show="error_" class="hidden-print">
	<div class="grid failure_msg ">
   <div class="${
     isRTL && "cell12ar"
   } cell12 margin-bottom alignRight"> عفواً! لا توجد شهادة عضوية صادرة من غرفة رأس الخيمة بهذه البيانات <br>
       <span  style="font-weight: bold" >يرجى التأكد من رقم العضوية وتاريخ الانتساب</span>

   </div>
   <div class="${
     isRTL && "cell12ar"
   } cell12 margin-bottom">Sorry! There is not Membership Certificate issued from Rak Chamber with this detail <br>
       <span  style="font-weight: bold "  >Please check Membership No. and Membership Since</span>

   </div>
 </div>
</div>`
    : ""
}
</div>

</div>

</body>
</html>

 
`;
