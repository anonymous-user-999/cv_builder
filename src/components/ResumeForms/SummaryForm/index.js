import React, {useState} from 'react';
import Textarea from '../Textarea';
import styles from './styles.module.css';

const SummaryForm = (props) => {
  const {education, setEducation} = props;

  const onSubmitForm = () => {};

  console.log('education', education);

  return (
    <div className={styles.main}>
      <div className={styles.headerPara}>
        Hello Dear Mus'ab, Write 2-4 short & energetic sentences to interest the
        reader! Mention your role, experience & most importantly - your biggest
        achievements, best qualities, and skills.
      </div>

      <form onSubmit={onSubmitForm}>
        <Textarea label="Professional Summary" smartTailor />
        <div className="flex items-center justify-between mt-4">
          <div className={styles.textareaBottomText}>
            Recruiter Tip: Write 80- Characters To Increase Interview Chances.
          </div>
          <div className="flex ">
            <div className={styles.textLength}>0 / 80</div>
            <img
              className={styles.textareaEmoji}
              src="/images/innocent.png"
              alt="emoji"
            />
          </div>
        </div>
        <div className="flex justify-end" style={{marginTop: '20vh'}}>
          <button className={`${styles.btn} ${styles.nextBtn}`}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default SummaryForm;
