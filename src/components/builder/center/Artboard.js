import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import * as styles from './Artboard.module.css';
import {useSelector} from '../../../contexts/ResumeContext';
import Castform from '../../../templates/Castform';
import Celebi from '../../../templates/Celebi';
import Gengar from '../../../templates/Gengar';
import Glalie from '../../../templates/Glalie';
import Onyx from '../../../templates/Onyx';
import Pikachu from '../../../templates/Pikachu';
import ModalContext from '../../../contexts/ModalContext';
import Button from '../../shared/Button';
import {RiStackLine} from 'react-icons/ri';
import Head from 'next/head';

const Artboard = () => {
  const state = useSelector();
  const {t} = useTranslation();
  const {id, name, metadata} = state;
  const {template} = metadata;
  const {events, emitter} = useContext(ModalContext);

  return (
    <>
      <Head>
        <title>
          {name} | {t('shared.appName')}
        </title>
        <link rel="canonical" href={`https://cvitae.ai/app/builder/${id}`} />
      </Head>

      <div
        className={'relative overflow-hidden flex flex-col w-full px-20 py-10'}>
        <Button
          icon={RiStackLine}
          className={styles.template}
          onClick={() => emitter.emit(events.TEMPLATE_MODAL)}>
          <span className={'font-light'}>change template</span>
        </Button>
        <div id="page" className={styles.container}>
          {template === 'onyx' && <Onyx data={state} />}
          {template === 'pikachu' && <Pikachu data={state} />}
          {template === 'gengar' && <Gengar data={state} />}
          {template === 'castform' && <Castform data={state} />}
          {template === 'glalie' && <Glalie data={state} />}
          {template === 'celebi' && <Celebi data={state} />}
        </div>
      </div>
    </>
  );
};

export default memo(Artboard);
