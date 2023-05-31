import { BsBuilding } from "react-icons/bs";
import { BiCertification } from "react-icons/bi";
import { FiCopy } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsFileCheck } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import { GiSwapBag } from "react-icons/gi";

export const businessServicesData = [
  {
    id: 2,
    serviceId: 54,
    heading_ar: `إصدار شهادة المنشأ`,
    heading: `Issuing Certificate of Origin`,
    link: "/business-services/new-coo/companies",
    roles: [1],
    icon: <BiCertification />,
  },
  {
    id: 3,
    serviceId: 60,
    heading_ar: `طلب نسخ وأختام إضافية`,
    heading: `Additional Request (copies and seals)`,
    link: "/business-services/additional-request",
    roles: [1],
    icon: <FiCopy />,
  },
  {
    id: 62,
    serviceId: 61,
    heading: `Other Request`,
    heading_ar: `طلبات إضافية`,
    link: "/business-services/other-request",
    roles: [1],
    icon: <FiCopy />,
  },
  {
    id: 4,
    serviceId: 58,
    heading: `Amendment Issued COO Request`,
    heading_ar: `طلب تعديل شهادة منشأ صادرة`,
    link: "/business-services/amendment-coo-request",
    roles: [1],
    icon: <FiEdit />,
  },
  {
    id: 5,
    heading: `Ratification Request`,
    heading_ar: `طلب تصديق`,
    serviceId: 63,
    link: "/business-services/ratification-request",
    roles: [1, 2],
    icon: <HiOutlineBadgeCheck />,
  },
  {
    id: 6,
    heading_ar: `التحقق من إصدار شهادة المنشأ`,
    heading: `Verification The Issuance of The Certificate of Origin`,
    link: "/business-services/coo-verify",
    serviceId: 57,
    public: true,
    icon: <IoShieldCheckmarkOutline />,
  },
  {
    id: 7,
    link: "/business-services/ratification-verify",
    heading: `Ratification Verification`,
    heading_ar: `التحقق من التصديق`,
    serviceId: 947,
    public: true,
    icon: <BsFileCheck />,
  },
  {
    id: 8,
    heading_ar: `التحقق من شهادة العضوية`,
    link: "/business-services/membership-verify",
    heading: `Verification of The Membership Certificate`,
    serviceId: 68,
    public: true,
    icon: <FaUserShield />,
  },
  {
    link: "/business-services/membership-fees",
    id: 9,
    serviceId: 72,
    heading_ar: `الاستعلام عن رسوم عضوية جديدة`,
    heading: `Inquiring About New Membership Fees`,
    public: true,
    icon: <GiSwapBag />,
  },
  {
    id: 1,
    heading_ar: `الدليل التجاري`,
    heading: `Business Directory`,
    link: "/business-services/Business Directory",
    serviceId: 215,
    public: true,
    icon: <BsBuilding />,
  },
];
