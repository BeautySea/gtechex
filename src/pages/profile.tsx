import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import PersonalInfoForm from '../components/modules/profileModules/PersonalInfoForm';
import DeletProfileModal from '../components/modules/profileModules/DeletProfileModal';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import BorderWrapper from '../components/common/BorderWrapper';
import DeleteAccountComp from '../components/modules/profileModules/DeleteAccountComp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountManagementTab from '../components/modules/profileModules/AccountManagementTab';
import CancelSubModal from '../components/modules/profileModules/CancelSubModal';
import EditPaymentMethodModal from '../components/modules/profileModules/EditPaymentMethodModal';
import ChangePaymentMethodModal from '../components/modules/profileModules/ChangePaymentMethodModal';
import TransactionHistoryTable from '../components/modules/profileModules/TransactionHistoryTable';
import PageSubTitle from '../components/layouts/PageSubTitle';
import ManageSubscription from '../components/modules/profileModules/ManageSubscription';
import ProfileFooter from '../components/modules/profileModules/ProfileFooter';

// interface UserDetails {
//   email: string;
//   id: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   picture: string;
// }
const ProfilePage = () => {
  // const userDetails: UserDetails | undefined = getCookie('userDetails');
  const token = localStorage.getItem('authToken') || '';
  const [searchParams] = useSearchParams();
  const pagetoRender = searchParams.get('tab') || 'Profile';
  // const [pagetoRender, setPageToRender] = useState('Profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateloading] = useState(false);
  const [editPaymentMethod, setEditPaymentMethod] = useState(false);
  const [changePaymentMethod, setChangePaymentMethod] = useState(false);
  const [cancelSub, setCancelSub] = useState(false);
  const navigate = useNavigate();
  const [deleteProfile, setDeleteProfile] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteProfile(!deleteProfile);
  };

  const toggleChangePaymentModal = () => {
    setChangePaymentMethod(!changePaymentMethod);
  };
  const toggleEditPaymentMethod = () => {
    setEditPaymentMethod(!editPaymentMethod);
  };

  const toggleCancelSubModal = () => {
    setCancelSub(!cancelSub);
  };

  // const startChangePassword = useCallback(async (email: string) => {
  //   const method = 'POST';
  //   const route = '/users/initiate-password-reset';
  //   const data = {
  //     email: email,
  //   };
  //   setIsLoading(true);
  //   try {
  //     const response = await myAxiosNoAuthFetchWithPayload({
  //       method,
  //       route,
  //       data,
  //     });
  //     if (response?.status === true) {
  //       setIsLoading(false);
  //       navigate('/otp', { state: { data: userDetails?.email } });
  //     }
  //   } catch (error: any) {
  //     // /jobs-apply
  //     setIsLoading(false);
  //     if (error?.name === 'AxiosError') {
  //       showToastErrorMessage(error?.message);
  //     }
  //   }
  // }, []);

  const startChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto">
          {/* top bar */}
          <PageSubTitle
            title="Account"
            subTitle="Manage your profile, subscription, and transaction history here"
            needRoute={false}
          />
          {/* content container */}
          <InnerLayoutWrapper>
            {/* <RerferAndEarnComp /> */}
            <AccountManagementTab
              pagetoRender={pagetoRender}
              // setPageToRender={setPageToRender}
            />
          </InnerLayoutWrapper>
          {pagetoRender === 'Profile' && (
            <InnerLayoutWrapper>
              <BorderWrapper bg="#fff">
                <div className="flex flex-col items-start w-full">
                  <PersonalInfoForm
                    setIsUpdateloading={setIsUpdateloading}
                    isLoading={isLoading}
                    isUpdateLoading={isUpdateLoading}
                    startChangePassword={startChangePassword}
                  />
                </div>
              </BorderWrapper>
              <div className="mt-5">
                <BorderWrapper bg="#fff">
                  <DeleteAccountComp toggleDeleteModal={toggleDeleteModal} />
                </BorderWrapper>
              </div>
            </InnerLayoutWrapper>
          )}
          {pagetoRender === 'Manage Subscription' && (
            <ManageSubscription
              toggleEditPaymentMethod={toggleEditPaymentMethod}
              toggleChangePaymentModal={toggleChangePaymentModal}
              toggleCancelSubModal={toggleCancelSubModal}
              token={token}
            />
          )}
          {pagetoRender === 'Transaction History' && (
            <InnerLayoutWrapper>
              <h3 className="text-base text-[#131D26] font-semibold">
                Transaction History
              </h3>
              <TransactionHistoryTable />
            </InnerLayoutWrapper>
          )}
          {/* <InnerLayoutWrapper>
            <AccountManagementTab
              pagetoRender={pagetoRender}
              setPageToRender={setPageToRender}
            />
            <BorderWrapper bg="#fff">
              <div className="flex flex-col items-start w-full">
                <PersonalInfoForm
                  setIsUpdateloading={setIsUpdateloading}
                  isLoading={isLoading}
                  isUpdateLoading={isUpdateLoading}
                  startChangePassword={startChangePassword}
                />
              </div>
            </BorderWrapper>
            <div className="mt-5">
              <BorderWrapper bg="#fff">
                <DeleteAccountComp toggleDeleteModal={toggleDeleteModal} />
              </BorderWrapper>
            </div>
          </InnerLayoutWrapper> */}
          <ProfileFooter />
        </div>
      </Layoutwrapper>
      {deleteProfile && <DeletProfileModal toggleModal={toggleDeleteModal} />}
      {cancelSub ? <CancelSubModal toggleModal={toggleCancelSubModal} /> : null}
      {editPaymentMethod ? (
        <EditPaymentMethodModal toggleModal={toggleEditPaymentMethod} />
      ) : null}
      {changePaymentMethod ? (
        <ChangePaymentMethodModal toggleModal={toggleChangePaymentModal} />
      ) : null}
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
