import {
  faXmark,
  faArrowRotateRight,
  faExpand,
  faShareNodes,
  faArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useMediaQuery} from '@mui/material';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import ResumeHeader from '../../src/components/AdminDashboard/ResumeHeader';
import ShareResumeModal from '../../src/components/AdminDashboard/ShareResumeModal';
import CoverLetter from '../../src/components/CoverLetter';
import Textarea from '../../src/components/ResumeForms/Textarea';
import TextInput from '../../src/components/ResumeForms/TextInput';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import UserContext from '../../src/contexts/UserContext';
import API from '../../src/services';
import {required} from '../../src/utils';
import styles from './styles.module.css';

const EditLetter = () => {
  const {user, authToken} = useContext(UserContext);
  const {getResume, loading} = useContext(DatabaseContext);
  const [resume, setResume] = useState({});

  const isSmallerThan992 = useMediaQuery('(max-width: 992px)');
  const router = useRouter();
  const {query} = router;
  const [isLoading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState('');
  const [jobTitle, setJobTitle] = useState('UI/UX Designer');
  const [shareModal, setShareModal] = useState(false);
  const [templateView, setTemplateView] = useState(false);
  const {
    register,
    formState: {errors},
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      letterDetails: defaultValue,
    },
  });

  const letterDetails = watch('letterDetails');
  const hiringManagerName = watch('hiringManagerName');
  const companyName = watch('companyName');

  console.log(letterDetails);
  const onRestore = () => {
    const {coverLetter} = resume || {};
    const {
      companyName,
      hiringManagerName,
      body,
      resumeId,
      visible,
      createdAt,
      updatedAt,
      id,
    } = coverLetter;
    setJobTitle('');
    setDefaultValue(body);
    setValue('companyName', companyName);
    setValue('hiringManagerName', hiringManagerName);
    setValue('letterDetails', body);
  };

  useEffect(() => {
    !user && router.push('/');
    (async () => {
      const res = await getResume(query?.id);
      setResume(res);
      const {coverLetter} = res || {};
      const {
        companyName = '',
        hiringManagerName,
        body,
        resumeId,
        visible,
        createdAt,
        updatedAt,
        id,
      } = coverLetter;

      setJobTitle('');
      setDefaultValue(body);
      setValue('companyName', companyName);
      setValue('hiringManagerName', hiringManagerName);
      setValue('letterDetails', body);
    })();
  }, []);

  const onTemplateCross = () => {
    if (!isSmallerThan992) {
      router.push(`/resume-profile/${query?.id}`);
      return;
    }
    setTemplateView(false);
  };

  const getFormView = () => {
    if (!isSmallerThan992) {
      return true;
    }
    if (isSmallerThan992) {
      if (!templateView) {
        return true;
      }
    }
    return false;
  };
  const getTemplateView = () => {
    if (!isSmallerThan992) {
      return true;
    }
    if (isSmallerThan992) {
      if (templateView) {
        return true;
      }
    }
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await API.ResumeAPI.updateCoverLetter(
        {
          body: letterDetails,
          companyName: companyName,
          hiringManagerName: hiringManagerName,
        },
        resume?.coverLetter?.id,
      );
      console.log('cover letter updated', result);
    } catch (e) {
      console.log('error', e);
    }
    setLoading(false);
  };

  const onPrint = () => {
    var divContents = document.getElementById('jobLetterEditMode').innerHTML;
    var a = window.open('', '', 'height=1000, width=1000');
    a.document.write(divContents);
    a.print();
    a.document.close();
  };

  return (
    <>
      <ShareResumeModal
        open={shareModal}
        setOpen={setShareModal}
        endpoint={`/letter-view/${query.id}`}
      />
      <div className={styles.main}>
        {getFormView() && (
          <div className={styles.formContainer}>
            <ResumeHeader title={jobTitle} setTitle={setJobTitle} />
            <div className={styles.headerPara}>
              Hello Dear Mus'ab, Double your chances for an interview! Resumes
              with filled-in contact details, job role, email, and other info
              usually receive much more views.
            </div>
            <form className={styles.form}>
              <div className={styles.inputsContainer}>
                <TextInput
                  label="Company Name"
                  placeholder="Type Here"
                  error={errors.companyName}
                  {...register('companyName', {
                    required: required('Company Name'),
                  })}
                />
                <TextInput
                  label="Hiring Manager Name"
                  placeholder="Type Here"
                  error={errors.hiringManagerName}
                  {...register('hiringManagerName', {
                    required: required('Hiring Manager Name'),
                  })}
                />
              </div>
              <Textarea
                label="Letter Details"
                {...register('letterDetails')}
                error={errors.letterDetails}
                style={{minHeight: '530px'}}
              />
            </form>
            <div
              className={`flex justify-between items-center mt-10 ${styles.templateFooter}`}>
              <div
                className={`flex justify-between items-center w-100 ${styles.restoreContainer}`}>
                <div className={styles.resotre} onClick={onRestore}>
                  {' '}
                  <FontAwesomeIcon
                    icon={faArrowRotateRight}
                    className="mr-2"
                  />{' '}
                  Restore to default
                </div>
                <div
                  className={styles.seeTemplate}
                  onClick={() => setTemplateView(true)}>
                  <FontAwesomeIcon icon={faEye} />
                </div>
              </div>
              <div className={`flex  ${styles.btnsContainer}`}>
                <Link href={`/resume-profile/${query?.id}`}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.cancelBtn} mr-8`}>
                    cancel
                  </button>
                </Link>
                <button
                  onClick={onSubmit}
                  disabled={isLoading}
                  className={`${styles.btn} ${styles.nextBtn}`}>
                  {isLoading ? 'Saving' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
        {getTemplateView() && (
          <div className={styles.templateContainer}>
            <Link href={`/resume-profile/${query?.id}`}>
              <div className={styles.templateCross} onClick={onTemplateCross}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </Link>
            <div className={styles.templateWrapper} style={{pointer: 'cursor'}}>
              <Link target="_blank" href={`/letter-view/${query.id}`}>
                <div className={styles.expand}>
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </Link>
              <div className={styles.shareBox}>
                <div
                  className={styles.shareText}
                  onClick={() => setShareModal(!shareModal)}>
                  <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles.shareIcon}
                  />
                  Share
                </div>
                <div className={styles.shareDivider} />
                <div className={styles.shareText} onClick={onPrint}>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className={styles.shareIcon}
                  />
                  Download
                </div>
              </div>
              <CoverLetter
                jobTitle={jobTitle}
                data={letterDetails}
                hiringManager={hiringManagerName}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditLetter;
