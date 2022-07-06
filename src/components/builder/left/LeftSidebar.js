import {Element} from 'react-scroll';
import React, {Fragment, memo, useContext, useEffect, useState} from 'react';
import * as styles from './LeftSidebar.module.css';
import Awards from './sections/Awards';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Hobbies from './sections/Hobbies';
import Languages from './sections/Languages';
import LeftNavbar from './LeftNavbar';
import Objective from './sections/Objective';
import Profile from './sections/Profile';
import Projects from './sections/Projects';
import References from './sections/References';
import Skills from './sections/Skills';
import Social from './sections/Social';
import Work from './sections/Work';
import sections from '../../../data/leftSections';
import SettingsContext from '../../../contexts/SettingsContext';
import Button from '../../shared/Button';
import AddSection from './sections/AddSection';
import {useSelector} from '../../../contexts/ResumeContext';
import Internship from './sections/Internship';
import Volunteering from './sections/Volunteering';
import Groups from './sections/Groups';

const getComponent = (id) => {
  switch (id) {
    case 'profile':
      return Profile;
    case 'social':
      return Social;
    case 'objective':
      return Objective;
    case 'work':
      return Work;
    case 'internship':
      return Internship;
    case 'volunteering':
      return Volunteering;
    case 'education':
      return Education;
    case 'projects':
      return Projects;
    case 'awards':
      return Awards;
    case 'certifications':
      return Certifications;
    case 'skills':
      return Skills;
    case 'hobbies':
      return Hobbies;
    case 'languages':
      return Languages;
    case 'references':
      return References;
    case 'addsection':
      return AddSection;
    case 'groups':
      return Groups;
    default:
      throw new Error();
  }
};

const SidebarSection = ({id, event, visible}) => {
  const Component = getComponent(id);

  return (
    <Component
      key={`leftSideSection${id}`}
      id={id}
      event={event}
      visible={visible}
    />
  );
};

const LeftSidebar = () => {
  const {isSideBarOpen, currentStep, setCurrentStep, visibleSections} =
    useContext(SettingsContext);
  useEffect(() => {
    setCurrentStep(0);
    return () => setCurrentStep(0);
  }, []);
  const [secs, setSecs] = useState(sections);

  useEffect(() => {
    setSecs(sections.filter((x) => visibleSections.find((y) => y.id == x.id)));
  }, [visibleSections]);

  return (
    <div className={styles.leftsection}>
      {isSideBarOpen && (
        <>
          <div id="LeftSidebar" className={styles.container}>
            {/* <div className={styles.nav}> */}
            <LeftNavbar />
            {/* </div> */}
            {secs.map((x, i) =>
              SidebarSection({
                id: x.id,
                event: x.event,
                visible: i == currentStep,
              }),
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default memo(LeftSidebar);
