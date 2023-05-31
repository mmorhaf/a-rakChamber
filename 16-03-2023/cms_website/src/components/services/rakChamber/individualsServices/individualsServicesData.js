import { BsBuilding } from "react-icons/bs";
import { BiCertification } from "react-icons/bi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { BsFileCheck } from "react-icons/bs";
import { GiSwapBag } from "react-icons/gi";

export const individualsServicesData = [
  {
    id: 2,
    heading_ar: `شهادة منشأ شخصية`,
    heading: `Personal COO`,
    roles: [2],
    serviceId: 56,
    link: "/business-services/new-coo/personal",
    icon: <BiCertification />,
  },
  {
    id: 3,
    link: "/business-services/ratification-request",
    heading: `Ratification Request`,
    heading_ar: `طلب تصديق`,
    roles: [1, 2],
    serviceId: 63,
    icon: <HiOutlineBadgeCheck />,
  },
  {
    id: 4,
    heading: `Verification The Issuance of The Certificate of Origin`,
    heading_ar: `التحقق من إصدار شهادة المنشأ`,
    link: "/business-services/coo-verify",
    public: true,

    serviceId: 57,
    icon: <FaUserShield />,
  },
  {
    id: 5,
    link: "/business-services/ratification-verify",
    heading: `Ratification Verification`,
    heading_ar: `التحقق من التصديق`,

    public: true,

    serviceId: 947,
    icon: <BsFileCheck />,
  },
  {
    id: 8,
    link: "/business-services/membership-verify",
    heading: `Verification of The Membership Certificate`,
    heading_ar: `التحقق من شهادة العضوية`,
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
