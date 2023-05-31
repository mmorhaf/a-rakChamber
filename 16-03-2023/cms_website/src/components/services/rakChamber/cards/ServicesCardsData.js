import { BsBuilding } from "react-icons/bs";
import { BiCertification } from "react-icons/bi";
import { BiBookBookmark } from "react-icons/bi";
import { BiCalendarStar } from "react-icons/bi";
import { BiCalendarCheck } from "react-icons/bi";

import { CgFileDocument } from "react-icons/cg";
import { TiLeaf } from "react-icons/ti";

import { FiCopy } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import {
  IoShieldCheckmarkOutline,
  IoChatbubbleEllipsesOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { BsFileCheck } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";

import { FaUserShield } from "react-icons/fa";
import { FaGifts } from "react-icons/fa";

import { GiSwapBag } from "react-icons/gi";
import { GiThorHammer } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
import { GiCommercialAirplane } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { GiTempleDoor } from "react-icons/gi";
import { GiKeyCard } from "react-icons/gi";

import { RiUserAddLine } from "react-icons/ri";
import { RiScalesLine } from "react-icons/ri";
import { RiFilePaper2Line } from "react-icons/ri";
import { RiFileForbidLine } from "react-icons/ri";
import { RiFileDamageLine } from "react-icons/ri";
import { RiChatPollLine } from "react-icons/ri";
import { RiBankLine } from "react-icons/ri";
import { RiWheelchairLine } from "react-icons/ri";
import { RiCalendarEventLine } from "react-icons/ri";

import { BsBarChart } from "react-icons/bs";

import { BsArchive } from "react-icons/bs";
import { MdCardMembership } from "react-icons/md";
import { MdAutorenew } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoCalendarOutline } from "react-icons/io5";

export const ServicesCardsData = [
  // {
  // id: 1,
  // heading_en: `Certificates of origin and ratifications`,
  // heading_ar: `شهادات المنشأ والتصديقات`,
  // services: [
  {
    // id: 0,
    serviceId: 54,
    heading_en: `Issuing certificate of origin`,
    // heading_ar: `إصدار شهادة منشأ للشركات`,
    service_form: true,
    icon: <BiCertification />,
    link: "/business-services/new-coo/companies",
    public: false,
    roles: [1],
  },
  {
    // id: 1,
    serviceId: 55,
    heading_en: `Issuance of Certificate of Origin (Form A)`,
    // heading_ar: `اصدار شهادة منشأ FORM A`,
    service_form: true,
    icon: <BiCertification />,
    link: "/business-services/new-coo/form-A",
    public: false,
    roles: [1],
  },
  {
    // id: 2,
    heading_en: `Issuance of Individual Certificate of Origin`,
    // heading_ar: `اصدار شهادة منشأ شخصية`,
    service_form: true,
    icon: <BiCertification />,
    roles: [2],
    serviceId: 56,
    link: "/business-services/new-coo/personal",
    public: false,
  },
  {
    // id: 3,
    heading_en: `Validate the issuance of the certificate of origin`,
    // heading_ar: `التحقق من صحة إصدار شهادة منشأ`,
    service_form: true,
    icon: <IoShieldCheckmarkOutline />,
    link: "/business-services/coo-verify",
    serviceId: 57,
    public: true,
  },
  {
    // id: 4,
    heading_en: `Request for amending the certificate of origin`,
    // heading_ar: `طلب تعديل شهادة المنشأ`,
    service_form: true,
    icon: <FiEdit />,
    link: "/business-services/amendment-coo-request",
    public: false,

    roles: [1],
    serviceId: 58,
  },
  {
    // id: 5,
    heading_en: `Request of cancellation of the certificate of origin`,
    // heading_ar: `طلب إلغاء شهادة المنشأ`,
    icon: <RiFileForbidLine />,
    service_form: false,
    serviceId: 59,
  },
  {
    // id: 6,
    heading_en: `Request for additional copies of the certificate of origin`,
    // heading_ar: `اصدار نسخ اضافية من شهادات المنشأ`,
    service_form: true,
    icon: <FiCopy />,
    link: "/business-services/additional-request",
    public: false,

    roles: [1],
    serviceId: 60,
  },
  {
    // id: 7,
    heading_en: `Request for additional seals on the certificate of origin`,
    // heading_ar: `طلب أختام إضافية على شهادة المنشأ`,
    service_form: true,
    icon: <FiCopy />,
    link: "/business-services/additional-request",
    public: false,

    roles: [1],
    serviceId: 61,
  },
  {
    // id: 8,
    heading_en: `Request for an archived report / document`,
    // heading_ar: `طلب مستند من الأرشيف`,
    icon: <BsArchive />,
    service_form: false,
    serviceId: 62,
  },
  {
    // id: 9,
    heading_en: `Request for ratification of membership and the authenticity of signature`,
    // heading_ar: `طلب التصديق على العضوية وصحة التوقيع`,
    service_form: true,
    icon: <HiOutlineBadgeCheck />,
    serviceId: 63,
    link: "/business-services/ratification-request",
    public: false,

    roles: [1, 2],
  },
  {
    // id: 10,
    heading_en: `Validation of Electronic attestation`,
    // heading_ar: `التحقق من صحة التصديق الالكتروني`,
    service_form: true,
    icon: <BsFileCheck />,
    serviceId: 947,
    public: true,
    link: "/business-services/ratification-verify",
  },
  // ],
  // },
  // {
  //   id: 2,
  //   heading_ar: `خدمات الأعضاء`,
  //   heading_en: `Member Services`,
  //   services: [
  {
    // id: 0,
    heading_en: `Issuing a new membership`,
    // heading_ar: `إصدار عضوية جديدة`,
    icon: <MdCardMembership />,
    service_form: false,
    serviceId: 64,
  },
  {
    // id: 1,
    heading_en: `Request renewal of membership`,
    // heading_ar: `طلب تجديد العضوية`,
    icon: <MdAutorenew />,
    service_form: false,
    serviceId: 65,
  },
  {
    // id: 2,
    heading_en: `Request for cancellation of the membership`,
    // heading_ar: `طلب إلغاء العضوية`,
    icon: <RiFileForbidLine />,
    service_form: false,
    serviceId: 67,
  },
  {
    // id: 3,
    heading_en: `Verification of the membership certificate`,
    // heading_ar: `التحقق من صحة شهادة العضوية`,
    service_form: true,
    serviceId: 68,
    link: "/business-services/membership-verify",
    public: true,
    icon: <FaUserShield />,
  },
  {
    // id: 4,
    heading_en: `Issuing a Certificate To Whom It May Concern`,
    // heading_ar: `إصدار شهادة لمن يهمه الأمر`,
    icon: <RiFilePaper2Line />,
    service_form: false,
    serviceId: 69,
  },
  {
    // id: 5,
    heading_en: `Request a copy of the membership certificate`,
    // heading_ar: `طلب إصدار صورة طبق الأصل`,
    icon: <HiOutlineDuplicate />,
    service_form: false,
    serviceId: 70,
  },
  {
    // id: 6,
    heading_en: `Request for a replacement for a certificate of membership`,
    // heading_ar: `طلب بدل فاقد لشهادة العضوية`,
    icon: <RiFileDamageLine />,
    service_form: false,
    serviceId: 71,
  },
  {
    // id: 7,
    heading_en: `Inquiring about new membership fees`,
    // heading_ar: `الاستعلام عن رسوم العضوية الجديدة`,
    service_form: true,
    serviceId: 72,
    link: "/business-services/membership-fees",
    public: true,
    icon: <GiSwapBag />,
  },
  {
    // id: 8,
    heading_en: `Request for amendment of membership`,
    // heading_ar: `طلب تعديل العضوية`,
    icon: <FiEdit />,
    service_form: false,
    serviceId: 66,
  },
  {
    // id: 9,
    heading_en: `Issuing new Membership for Free Zones and Non-free zones`,
    // heading_ar: `إصدار عضوية تجديد/ المناطق الحرة`,
    service_form: false,
    serviceId: 62,
  },
  {
    // id: 10,
    heading_en: `Membership Renewal/ Free Zones and Non-Free Zone`,
    // heading_ar: `إصدار عضوية جديدة/ المناطق الحرة`,
    service_form: false,
    serviceId: 62,
  },
  {
    // id: 11,
    heading_en: `Request to Cancel Free Zone and Non-free zone Membership`,
    // heading_ar: `طلب الغاء عضوية/ المناطق الحرة`,
    service_form: false,
    serviceId: 62,
  },
  {
    // id: 12,
    heading_en: `Membership Amendment Request / Free Zone and Non-free zone`,
    // heading_ar: `طلب تعديل عضوية/ المناطق الحرة`,
    service_form: false,
    serviceId: 62,
  },
  // ],
  // },
  // {
  //   id: 3,
  //   heading_ar: `التقارير والدراسات الاقتصادية`,
  //   heading_en: `Economic Reports and Studies`,
  //   services: [
  {
    // id: 0,
    heading_en: `Economic & Statistics reports and issues request`,
    // heading_ar: `طلب التقارير الاقتصادية والإحصائية والإصدارات`,
    icon: <BsBarChart />,
    service_form: false,
    serviceId: 214,
  },
  {
    // id: 1,
    heading_en: `Inquiry about enterprises and companies`,
    // heading_ar: `الاستعلام عن المنشآت و الشركات`,
    service_form: true,
    link: "/business-services/Business Directory",
    serviceId: 215,
    public: true,
    icon: <BsBuilding />,
  },
  {
    // id: 2,
    heading_en: `E-Business Directory`,
    // heading_ar: `الدليل التجاري الإلكتروني`,
    icon: <BiBookBookmark />,
    service_form: false,
    serviceId: 216,
  },
  //   ],
  // },
  // {
  //   id: 4,
  //   heading_ar: `ترويج الأعمال`,
  //   heading_en: `Business Promotion`,
  //   services: [
  {
    // id: 2,
    heading_en: `Request for (technical - marketing - promotional) advice`,
    // heading_ar: `طلب استشارة ( فنية – تسويقية – ترويجية )`,
    service_form: true,
    serviceId: 218,
    link: "/OtherServicesForm/Commercial Consultation",
    public: true,
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    // id: 0,
    heading_en: `Request for coordination of business meetings and bilateral meetings`,
    // heading_ar: `طلب تنسيق الاجتماعات التجارية واللقاءات الثنائية`,
    icon: <ImUsers />,
    service_form: false,
    serviceId: 343,
  },
  {
    // id: 1,
    heading_en: `Request for participation in the economic activities`,
    // heading_ar: `طلب المشاركة في الفعاليات الاقتصادية التي تنظمها الغرفة`,
    icon: <BiCalendarStar />,
    service_form: false,
    serviceId: 344,
  },
  {
    // id: 3,
    heading_en: `Request for participation in business meetings between employers outside the UAE`,
    // heading_ar: `طلب المشاركة في اللقاءات التجارية بين أصحاب الأعمال خارج الدولة`,

    icon: <GiCommercialAirplane />,

    service_form: false,
    serviceId: 346,
  },
  {
    // id: 4,
    heading_en: `Request for the provision of data and information with the investment opportunity`,
    // heading_ar: `طلب توفير البيانات والمعلومات بالفرص الاستثمارية`,
    icon: <BsClipboardData />,
    service_form: false,
    serviceId: 347,
  },
  {
    // id: 5,
    heading_en: `Request for a promotional advertisement`,
    // heading_ar: `طلب إعلان ترويجي`,
    icon: <HiOutlineSpeakerphone />,
    service_form: false,
    serviceId: 348,
  },
  //   ],
  // },
  // {
  //   heading_ar: `التحكيم التجاري`,
  //   id: 5,
  //   heading_en: `Commercial Arbitration`,
  //   services: [
  {
    // id: 0,
    heading_en: `Request for arbitration in resolving a commercial dispute`,
    // heading_ar: `طلب التحكيم في حل نزاع تجاري`,
    icon: <GiThorHammer />,
    service_form: false,
    serviceId: 352,
  },
  {
    // id: 3,
    heading_en: `Request of a legal advice`,
    // heading_ar: `طلب استشارة قانونية`,
    service_form: true,
    serviceId: 372,
    link: "/OtherServicesForm/Legal Consultation",
    public: true,
    icon: <RiScalesLine />,
  },
  {
    // id: 1,
    heading_en: `Request for registration of a commercial arbitrator`,
    // heading_ar: `طلب تسجيل محكم تجاري`,
    icon: <CgFileDocument />,
    service_form: false,
    serviceId: 367,
  },
  {
    // id: 2,
    heading_en: `Request for participation in training courses for arbitrators`,
    // heading_ar: `طلب اشتراك في دورة تدريبية للمحكمين`,
    service_form: false,
    serviceId: 370,
  },
  //   ],
  // },
  // {
  //   id: 6,
  //   heading_ar: `دعم المشاريع الصغيرة والمتوسطة`,
  //   heading_en: `Small and medium-sized enterprises support`,
  //   services: [
  {
    // id: 0,
    heading_en: `Request of a new membership of Saud Bin Saqr Foundation for the development of youth projects`,
    // heading_ar: `طلب عضوية جديدة عضوية رواد أعمال لمؤسسة سعود بن صقر لتنمية مشاريع الشباب`,
    service_form: false,
    serviceId: 376,
    icon: <RiUserAddLine />,
  },
  {
    // id: 1,
    heading_en: `Request for the Renewal of Membership of the Foundation`,
    // heading_ar: `طلب تجديد عضوية المؤسسة`,
    service_form: false,
    serviceId: 479,
    icon: <MdAutorenew />,
  },
  {
    // id: 2,
    heading_en: `Application for granting industrial and commercial lands`,
    // heading_ar: `طلب عضوية منح الأراضي الصناعية والتجارية`,
    service_form: false,
    serviceId: 476,
    icon: <GiIsland />,
  },
  {
    // id: 3,
    heading_en: `Request for rental of business incubators`,
    // heading_ar: `طلب عضوية حاضنات الأعمال`,
    service_form: false,
    serviceId: 475,
    icon: <TiLeaf />,
  },
  {
    // id: 4,
    heading_en: `Request for consultation for small and medium enterprises (SMEs)`,
    // heading_ar: `طــلب استشارة اقتصادية`,
    service_form: false,
    serviceId: 509,
    icon: <RiChatPollLine />,
  },
  {
    // id: 5,
    heading_en: `Request for Registration in training courses`,
    // heading_ar: `طلب الاشتراك في الدورات التدريبية`,
    service_form: false,
    serviceId: 495,
    icon: <GiTeacher />,
  },
  {
    // id: 6,
    heading_en: `Request for participating in exhibitions`,
    // heading_ar: `طلب المشاركة في المعارض`,
    service_form: false,
    serviceId: 539,
    icon: <GiTempleDoor />,
  },
  {
    // id: 7,
    heading_en: `Governmental procurement`,
    // heading_ar: `المشتريات الحكومية`,
    service_form: false,
    serviceId: 541,
    icon: <RiBankLine />,
  },
  {
    // id: 8,
    heading_en: `Application for participating in the incentives program for facilities that are members of the National Program for Small and Medium Enterprises and Projects`,
    // heading_ar: `طلب الاشتراك في برنامج حوافز المنشأت الاعضاء في البرنامج الوطني للمنشات والمشاريع الصغيرة والمتوسطة`,
    service_form: false,
    serviceId: 542,
    icon: <FaGifts />,
  },
  {
    // id: 9,
    heading_en: `Meeting room rental`,
    // heading_ar: `تأجير قاعة الاجتماعات`,
    service_form: false,
    serviceId: 521,
    icon: <GiKeyCard />,
  },
  {
    // id: 10,
    heading_en: `New Membership application: Membership of People of Determination for Saud Bin Saqr Establishment for Youth Enterprises Development`,
    // heading_ar: `طلب عضوية جديدة عضوية ذوي الهمم لمؤسسة سعود بن صقر لتنمية مشاريع الشباب`,
    service_form: false,
    serviceId: 377,
    icon: <RiWheelchairLine />,
  },
  {
    // id: 11,
    heading_en: `New Membership application: Student membership for Saud Bin Saqr Establishment for Youth Enterprises Development`,
    // heading_ar: `طلب عضوية جديدة عضوية الطالب لمؤسسة سعود بن صقر لتنمية مشاريع الشباب`,
    service_form: false,
    serviceId: 486,
    icon: <IoSchoolOutline />,
  },
  //   ],
  // },
  // {
  //   id: 7,
  //   heading_ar: `تنظيم المعارض والفعاليات`,
  //   heading_en: `Organizing exhibitions and events`,
  //   services: [
  {
    // id: 0,
    heading_en: `Application for issuing a permit for a business sector event (outside RAK Exhibition Center)`,
    // heading_ar: `طلب إصدار تصريح فعالية قطاع الأعمال (خارج مركز رأس الخيمة للمعارض)`,
    service_form: false,
    serviceId: 560,
    icon: <BiCalendarCheck />,
  },
  {
    // id: 1,
    heading_en: `Application for holding an event inside RAK Exhibition Center`,
    // heading_ar: `طلب إقامة فعالية داخل مركز رأس الخيمة للمعارض`,
    service_form: false,
    serviceId: 558,
    icon: <RiCalendarEventLine />,
  },
  {
    // id: 2,
    heading_en: `Application for renting outdoor spaces of RAK Exhibition Center`,
    // heading_ar: `طلب تأجير المساحات الخارجية لمركز رأس الخيمة للمعارض`,
    service_form: false,
    serviceId: 556,
    icon: <GiKeyCard />,
  },
  {
    heading_en: `Supplier Registration`,
    serviceId: 1421,
    service_form: true,
    link: "/supplier-services/Supplier%20Registration",
    public: false,
    icon: <RiUserAddLine />,
  },
  {
    heading_en: `Booking Service`,
    serviceId: 1429,
    service_form: true,
    link: "/OtherServicesForm/Booking Service",
    public: false,
    icon: <IoCalendarOutline />,
  },
  //   ],
  // },
];
