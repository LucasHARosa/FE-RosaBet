"use client";
import { BsArrowRightShort, BsFillBookmarkStarFill, BsPatchQuestion, BsTrash3 } from "react-icons/bs";
import { FaFlagCheckered, FaPause, FaUser } from "react-icons/fa";

import { FaArrowRight, FaCircleCheck, FaCirclePlay, FaDeleteLeft, FaFireFlameCurved, FaInfo, FaPix, FaRankingStar, FaStar, FaUserGroup } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { GoArrowUpLeft, GoGear, GoGift } from "react-icons/go";
import { HiCheck, HiCurrencyDollar } from "react-icons/hi";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoIosSearch, IoMdAdd, IoMdCloseCircle, IoMdNotifications, IoMdPlayCircle } from "react-icons/io";
import { IoCalendarOutline, IoClose, IoFilter, IoGift, IoGrid, IoGridOutline, IoMenu, IoTicketSharp } from "react-icons/io5";
import { MdBlock, MdOutlineMarkEmailRead, MdOutlineRefresh, MdOutlineSecurity } from "react-icons/md";
import { PiKeyFill, PiSquareSplitVerticalFill, PiSquareSplitVerticalLight, PiTennisBallFill } from "react-icons/pi";
import { RiHistoryFill, RiLock2Fill } from "react-icons/ri";
import { TbAlertTriangleFilled, TbCurrencyReal, TbTargetArrow } from "react-icons/tb";

import { colorPicker } from "./colorPicker";
import { LuPencilLine } from "react-icons/lu";
import { ImDice } from "react-icons/im";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { CgArrowsMergeAltV, CgArrowsShrinkV } from "react-icons/cg";
import { BiSolidCopy } from "react-icons/bi";

export default function Icon ({name,size,color}: IconProps) {
  const sizeIcon = size || 24;
  const colorIcon = () => color ? colorPicker(color) : colorPicker('text.dynamic.whiteDynamic.100');

  const selectIcon = (icon:string) => {
    switch (icon) {
      case 'bookmark':
        return <BsFillBookmarkStarFill size={sizeIcon} color={colorIcon()} />;
      case 'arrowRight':
        return <FaArrowRight size={sizeIcon} color={colorIcon()} />;
      case 'arrowRightShort':
        return <BsArrowRightShort size={sizeIcon} color={colorIcon()} />;	
      case 'arrowRightIos':
        return <IoIosArrowForward  size={sizeIcon} color={colorIcon()} />;
      case 'arrowUpLeft':
        return <GoArrowUpLeft size={sizeIcon} color={colorIcon()} />;
      case 'arrowDownIos':
        return <IoIosArrowDown size={sizeIcon} color={colorIcon()} />;
      case 'arrowUpIos':
        return <IoIosArrowUp size={sizeIcon} color={colorIcon()} />;
      case 'arrowLeftIos':
        return <IoIosArrowBack size={sizeIcon} color={colorIcon()} />;
      case 'arrowShrink':
        return <CgArrowsShrinkV size={sizeIcon} color={colorIcon()} />;
      case 'arrowMerge':
        return <CgArrowsMergeAltV size={sizeIcon} color={colorIcon()} />;
      case 'grid':
        return <IoGrid size={sizeIcon} color={colorIcon()} />;
      case 'gridOutline':
        return <IoGridOutline size={sizeIcon} color={colorIcon()} />;
      case 'line':
        return <PiSquareSplitVerticalFill size={sizeIcon} color={colorIcon()} />;
      case 'lineLight':
        return <PiSquareSplitVerticalLight size={sizeIcon} color={colorIcon()} />;
      case 'filter':
        return <IoFilter size={sizeIcon} color={colorIcon()} />
      case 'play':
        return <IoMdPlayCircle size={sizeIcon} color={colorIcon()} />
      case 'lock':
        return <RiLock2Fill size={sizeIcon} color={colorIcon()} />
      case 'plus':
        return <IoMdAdd size={sizeIcon} color={colorIcon()} />
      case 'target':
        return <FiTarget size={sizeIcon} color={colorIcon()} />;
      case 'sport':
        return <PiTennisBallFill size={sizeIcon} color={colorIcon()} />;
      case 'gift':
        return <IoGift size={sizeIcon} color={colorIcon()} />;
      case 'giftOutline':
        return <GoGift size={sizeIcon} color={colorIcon()} />;
      case 'success':
        return <HiCheck size={sizeIcon} color={colorIcon()} />;
      case 'alert':
        return <TbAlertTriangleFilled size={sizeIcon} color={colorIcon()} />;
      case 'info':
        return <FaInfo size={sizeIcon} color={colorIcon()} />;
      case 'error':
        return <IoClose size={sizeIcon} color={colorIcon()} />;
      case 'key':
        return <PiKeyFill size={sizeIcon} color={colorIcon()} />;
      case 'flagCheckered':
        return <FaFlagCheckered size={sizeIcon} color={colorIcon()} />;
      case 'menu':
        return <IoMenu size={sizeIcon} color={colorIcon()} />;
      case 'search':
        return <IoIosSearch size={sizeIcon} color={colorIcon()} />;
      case 'history':
        return <RiHistoryFill size={sizeIcon} color={colorIcon()} />;
      case 'refresh':
        return <MdOutlineRefresh  size={sizeIcon} color={colorIcon()} />;
      case 'ticket':
        return <HiOutlineTicket size={sizeIcon} color={colorIcon()} />;
      case 'ticketFill':
        return <IoTicketSharp size={sizeIcon} color={colorIcon()} />;
      case 'fire':
        return <FaFireFlameCurved size={sizeIcon} color={colorIcon()} />;
      case 'rankingStar':
        return <FaRankingStar size={sizeIcon} color={colorIcon()} />;
      case 'question':
        return <BsPatchQuestion size={sizeIcon} color={colorIcon()} />;
      case 'trash':
        return <BsTrash3 size={sizeIcon} color={colorIcon()} />;
      case 'targetArrow':
        return <TbTargetArrow size={sizeIcon} color={colorIcon()} />;
      case 'pencil':
        return <LuPencilLine size={sizeIcon} color={colorIcon()} />;
      case 'dice':
        return <ImDice size={sizeIcon} color={colorIcon()} />;
      case 'closeCircle':
        return <IoMdCloseCircle size={sizeIcon} color={colorIcon()} />;
      case 'user':
        return <FaUser size={sizeIcon} color={colorIcon()} />;
      case 'notifications':
        return <IoMdNotifications size={sizeIcon} color={colorIcon()} />;
      case 'userGroup':
        return <FaUserGroup size={sizeIcon} color={colorIcon()} />;
      case 'currencyReal':
        return <TbCurrencyReal size={sizeIcon} color={colorIcon()} />;
      case 'currencyDollar':
        return <HiCurrencyDollar size={sizeIcon} color={colorIcon()} />;
      case 'menuUnfold':
        return <AiOutlineMenuUnfold size={sizeIcon} color={colorIcon()} />;
      case 'security':
        return <MdOutlineSecurity size={sizeIcon} color={colorIcon()} />;
      case 'pause':
        return <FaPause size={sizeIcon} color={colorIcon()} />;
      case 'deleteLeft':
        return <FaDeleteLeft size={sizeIcon} color={colorIcon()} />;
      case 'check':
        return <FaCircleCheck size={sizeIcon} color={colorIcon()} />;
      case 'emailRead':
        return <MdOutlineMarkEmailRead size={sizeIcon} color={colorIcon()} />;
      case 'block':
        return <MdBlock  size={sizeIcon} color={colorIcon()}/>
      case 'copy':
        return <BiSolidCopy  size={sizeIcon} color={colorIcon()} />;
      case 'star':
        return <FaStar size={sizeIcon} color={colorIcon()} />;
      case 'circlePlay':
        return <FaCirclePlay  size={sizeIcon} color={colorIcon()} />;
      case 'calendarOutline':
        return <IoCalendarOutline  size={sizeIcon} color={colorIcon()} />;
      case 'pix':
        return <FaPix size={sizeIcon} color={colorIcon()} />;
      case 'gear':
        return <GoGear size={sizeIcon} color={colorIcon()} />;


      default:
        return <BsFillBookmarkStarFill size={sizeIcon} color={colorIcon()} />;
    }
  }

  return (
    <>
      {selectIcon(name)}
    </>
  )
}

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}