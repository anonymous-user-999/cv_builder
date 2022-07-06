import {AiFillSafetyCertificate, AiOutlineTwitter} from 'react-icons/ai';
import {BsTools} from 'react-icons/bs';
import {FaAward, FaProjectDiagram, FaUserFriends} from 'react-icons/fa';
import {
  IoLogoGameControllerB,
  IoMdBriefcase,
  IoMdDocument,
} from 'react-icons/io';
import {MdPerson, MdSchool, MdTranslate} from 'react-icons/md';
import ModalEvents from '../constants/ModalEvents';

export default [
  {
    id: 'profile',
    icon: '/images/excited.png',
    fixed: true,
    visible: true,
    alwaysAdded: true,
  },
  {
    id: 'education',
    icon: '/images/excited.png',
    event: ModalEvents.EDUCATION_MODAL,
    visible: false,
    alwaysAdded: true,
  },
  {
    id: 'work',
    icon: '/images/excited.png',
    event: ModalEvents.WORK_MODAL,
    visible: false,
    alwaysAdded: true,
  },
  {
    id: 'internship',
    icon: '/images/internship.png',
    event: ModalEvents.WORK_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'volunteering',
    icon: '/images/volunteer.png',
    event: ModalEvents.WORK_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'certifications',
    icon: '/images/certificates.png',
    event: ModalEvents.CERTIFICATION_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'skills',
    icon: '/images/excited.png',
    event: ModalEvents.SKILL_MODAL,
    visible: false,
    alwaysAdded: true,
  },
  {
    id: 'objective',
    icon: '/images/excited.png',
    visible: false,
    alwaysAdded: true,
  },
  {
    id: 'references',
    icon: '/images/references.png',
    event: ModalEvents.REFERENCE_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'hobbies',
    icon: '/images/hobbies.png',
    event: ModalEvents.HOBBY_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'awards',
    icon: '/images/awards.png',
    event: ModalEvents.AWARD_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'groups',
    icon: '/images/groups.png',
    event: ModalEvents.AWARD_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'projects',
    icon: '/images/projects.png',
    event: ModalEvents.PROJECT_MODAL,
    visible: false,
    alwaysAdded: false,
  },
  {
    id: 'addsection',
    alwaysAdded: null,
  },
];
