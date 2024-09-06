import { useState } from 'react';
import BorderWrapper from '../../common/BorderWrapper';
import CustomLabel from '../../common/Label';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import OrdinaryCustomLabel from '../../common/OrdinaryCustomLabel';
import CustomRadoiGroup from '../../common/form/CustomRadoiGroup';
import { otherFormData } from '../../pages/resumes/resumesList/resumesList';
import Spinner from '../../common/spinner/Spinner';

interface upgradeProps {
  toggleModal: () => void;
  handleToggleSuccessModal: () => void;
  otherFomrSTate: otherFormData;
  setOtherFomrSTate: React.Dispatch<React.SetStateAction<otherFormData>>;
  setSponsorshipForEmploymentVisa: React.Dispatch<React.SetStateAction<string>>;
  setActiveSecurityClearance: any;
  handleSubmitResumeData: any;
  isLoading: boolean;
}

interface formData {
  featureTitle?: string;
  featureDiscription?: string;
}
const OtherFormsModal = ({
  toggleModal,
  handleToggleSuccessModal,
  otherFomrSTate,
  setOtherFomrSTate,
  setSponsorshipForEmploymentVisa,
  setActiveSecurityClearance,
  handleSubmitResumeData,
  isLoading,
}: upgradeProps) => {
  const [formToRender, setFormToRender] = useState(1);
  const [formState, setFormState] = useState<formData>({
    featureTitle: '',
    featureDiscription: '',
  });

  const handleChange = (e: any) => {
    setOtherFomrSTate((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    setFormToRender(2);
  };

  //   const handleApply = () => {};
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      <div className="relative  w-full max-w-lg max-h-full mx-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="relative bg-white rounded-lg shadow px-4 py-2">
            <div className="w-full flex items-center justify-between pl-4">
              <div>
                <h3 className="text-base text-[#131D26] font-semibold">
                  Fill the Information below
                </h3>
                <p className="text-xs text-[#EB5757] font-medium leading-4">
                  Our AI needs the information below to apply to jobs, please
                  fill accurately
                </p>
              </div>
              <button
                type="button"
                onClick={toggleModal}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {formToRender === 1 ? (
              <div className="p-4 md:p-5">
                <BorderWrapper bg="#fff">
                  <form className="w-full mx-auto">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center justify-between gap-[8px]">
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="workExperience"
                            required={true}
                            text="Total Working Experience"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <input
                            type="text"
                            id="workExperience"
                            name="workExperience"
                            value={otherFomrSTate.workExperience}
                            onChange={handleChange}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="veteranStatus"
                            required={true}
                            text="Veteran Status"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <select
                            name="veteranStatus"
                            value={otherFomrSTate.veteranStatus}
                            onChange={handleChange}
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          >
                            <option>Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Prefer not to Answer">
                              Prefer not to Answer
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[8px]">
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="disability"
                            required={true}
                            text="Disability"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <select
                            name="disability"
                            value={otherFomrSTate.disability}
                            onChange={handleChange}
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          >
                            <option>Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Do not wish to disclouse">
                              Do not wish to disclouse
                            </option>
                          </select>
                        </div>
                        <div className=" w-1/2">
                          <CustomLabel
                            htmlFor="willingToRelocate"
                            required={true}
                            text="Willing to relocate"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <select
                            name="willingToRelocate"
                            value={otherFomrSTate.willingToRelocate}
                            onChange={handleChange}
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          >
                            <option>Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-2 w-full">
                        <CustomLabel
                          htmlFor="raceEthnicity"
                          required={true}
                          text="Race/Ethnicity"
                          className="block mb-1 text-xs font-medium text-gray-900 "
                        />
                        <select
                          name="raceEthnicity"
                          value={otherFomrSTate.raceEthnicity}
                          onChange={handleChange}
                          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                        >
                          <option>Select an Answer</option>
                          <option value="Black or African American">
                            Black or African American
                          </option>
                          <option value="Asian or Pacific Islander">
                            Asian or Pacific Islander
                          </option>
                          <option value="Hispanic or Latino">
                            Hispanic or Latino
                          </option>
                          <option value="Native American or Alaska Native">
                            Native American or Alaska Native
                          </option>
                          <option value="White or Caucasian">
                            White or Caucasian
                          </option>
                          <option value="Multiracial or Biracial">
                            Multiracial or Biracial
                          </option>
                          <option value="A race/ethnicity not listed here">
                            A race/ethnicity not listed here
                          </option>
                          <option value="Prefer not to Answer">
                            Prefer not to Answer
                          </option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between gap-[8px]">
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="expectedSalary"
                            required={true}
                            text="Expected Salary"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <input
                            type="text"
                            id="expectedSalary"
                            name="expectedSalary"
                            value={otherFomrSTate.expectedSalary}
                            onChange={handleChange}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="expectedSalaryCurrency"
                            required={true}
                            text="Currency"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <select
                            name="expectedSalaryCurrency"
                            value={otherFomrSTate.expectedSalaryCurrency}
                            onChange={handleChange}
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          >
                            <option>Select an option</option>
                            <option value="USD">
                              USD - United State Dollar
                            </option>
                            <option value="GBP">
                              GBP - Great Britain Pounds
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[8px]">
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="currentSalary"
                            required={false}
                            text="Current Salary"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <input
                            type="text"
                            id="currentSalary"
                            name="currentSalary"
                            value={otherFomrSTate.currentSalary}
                            onChange={handleChange}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="currentSalaryCurrency"
                            required={false}
                            text="Currency"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <select
                            name="currentSalaryCurrency"
                            value={otherFomrSTate.currentSalaryCurrency}
                            onChange={handleChange}
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          >
                            <option>Select an option</option>
                            <option value="USD">
                              USD - United State Dollar
                            </option>
                            <option value="GBP">
                              GBP - Great Britain Pounds
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </BorderWrapper>
                <div className="flex items-center gap-[12px]">
                  <ButtonRounded
                    onClick={handleNext}
                    type="submit"
                    className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]"
                    text="Next"
                  />
                  <ButtonRounded
                    type="button"
                    className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#A8A8AB33] py-[8px] px-[12px] text-[12px] text-[#131D26] font-medium my-[8px]"
                    text="No, Cancel"
                    onClick={toggleModal}
                  />
                </div>
              </div>
            ) : (
              // second form

              <div className="py-4 px-2 md:py-5 md:px-3">
                <BorderWrapper bg="#fff">
                  <form
                    className="w-full mx-auto"
                    onSubmit={handleSubmitResumeData}
                  >
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center justify-between gap-[8px]">
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="noticePeriod"
                            required={false}
                            text="Notice Period (in Days)"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <input
                            type="text"
                            id="noticePeriod"
                            name="noticePeriod"
                            value={otherFomrSTate.noticePeriod}
                            onChange={handleChange}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                            placeholder=""
                          />
                        </div>
                        <div className="w-1/2">
                          <CustomLabel
                            htmlFor="expectedDateOfJoining"
                            required={true}
                            text="Expected date of joining"
                            className="block mb-1 text-xs font-medium text-gray-900 "
                          />
                          <input
                            type="date"
                            id="expectedDateOfJoining"
                            name="expectedDateOfJoining"
                            value={otherFomrSTate.expectedDateOfJoining}
                            onChange={handleChange}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                            placeholder="dd/mm/yy"
                            required
                          />
                        </div>
                      </div>
                      {/*  */}
                      {/* <div className="w-full">
                        <CustomLabel
                          htmlFor="expectedDateOfJoining"
                          required={true}
                          text="Expected date of joining"
                          className="block mb-1 text-xs font-medium text-gray-900 "
                        />
                        <input
                          type="date"
                          id="expectedDateOfJoining"
                          name="expectedDateOfJoining"
                          value={otherFomrSTate.expectedDateOfJoining}
                          onChange={handleChange}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          placeholder="What is the name of the feature?"
                          required
                        />
                      </div> */}
                      <div className="w-full">
                        <CustomLabel
                          htmlFor="sponsorshipForEmploymentVisa"
                          required={true}
                          text="Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)?"
                          className="block mb-1 text-xs font-medium text-gray-900 "
                        />
                        <CustomRadoiGroup
                          options={['Yes', 'No']}
                          setRemoteJob={setSponsorshipForEmploymentVisa}
                        />
                      </div>
                      <div className="w-full">
                        <CustomLabel
                          htmlFor="activeSecurityClearance"
                          required={false}
                          text="Do you have an active security clearance?"
                          className="block mb-1 text-xs font-medium text-gray-900 "
                        />
                        <CustomRadoiGroup
                          options={['Yes', 'No', 'Not Applicable']}
                          setRemoteJob={setActiveSecurityClearance}
                        />
                      </div>
                      <div className="w-full">
                        <CustomLabel
                          htmlFor="countriesAuthorisedToWork"
                          required={true}
                          text="Countries you are authorised to work? (separate by comma “,”)"
                          className="block mb-1 text-xs font-medium text-gray-900 "
                        />
                        <input
                          type="text"
                          id="countriesAuthorisedToWork"
                          name="countriesAuthorisedToWork"
                          value={otherFomrSTate.countriesAuthorisedToWork}
                          onChange={handleChange}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className="w-full">
                        <CustomLabel
                          htmlFor="coverLetter"
                          required={true}
                          text="Cover Letter"
                          className="block mb-1 text-xs font-medium text-gray-900 "
                        />
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={otherFomrSTate.coverLetter}
                          // rows={5}
                          // cols={40}
                          onChange={handleChange}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4"
                        />
                      </div>
                    </div>
                  </form>
                </BorderWrapper>
                <div className="flex items-center gap-[12px]">
                  <ButtonRounded
                    type="submit"
                    onClick={handleSubmitResumeData}
                    isLoading={isLoading}
                    className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#131D26] py-[8px] px-[12px] text-[12px] text-[#F6D155] font-medium my-[8px]"
                    text="Finish"
                  />
                  <ButtonRounded
                    type="button"
                    className="w-auto flex items-center justify-center border-0 rounded-[4px] bg-[#A8A8AB33] py-[8px] px-[12px] text-[12px] text-[#131D26] font-medium my-[8px]"
                    text="No, Cancel"
                    onClick={toggleModal}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherFormsModal;
