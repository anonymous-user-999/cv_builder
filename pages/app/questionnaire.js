import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import LoadingScreen from '../../src/components/router/LoadingScreen';
import Input from '../../src/components/shared/Input';
import Steps from '../../src/components/Steps';
import DatabaseContext from '../../src/contexts/DatabaseContext';
import {useDispatch} from '../../src/contexts/ResumeContext';
import UserContext from '../../src/contexts/UserContext';
import withAuth from '../../src/hooks/withAuth';
import * as styles from './questionnaire.module.css';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getFieldProps} from '../../src/utils';
import Button from '../../src/components/shared/Button';
import {BsArrowLeftShort} from 'react-icons/bs';
import {toast} from 'react-toastify';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import OtpInput from 'react-otp-input';
import cx from 'classnames';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {AiFillCloseCircle, AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai';
import API from '../../src/services';
import ModalContext from '../../src/contexts/ModalContext';
import Head from 'next/head';
import libphonenumbers from 'libphonenumbers';

const initialValues = {
  phone: '',
};

const initialNameValues = {
  name: '',
};

const NameStep = ({name, setName, t}) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
  });
  return (
    <div
      key="name-step"
      className={`animate__animated animate__fadeInRight animate__fast ${styles.phonestep}`}>
      <h4 className={styles.enterphone}>
        {t('builder.questionnaire.enterName')}
      </h4>
      <Formik
        validateOnBlur
        initialValues={initialNameValues}
        validationSchema={schema}>
        {(formik) => (
          <div className="w-6/12">
            <Input
              name="name"
              inputClassName={styles.myinput}
              placeholder=""
              {...getFieldProps(formik, schema, 'name')}
              onChange={(e) => {
                setName(e.target.value);
                formik.getFieldProps().onChange(e);
              }}
              onBlur={() => {
                formik.getFieldProps().onChange({
                  target: {
                    value: name,
                  },
                });
              }}
              value={name}
            />
          </div>
        )}
      </Formik>
    </div>
  );
};

const PhoneStep = ({
  phone,
  setPhone,
  setCountry,
  t,
  isVerifyMode,
  code,
  setCode,
  setCurrentStep,
  resendCode,
  isLoading,
}) => {
  const schema = Yup.object().shape({
    phone: Yup.string()
      .required(t('shared.forms.validation.required'))
      .min(7, t('shared.forms.validation.min', {number: 7})),
  });

  return (
    <div
      key="phone-step"
      className={cx('animate__animated animate__fadeInRight animate__faster', {
        [styles.phonestep]: !isVerifyMode,
        [styles.verifycard]: isVerifyMode,
      })}>
      {isVerifyMode ? (
        <>
          <div className="flex flex-col items-center">
            <h1 className={styles.verifyphone}>
              {t('builder.questionnaire.verifyPhoneTitle')}
            </h1>
            <p className={styles.entercode}>
              {t('builder.questionnaire.enterCode')}
              <span
                className={styles.phonenumber}
                onClick={() => {
                  isLoading ? null : setCurrentStep(1);
                }}>
                +{phone}
              </span>
            </p>
          </div>
          <OtpInput
            shouldAutoFocus
            isDisabled={isLoading}
            containerStyle={
              {
                // display: 'flex',
                // flex: 1,
                // justifyContent: 'space-between',
                // alignSelf: 'center',
                // alignItems: 'center',
              }
            }
            inputStyle={{
              width: '80px',
              height: '80px',
              backgroundColor: '#EBF9F5',
              marginRight: '10px',
              borderRadius: '5px',
              fontSize: '16px',
              color: 'black',
            }}
            focusStyle={{
              backgroundColor: '#CCF1E6',
              borderColor: 'transparent',
              borderWidth: '0',
            }}
            isInputNum
            value={code}
            onChange={setCode}
            numInputs={6}
          />
          <p className={styles.entercode}>
            {t('builder.questionnaire.didntRecieveCode')}
            <span
              className={styles.phonenumber}
              onClick={isLoading ? null : resendCode}>
              {' ' + t('builder.questionnaire.resend')}
            </span>
          </p>
        </>
      ) : (
        <>
          <h4 className={styles.enterphone}>
            {t('builder.questionnaire.enterPhone')}
          </h4>
          <Formik
            validateOnBlur
            initialValues={initialValues}
            validationSchema={schema}>
            {(formik) => (
              <div className="w-6/12">
                <Input
                  name="phone"
                  type="phone"
                  inputClassName={styles.myinput}
                  // inputClassName="bg-white"
                  placeholder=""
                  {...getFieldProps(formik, schema, 'phone')}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setCountry(e.target.country);
                    formik.getFieldProps().onChange(e);
                  }}
                  onBlur={() => {
                    formik.validateForm({phone});
                    formik.getFieldProps().onChange({
                      target: {
                        value: phone,
                      },
                    });
                  }}
                  value={phone}
                />
              </div>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

const ResumeStep = ({t, setCurrentStep, setActiveResume}) => {
  const fileInputRef = useRef(null);
  const {createResume, uploadResume, activeResume} =
    useContext(DatabaseContext);
  const {user} = useContext(UserContext);
  const router = useRouter();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadResume = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) throw new Error('');
      if (file && file.type != 'application/pdf')
        toast.error('File type must be PDF!');
      const result = await uploadResume(file);
      if (result) {
        setActiveResume(result);
        if (user.targetedJobTitles && user.targetedJobTitles.length > 0) {
          return router.replace(`/app/builder/${result.id}`);
        }
        setCurrentStep(4);
      }
    } catch (error) {}
  };

  const handleCreateResume = async () => {
    const result = await createResume({
      name: user.fullname,
    });
    if (result) {
      setActiveResume(result);
      if (user.targetedJobTitles && user.targetedJobTitles.length > 0) {
        return router.replace(`/app/builder/${result.id}`);
      }
      setCurrentStep(4);
    }
  };

  return (
    <div
      className={`${styles.resumestep} animate__animated animate__fadeInRight animate__faster`}>
      <h1 className={`${styles.verifyphone} md:w-8/12`}>
        {t('builder.questionnaire.resume')}
      </h1>
      <div className={styles.resumebtns}>
        <div className={styles.resumebtn} onClick={handleCreateResume}>
          <Image
            src={'/images/create-resume.svg'}
            width={'30px'}
            height={'30px'}
          />
          <p className={styles.resumebtntitle}>
            {t('builder.questionnaire.createResume')}
          </p>
          <p className={styles.resumebtntip}>
            {t('builder.questionnaire.createTip')}
          </p>
        </div>
        <div
          className={`ml-10 ${styles.resumebtn}`}
          onClick={handleUploadClick}>
          <input
            name="file"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="application/pdf"
            onChange={handleUploadResume}
          />
          <Image
            src={'/images/upload-resume.svg'}
            width={'30px'}
            height={'30px'}
          />
          <p className={styles.resumebtntitle}>
            {t('builder.questionnaire.uploadResume')}
          </p>
          <p className={styles.resumebtntip}>
            {t('builder.questionnaire.uploadTip')}
          </p>
        </div>
      </div>
    </div>
  );
};

const JobTitleStep = ({t, setSelectedJobTitlesCallBack}) => {
  const {authToken, clearUser} = useContext(UserContext);
  let timeout = null;
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    getJobTitles();
  }, []);

  useEffect(() => {
    setSelectedJobTitlesCallBack(selectedJobTitles);
  }, [selectedJobTitles]);

  useEffect(() => {
    setRecommended([]);
    if (selectedJobTitles[0]) {
      getRecommendedJobTitles();
    }
  }, [selectedJobTitles[0]]);

  const getJobTitles = async () => {
    const result = await API.ResumeAPI.getJobTitles(authToken);
    if (!result.authorized) return clearUser();
    if (result.data) {
      const tempJobTitles = [];
      result?.data?.jobTitles?.forEach((x, i) =>
        tempJobTitles?.push({id: i, name: x}),
      );
      setItems(tempJobTitles);
    }
  };

  const getRecommendedJobTitles = async () => {
    const result = await API.ResumeAPI.getRelatedJobTitles(
      {title: selectedJobTitles[0].name},
      authToken,
    );
    if (!result.authorized) return clearUser();
    if (result.data) {
      const array = result.data.jobTitles.map((x, i) => ({id: i, name: x}));
      setRecommended(array);
    }
  };

  const handleOnSearch = (string, results) => {
    setSearch(string);
    timeout && clearTimeout(timeout);
  };

  const handleOnHover = (result) => {};

  const handleOnSelect = (item) => {
    if (selectedJobTitles.length < 10) {
      setSearch('');
      if (selectedJobTitles.findIndex((x) => x.id == item.id) == -1) {
        setSelectedJobTitles((prev) => [...prev, item]);
      }
      const index = recommended.findIndex(
        (x) => x.name?.toLowerCase() == item.name?.toLowerCase(),
      );
      if (index != -1) {
        recommended[index].selected = true;
        setRecommended(recommended);
      }
    } else toast.error(t('builder.questionnaire.validations.maxTitles'));
  };

  const handleOnFocus = () => {};

  const removeItem = (item, index) => {
    setSelectedJobTitles((prev) => prev.filter((x, i) => i != index));
    const selectedIndex = recommended.findIndex(
      (x) => x.name?.toLowerCase() == item.name?.toLowerCase(),
    );
    if (selectedIndex != -1) {
      recommended[selectedIndex].selected = false;
      setRecommended(recommended);
    }
  };

  const addRecommended = (item, index) => {
    const selected = recommended[index].selected;
    selected
      ? setSelectedJobTitles((prev) => prev.filter((x) => x.id != item.id))
      : setSelectedJobTitles((prev) => [...prev, item]);
    recommended[index].selected = !selected;
    setRecommended(recommended);
  };

  const JobTitle = ({item, index}) => (
    <div
      className={cx('cursor-pointer', {
        [styles.selectedjobtitle]: index > 0,
        [styles.firstselectedjobtitle]: index == 0,
      })}>
      <p className={styles.selectedjobtitletext}>
        {index == 0
          ? t('builder.questionnaire.main')
          : `${t('builder.questionnaire.option')} ${index + 1}: `}
      </p>
      &nbsp;
      <p>{item.name}</p>
      &nbsp;
      <span onClick={() => removeItem(item, index)}>
        <AiFillCloseCircle size="14px" />
      </span>
    </div>
  );

  const Recommended = ({item, index}) => (
    <div
      key={`recommended${index}`}
      className={styles.recommendedbtn}
      onClick={() => {
        if (selectedJobTitles.length < 10) addRecommended(item, index);
        else toast.error(t('builder.questionnaire.validations.maxTitles'));
      }}>
      {item.selected ? (
        <AiOutlineCheck color="var(--app-color)" size="14px" />
      ) : (
        <AiOutlinePlus color="black" size="14px" />
      )}
      <p
        className={cx('ml-1', {
          [styles.recommendedselected]: item.selected,
        })}>
        {item.name}
      </p>
    </div>
  );

  return (
    <div className={'jobtitleinput'}>
      <h1 className={`${styles.verifyphone} md:w-8/12`}>
        {t('builder.questionnaire.jobTitle')}
      </h1>
      <div className={'w-8/12'}>
        {items?.length > 0 && (
          <ReactSearchAutocomplete
            items={items || []}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            styling={{
              boxShadow: null,
              borderRadius: '8px',
              border: '1px solid var(--app-color)',
              maxWidth: '80%',
              zIndex: '100',
            }}
            showIcon={false}
            placeholder={t('builder.questionnaire.targetedJobTitle')}
            inputSearchString={search}
            fuseOptions={{minMatchCharLength: 2}}
          />
        )}
      </div>
      {selectedJobTitles?.length > 0 && (
        <div className={styles.selectedjobtitles}>
          {selectedJobTitles?.map((item, index) => JobTitle({item, index}))}
        </div>
      )}
      {selectedJobTitles?.length > 0 && recommended?.length > 0 && (
        <div className="mt-5">
          <p className="mb-1">{t('builder.questionnaire.recommended')}</p>
          <div className="flex items-center flex-wrap">
            {recommended
              ?.slice(0, 12)
              .map((item, index) => Recommended({item, index}))}
          </div>
        </div>
      )}
    </div>
  );
};

const Actions = ({currentStep, onNext, isLoading, t}) => {
  return (
    <div className={styles.actions}>
      {currentStep > 0 && (
        <Button
          key="back"
          onClick={() => {
            currentStep == 0 ? null : onNext(currentStep - 1);
          }}
          icon={BsArrowLeftShort}
          className={`animate__animated animate__fadeIn animate__faster ${styles.back}`}>
          <p>Back</p>
        </Button>
      )}
      {currentStep != 3 && (
        <Button
          key="next"
          onClick={() => {
            onNext(currentStep + 1);
          }}
          className={`animate__animated animate__fadeIn animate__faster  ${styles.next}`}
          isLoading={isLoading}>
          <p className={styles.nexttext}>
            {currentStep < 4
              ? t('builder.questionnaire.next')
              : t('builder.questionnaire.go')}
            <span className="flex items-center mx-1">
              {currentStep < 4 ? null : (
                <Image src={'/images/box.png'} width={'14px'} height={'14px'} />
              )}
            </span>
          </p>
        </Button>
      )}
    </div>
  );
};

const Questionnaire = ({}) => {
  const auth = getAuth();
  const {t} = useTranslation();
  const router = useRouter();
  const {activeResume, userProgress, setActiveResume, checkCompletedResume} =
    useContext(DatabaseContext);
  const {events, emitter} = useContext(ModalContext);
  const {user, updateProfile, getUserData} = useContext(UserContext);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(userProgress);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState({
    countryCode: 'jo',
  });
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);

  useEffect(() => {
    (async () => {
      user && (await getUserData());
      await checkCompletedResume();
      setName(user.fullname);
      setPhone(user.phone);
      setIsPhoneVerified(userProgress > 2);
      setIsLoading(false);
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth,
      );
      if (userProgress == 2 && !confirmationResult) {
        updateUserPhone();
      }
    })();
  }, []);

  useEffect(() => {
    setCurrentStep(userProgress || 0);
  }, [userProgress]);

  useEffect(() => {
    if (code && code.length == 6) {
      verifyPhone();
    }
  }, [code]);

  if (isLoading) return <LoadingScreen />;

  const handleStepChange = async (nextStep) => {
    if (nextStep < currentStep) {
      if (nextStep == 2 || nextStep == 3)
        return setCurrentStep(nextStep == 2 ? nextStep - 1 : nextStep - 2);
      return setCurrentStep(nextStep);
    }
    switch (currentStep) {
      case 0: {
        if (name) {
          if (name.trim().split(' ').length < 2)
            return toast.error(
              t('builder.questionnaire.validations.validName'),
            );

          if (name?.trim() == user.fullname?.trim() && user.confirmedName)
            return setCurrentStep(nextStep);
          setIsUpdatingData(true);
          const result = await updateUserName();
          setIsUpdatingData(false);
          result && setCurrentStep(nextStep);
        } else {
          toast.error(t('builder.questionnaire.validations.nameRequired'));
        }
        break;
      }
      case 1: {
        if (phone.trim()) {
          if (
            (phone == user.phone && confirmationResult != null) ||
            (phone == user.phone && user.isPhoneVerified)
          )
            return setCurrentStep(activeResume ? nextStep + 2 : nextStep + 1);
          try {
            const phoneUtil = libphonenumbers.PhoneNumberUtil.getInstance();
            const number = phoneUtil.parseAndKeepRawInput(
              phone,
              country.countryCode,
            );
            const isValid = phoneUtil.isValidNumber(number);
            if (isValid) {
              setIsUpdatingData(true);
              const result = await updateUserPhone();
              result && setCurrentStep(nextStep);
              setIsUpdatingData(false);
            } else {
              toast.error(t('builder.questionnaire.validations.invalidPhone'));
            }
          } catch (error) {
            toast.error(t('builder.questionnaire.validations.invalidPhone'));
          }
        } else {
          toast.error(t('builder.questionnaire.validations.phoneRequired'));
        }
        break;
      }
      case 4: {
        if (selectedJobTitles?.length >= 3) {
          setIsUpdatingData(true);
          const result = await updateUserJobTitles();
          if (result) {
            router.replace(`/app/builder/${activeResume.id}`);
            // emitter.emit(events.TEMPLATE_MODAL)
          }
          setIsUpdatingData(false);
        } else {
          toast.error(t('builder.questionnaire.validations.jobTitleRequired'));
        }
        break;
      }
      default: {
        setCurrentStep(nextStep);
      }
    }
  };

  const updateUserName = async () => {
    return updateProfile({
      fullname: name,
      confirmedName: true,
    });
  };

  const updateUserPhone = async () => {
    setCode('');
    const result = await updateProfile({
      phone,
    });
    if (!result) return false;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+${phone}`,
        window.recaptchaVerifier,
      );
      setConfirmationResult(confirmationResult);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateUserJobTitles = async () => {
    const newArr = selectedJobTitles.map((cur, index) => cur.name);
    return updateProfile({
      targetedJobTitles: newArr,
    });
  };

  const verifyPhone = async () => {
    if (code.length < 6)
      return toast.error(t('builder.questionnaire.validations.validCode'));
    try {
      const result = await confirmationResult.confirm(code);
      if (result.user) {
        const result = await updateProfile({
          isPhoneVerified: true,
        });
        if (result) {
          setIsPhoneVerified(true);
          setCurrentStep((prev) => prev + 1);
        }
      }
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        toast.error(t('builder.questionnaire.validations.incorrectCode'));
      } else if (error.code == 'auth/code-expired') {
        toast.error(t('builder.questionnaire.validations.expiredCode'));
      } else {
        toast.error(error + '');
      }
    }
  };

  const Hello = () => (
    <div className={styles.hello}>
      <h4 className={styles.username}>
        {`${t('builder.questionnaire.hello')} ${user.fullname}`.toUpperCase()}
      </h4>
      <span className={styles.wave}>
        <Image src="/images/wave.png" width="20px" height="20px" />
      </span>
    </div>
  );

  return (
    <>
      <Head>
        <title>
          {t('shared.appName')} - {t('shared.build')}
        </title>
        <link rel="canonical" href="https://cvitae.ai/" />
      </Head>
      <div className={styles.qustionnairecontainer}>
        <div id="recaptcha-container"></div>
        <div className={styles.card}>
          <Steps currentStep={currentStep == 2 ? 1 : currentStep} />
          <div
            style={{}}
            className={'flex flex-1 flex-col justify-between pt-10'}>
            {currentStep != 2 && <Hello />}
            {currentStep == 0 && (
              <NameStep name={name} setName={setName} t={t} />
            )}
            {(currentStep == 1 || currentStep == 2) && (
              <PhoneStep
                phone={phone}
                setPhone={setPhone}
                setCountry={setCountry}
                t={t}
                isVerifyMode={currentStep == 2}
                code={code}
                setCode={setCode}
                setCurrentStep={setCurrentStep}
                resendCode={updateUserPhone}
                isLoading={isUpdatingData}
              />
            )}
            {currentStep == 3 && (
              <ResumeStep
                setCurrentStep={setCurrentStep}
                t={t}
                setActiveResume={setActiveResume}
              />
            )}
            {currentStep == 4 && (
              <JobTitleStep
                t={t}
                setSelectedJobTitlesCallBack={setSelectedJobTitles}
              />
            )}
            {currentStep != 2 && (
              <Actions
                currentStep={currentStep}
                onNext={handleStepChange}
                isLoading={isUpdatingData}
                t={t}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Questionnaire);
