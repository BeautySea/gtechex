import { ReactElement, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/layout';
import Overview from './pages/overview';
import ResumeTemplatePage from './pages/resumeTemplate';
import CreateResumePage from './components/pages/resumes/createResume/createResume';
import Joblist from './pages/joblist';
import ApplyForJobs from './pages/apply';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import Demo from './components/pages/demo/demo';
import RegisterPage from './pages/register';
import ConfirmResume from './pages/confirmResume';

import HomePage from './pages/home';
import ChangeUserpassword from './pages/changepassword';
import ResetPasswordOTP from './pages/resetPasswordOTP';
import OverviewApply from './components/pages/overview/overviewApply';
import Jobsfound from './components/pages/overview/jobsfound';
import Pricing from './pages/pricing';
import ResumesList from './components/pages/resumes/resumesList/resumesList';
import Socreresume from './pages/socreresume';
import Newscoreresume from './pages/newscoreresume';
import Paymentsuccess from './pages/paymentsuccess';
import Paymentfailure from './pages/paymentfailure';
import Cardinfopdate from './pages/cardinfopdate';
import Tailorresume from './pages/tailorresume';
import Analysis from './components/pages/aiscoreresume/analysis';
import Airesumebuilder from './pages/airesumebuilder';
import TailoredResumePage from './components/pages/tailoreResume/TailoredResumePage';
// import PaymentPage from './pages/';

export interface ResumeData {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string | null;
    personal_website: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string | null;
    gpa: number | null;
  }>;
  work_experience: Array<{
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    responsibilities: string[];
  }>;
  skills: Array<{
    name: string;
    proficiency_level: string | null;
    years_of_experience: number;
  }>;
  certifications: null;
  references: null;
}

const PrivateRoute = ({ element }: { element: ReactElement }) => {
  // const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('authToken');

  return token ? element : <Navigate to="/login" />;
};

const AuthenticatedRoute = ({ element }: { element: ReactElement }) => {
  // const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('authToken');

  // useEffect(() => {

  // }, [isAuthenticated]);

  return token ? <Navigate to="/overview" /> : element;
};

const Parent = ({ children }: { children: ReactElement }) => {
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route
          path="/login"
          element={<AuthenticatedRoute element={<LoginPage />} />}
        />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route
          path="/register"
          element={<AuthenticatedRoute element={<RegisterPage />} />}
        />
        <Route
          path="/"
          element={
            // <Parent>
            <HomePage />
            // </Parent>
          }
        />
        {/* /home */}
        <Route
          path="/home"
          element={
            // <Parent>
            <HomePage />
            // </Parent>
          }
        />
        {/*  */}
        <Route
          path="/overview"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Overview />
                </Parent>
              }
            />
          }
        />
        {/*  */}
        {/* resume-analysis */}
        <Route
          path="/ai-score-resume"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Socreresume />
                </Parent>
              }
            />
          }
        />
        <Route
          path="/resume-analysis"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Analysis />
                </Parent>
              }
            />
          }
        />

        {/*  */}
        <Route
          path="/tailor-resume"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Tailorresume />
                </Parent>
              }
            />
          }
        />
        <Route
          path="/tailored-resume"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <TailoredResumePage />
                </Parent>
              }
            />
          }
        />
        <Route
          path="/ai-resume-builder"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Airesumebuilder />
                </Parent>
              }
            />
          }
        />
        {/* <Route
          path="/resume-score"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Newscoreresume />
                </Parent>
              }
            />
          }
        /> */}
        {/*  */}
        <Route
          path="/pricing"
          element={
            // <Parent>
            <Pricing />
            // </Parent>
          }
        />
        {/* Paymentfailure */}
        <Route
          path="/payment-success"
          element={
            <Parent>
              <Paymentsuccess />
            </Parent>
          }
        />
        {/*  */}
        <Route
          path="/card-success"
          element={
            <Parent>
              <Cardinfopdate />
            </Parent>
          }
        />
        <Route
          path="/payment-failed"
          element={
            <Parent>
              <Paymentfailure />
            </Parent>
          }
        />

        <Route
          path="/jobs-applied"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Joblist />
                </Parent>
              }
            />
          }
        />
        {/*  */}
        <Route
          path="/jobs-apply"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <ApplyForJobs />
                </Parent>
              }
            />
          }
        />
        {/* overview job application link */}
        <Route
          path="/apply"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <OverviewApply />
                </Parent>
              }
            />
          }
        />
        {/*  */}
        <Route
          path="/jobs-found"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <Jobsfound />
                </Parent>
              }
            />
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <ProfilePage />
                </Parent>
              }
            />
          }
        />

        <Route
          path="/otp"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <ResetPasswordOTP />
                </Parent>
              }
            />
          }
        />

        <Route
          path="/change-password"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <ChangeUserpassword />
                </Parent>
              }
            />
          }
        />
        <Route
          path="/resumes/templates/:templateId"
          element={
            <Parent>
              <ResumeTemplatePage />
            </Parent>
          }
        />
        {/*  */}
        {/* <Route
          path="/payment"
          element={
            <PrivateRoute
              element={
                <Parent>
                  <PaymentPage />
                </Parent>
              }
            />
          }
        /> */}
        <Route
          path="/resumes"
          element={
            <Parent>
              <ResumesList />
            </Parent>
          }
        />
        <Route
          path="/resumes/create"
          element={
            <Parent>
              <CreateResumePage />
            </Parent>
          }
        />
        <Route
          path="/resumes/confirm"
          element={
            <Parent>
              <ConfirmResume />
            </Parent>
          }
        />
        <Route
          path="/demo"
          element={
            <Parent>
              <Demo />
            </Parent>
          }
        />
      </Routes>
      {/* </Layout> */}
    </>
  );
}

export default App;
