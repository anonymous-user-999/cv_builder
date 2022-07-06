export interface ResumeModel {
  awards: ResumeSection;
  certifications: ResumeSection;
  education: ResumeSection;
  hobbies: ResumeSection;
  languages: ResumeSection;
  metadata: {
    colors: ResumeColors;
    font: string;
    fontSize: string;
    language: string;
    layout: {
      castform: any[];
      celebi: any[];
      gengar: any[];
      glalie: any[];
      onyx: any[];
      pikachu: any[];
      createdAt: string;
      updatedAt: string;
      id: string;
    };
    template: string;
    resumeId: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  name: string;
  objective: ResumeSection;
  preview: string;
  profile: {
    address: {
      city: '';
      line1: '';
      line2: '';
      pincode: '';
    };
    birthDate: '1996-05-21';
    email: '';
    firstName: '';
    heading: 'Resume.Headings.Profile';
    lastName: '';
    phone: '';
    photograph: 'https://firebasestorage.googleapis.com/v0/b/memeslibrary-d8cff.appspot.com/o/users%2FaxMejT3NLDSlT9h8kJtIWzVssZG2%2Fphotographs%2Fe6mqpm?alt=media&token=1b02fc54-c8e0-4eaf-9dd2-53bb21f0ec20';
    subtitle: '';
    website: '';
    resumeId: '61b21c18d64df6c5f82508c9';
    createdAt: '2021-12-09T15:09:12.852Z';
    updatedAt: '2021-12-09T15:09:12.852Z';
    id: '61b21c18d64df6c5f82508dc';
  };
  projects: ResumeSection;
  references: ResumeSection;
  skills: ResumeSection;
  social: ResumeSection;
  user: string;
  work: ResumeSection;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ResumeSection {
  heading: string;
  items: [];
  resumeId: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ResumeColors {
  background: string;
  primary: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
