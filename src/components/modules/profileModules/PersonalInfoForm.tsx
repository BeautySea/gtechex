import React, { ChangeEvent, useEffect, useState } from 'react';
import BorderWrapper from '../../common/BorderWrapper';
import InputWithAvatar from '../../common/form/InputWithAvatar';
import {
  fileUpload,
  myAxiosWithAuthFetchWithPayload,
} from '../../../api/normalRequest';
import ENUM from '../../../service/enum';
import CustomSpin from '../../common/CustomSpin';
import CustomLabel from '../../common/Label';
import useAxios from '../../../api/hooks/useAxios';
import axios from '../../../api/baseAxios';
import SkeletonInput from 'antd/es/skeleton/Input';
import SkeletonImage from 'antd/es/skeleton/Image';
import toast, { Toaster } from 'react-hot-toast';
import CompleteCustomeLabel from '../../common/CompleteCustomeLabel';
import OrdinaryCustomLabel from '../../common/OrdinaryCustomLabel';

interface formData {
  firstName?: string;
  lastName?: string;
  email: string;
  picture: string;
}

const PersonalInfoForm = ({
  setIsUpdateloading,
  startChangePassword,
  isLoading,
  isUpdateLoading,
}: any) => {
  const [files, setFiles] = useState<any>();
  const token = localStorage.getItem('authToken') || '';
  const [initials, setInitials] = useState('');
  const [isInputClicked, setIsInputClicked] = useState(false);
  // const userDetails: UserDetails | undefined = getCookie('userDetails');
  const [userDatas, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_USER_DATA,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [userDetails, setUserDetails] = useState<any>({});
  const [formState, setFormState] = useState<formData>({
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [fileDets, setFileDets] = useState({
    name: '',
    size: '',
  });

  const handleInputChange = (e: any) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFiles(file);
      setFileDets({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
    } else {
      setFileDets({
        name: '',
        size: '',
      });
    }
  };

  useEffect(() => {
    setUserDetails(userDatas?.data);
  }, [userDatas]);

  useEffect(() => {
    setFormState({
      firstName: userDatas?.data?.firstName || '',
      lastName: userDatas?.data?.lastName || '',
      email: userDatas?.data?.email || '',
      picture: userDatas?.data?.picture || '',
    });
  }, [userDetails]);

  const setPayload = async () => {
    const res = await fileUpload(files, 'location');

    if (res?.error) {
      toast.error(res?.errorMessage);
      return;
    }

    if (res?.data) {
      const payload = {
        // email: formState.email,
        firstName: formState.firstName,
        lastName: formState.lastName,
        picture: res?.data.length
          ? res?.data[0]?.location
          : userDetails?.picture,
      };

      return payload;
    }
  };

  const handleUpdateUSerProfile = async (e: any) => {
    e.preventDefault();
    setIsUpdateloading(true);

    const payload = await setPayload();

    if (!payload) {
      setIsUpdateloading(false);
      return;
    }

    try {
      const method = 'PUT';
      const data = payload;
      const route = ENUM.UPDATE_USER_PROFILE;
      const resp = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        token,
        data,
      });
      if (resp?.status) {
        refreshFucntion();
        toast.success(resp?.message);
        // handleInputClickOut();
      }
    } catch (error) {
      setIsUpdateloading(false);
      // handleInputClickOut();
      if (error) {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsUpdateloading(false);
      handleInputClickOut();
    }
  };

  const fetchInitials = (firstName: string, lastName: string) => {
    const userInit =
      firstName.charAt(0).toLocaleUpperCase() +
      lastName.charAt(0).toLocaleUpperCase();

    setInitials(userInit);
  };

  useEffect(() => {
    if (userDetails?.firstName) {
      fetchInitials(userDetails?.firstName, userDetails?.lastName);
    }
  }, [userDetails, requestLoading]);
  // isInputClicked,
  const handleInputIsClick = () => {
    setIsInputClicked(true);
  };

  const handleInputClickOut = () => {
    setIsInputClicked(false);
  };

  return (
    <>
      <form className="w-full" onSubmit={handleUpdateUSerProfile}>
        <div className="mb-3">
          <BorderWrapper bg="#fff">
            <div className="flex flex-col">
              {/*  */}
              {requestLoading === true ? (
                <SkeletonImage active />
              ) : (
                <div
                  className={`w-[116px] h-[116px]  rounded-full mb-4 ${
                    files === undefined ? 'bg-[#D9D9D9]' : 'bg-none'
                  } relative`}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt=""
                      className="w-[116px] h-[116px] rounded-full"
                    />
                  ) : formState.picture === 'picture' ? (
                    <div className="flex items-center justify-center bg-[#131D26] px-[5px] py-[4.5px] rounded-full text-lg text-[#fff] font-bold w-full h-full">
                      {initials}
                    </div>
                  ) : (
                    <img
                      src={formState.picture}
                      alt="user profile"
                      className="w-[116px] h-[116px] rounded-full"
                    />
                  )}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    // accept=".png, .jpg, .jpeg"
                    // className="custom-file-input  w-[18px] h-[18px] rounded-full bg-[#F6D251] relative top-[-25px] left-[90px]"
                    accept=".png, .jpg, .jpeg"
                    className="custom-file-input w-[18px] h-[18px] rounded-full bg-[#F6D251] absolute top-20 left-24  cursor-pointer p-1"
                  />
                </div>
              )}

              <div className="flex flex-col gap-[4px]">
                {}
                <h3 className="text-[#131D26] text-sm font-semibold">
                  Profile Photo
                </h3>
                <span className="text-[#8D8E91] text-xs font-medium">
                  (PNG, JPG, JPEG, not more than 5MB)
                </span>
              </div>
            </div>
          </BorderWrapper>
        </div>
        {requestLoading === true ? (
          <BorderWrapper bg="#fff">
            <div className="flex items-center  gap-[20px]">
              <div className="mb-5 w-full lg:w-[50%]">
                <SkeletonInput active />
              </div>
              <div className="mb-5 w-full lg:w-[50%]">
                <SkeletonInput active />
              </div>
            </div>

            <div className="mb-5 w-full lg:w-[50%]">
              <SkeletonInput active />
            </div>
          </BorderWrapper>
        ) : (
          <BorderWrapper bg="#fff">
            <div className="flex items-center  gap-[20px]">
              <div className="mb-5 w-full lg:w-[50%]">
                <CustomLabel
                  htmlFor="firstName"
                  required={true}
                  text="First Name"
                  className="block mb-2 text-sm font-medium text-[#131D26]"
                />
                <InputWithAvatar
                  name="firstName"
                  value={formState.firstName}
                  changeHadler={handleInputChange}
                  otherHandler={handleInputIsClick}
                  // handleClickOut={handleInputClickOut}
                  placeholder="first name"
                  required={true}
                  type="text"
                  avatar={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.00008 10.1159C10.8925 10.1159 13.3334 10.5859 13.3334 12.3992C13.3334 14.2132 10.8765 14.6666 8.00008 14.6666C5.10833 14.6666 2.66675 14.1966 2.66675 12.3832C2.66675 10.5692 5.12367 10.1159 8.00008 10.1159ZM8.00008 1.33325C9.95948 1.33325 11.5294 2.9026 11.5294 4.86062C11.5294 6.81864 9.95948 8.38866 8.00008 8.38866C6.04135 8.38866 4.47076 6.81864 4.47076 4.86062C4.47076 2.9026 6.04135 1.33325 8.00008 1.33325Z"
                        fill="#C1C1C3"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="mb-5 w-full lg:w-[50%]">
                <CustomLabel
                  htmlFor="lastName"
                  required={true}
                  text="Last Name"
                  className="block mb-2 text-sm font-medium text-[#131D26]"
                />
                <InputWithAvatar
                  name="lastName"
                  placeholder="Last name"
                  value={formState.lastName}
                  changeHadler={handleInputChange}
                  otherHandler={handleInputIsClick}
                  // handleClickOut={handleInputClickOut}
                  required={true}
                  type="text"
                  avatar={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.00008 10.1159C10.8925 10.1159 13.3334 10.5859 13.3334 12.3992C13.3334 14.2132 10.8765 14.6666 8.00008 14.6666C5.10833 14.6666 2.66675 14.1966 2.66675 12.3832C2.66675 10.5692 5.12367 10.1159 8.00008 10.1159ZM8.00008 1.33325C9.95948 1.33325 11.5294 2.9026 11.5294 4.86062C11.5294 6.81864 9.95948 8.38866 8.00008 8.38866C6.04135 8.38866 4.47076 6.81864 4.47076 4.86062C4.47076 2.9026 6.04135 1.33325 8.00008 1.33325Z"
                        fill="#C1C1C3"
                      />
                    </svg>
                  }
                />
                {/* Email address */}
              </div>
            </div>

            <div className="mb-2 w-full lg:w-[50%]">
              <OrdinaryCustomLabel
                htmlFor="email"
                text="Email Address"
                className="block text-sm font-medium text-[#131D26]"
              />
              {/* <InputWithAvatar
                name="email"
                value={}
                placeholder="daniel.johnson@gmail.com"
                required={true}
                disable={true}
                type="email"
                avatar={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M11.2928 2C12.1868 2 13.0468 2.35333 13.6795 2.98733C14.3128 3.62 14.6668 4.47333 14.6668 5.36667V10.6333C14.6668 12.4933 13.1535 14 11.2928 14H4.70683C2.84616 14 1.3335 12.4933 1.3335 10.6333V5.36667C1.3335 3.50667 2.8395 2 4.70683 2H11.2928ZM12.0468 5.46667C11.9068 5.45933 11.7735 5.50667 11.6728 5.6L8.66683 8C8.28016 8.32067 7.72616 8.32067 7.3335 8L4.3335 5.6C4.12616 5.44667 3.8395 5.46667 3.66683 5.64667C3.48683 5.82667 3.46683 6.11333 3.6195 6.31333L3.70683 6.4L6.74016 8.76667C7.1135 9.06 7.56616 9.22 8.04016 9.22C8.51283 9.22 8.9735 9.06 9.34616 8.76667L12.3535 6.36L12.4068 6.30667C12.5662 6.11333 12.5662 5.83333 12.3995 5.64C12.3068 5.54067 12.1795 5.48 12.0468 5.46667Z"
                      fill="#C1C1C3"
                    />
                  </svg>
                }
              /> */}
              <span className="text-sm font-medium text-[#131d26]">
                {' '}
                {formState.email}
              </span>
            </div>
          </BorderWrapper>
        )}

        <div className="flex items-center justify-start gap-[12px] mt-[12px]">
          <button
            type="button"
            onClick={() =>
              userDetails ? startChangePassword(userDetails.email) : null
            }
            className="flex items-center text-[12px] text-[#131D26] font-medium bg-[#A8A8AB33] rounded-[4px] py-[8px] px-[12px] gap-[4px]"
          >
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M11.0833 5.83342H11.6667C11.9888 5.83342 12.25 6.09457 12.25 6.41675V12.2501C12.25 12.5723 11.9888 12.8334 11.6667 12.8334H2.33333C2.01117 12.8334 1.75 12.5723 1.75 12.2501V6.41675C1.75 6.09457 2.01117 5.83342 2.33333 5.83342H2.91667V5.25008C2.91667 2.99492 4.74484 1.16675 7 1.16675C9.25517 1.16675 11.0833 2.99492 11.0833 5.25008V5.83342ZM9.91667 5.83342V5.25008C9.91667 3.63925 8.61082 2.33341 7 2.33341C5.38917 2.33341 4.08333 3.63925 4.08333 5.25008V5.83342H9.91667ZM6.41667 8.16675V10.5001H7.58333V8.16675H6.41667Z"
                fill="#131D26"
              />
            </svg>{' '}
            Change Password {isLoading ? <CustomSpin /> : null}
          </button>
          {isInputClicked ? (
            <button
              type="submit"
              className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#219653] rounded-[4px] py-[8px] px-[12px]"
            >
              Save changes {isUpdateLoading ? <CustomSpin /> : null}
            </button>
          ) : (
            <button
              type="button"
              disabled={true}
              className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#21965380] rounded-[4px] py-[8px] px-[12px] cursor-not-allowed"
            >
              Save changes
            </button>
          )}
          {/* <button
            type="submit"
            className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#219653] rounded-[4px] py-[8px] px-[12px]"
          >
            Save changes {isUpdateLoading ? <CustomSpin /> : null}
          </button> */}
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default PersonalInfoForm;
