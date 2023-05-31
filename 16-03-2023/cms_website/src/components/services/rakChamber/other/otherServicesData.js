import { RiScalesLine } from "react-icons/ri";
import { IoBusiness } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

export const otherServicesData = [
  {
    serviceId: 372,
    id: 1,
    heading_ar: `استشارة قانونية`,
    heading: `Legal Consultation`,
    link: "/OtherServicesForm/Legal Consultation",
    roles: [1, 2],
    public: true,
    icon: <RiScalesLine />,
  },
  {
    serviceId: 218,
    id: 2,
    heading_ar: `استشارة تجارية`,
    heading: `Commercial Consultation`,
    link: "/OtherServicesForm/Commercial Consultation",
    roles: [1, 2],
    public: true,
    icon: <IoBusiness />,
  },
  {
    serviceId: 218,
    id: 3,
    heading_ar: `دعم فني`,
    heading: `Technical Support`,
    link: "/OtherServicesForm/Technical Support",
    roles: [1, 2],
    public: true,
    icon: <RiUserSettingsLine />,
  },
  {
    id: 4,
    heading_ar: `خدمة الحجز`,
    heading: `Booking Service`,
    link: "/OtherServicesForm/Booking Service",
    roles: [1, 2],
    public: true,
    icon: <IoCalendarOutline />,
  },
];
