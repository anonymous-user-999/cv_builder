import React, {memo} from 'react';
import Castform from '../../templates/Castform';
import Celebi from '../../templates/Celebi';
import Gengar from '../../templates/Gengar';
import Glalie from '../../templates/Glalie';
import Onyx from '../../templates/Onyx';
import Pikachu from '../../templates/Pikachu';
import styles from './styles.module.css';

const CvTemplate = ({resume}) => {
  const {metadata} = resume || {};
  const {template} = metadata || {};

  return (
    <page
      className={styles.cvTemplateWrapper}
      id="CvTemplateIdForPrint"
      style={true ? {maxHeight: '297mm', overflowY: 'auto'} : {}}>
      {template === 'onyx' && <Onyx data={resume} />}
      {template === 'pikachu' && <Pikachu data={resume} />}
      {template === 'gengar' && <Gengar data={resume} />}
      {template === 'castform' && <Castform data={resume} />}
      {template === 'glalie' && <Glalie data={resume} />}
      {template === 'celebi' && <Celebi data={resume} />}
    </page>
  );
};

export default memo(CvTemplate);
