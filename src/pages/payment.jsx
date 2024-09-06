import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import PageSubTitle from '../components/layouts/PageSubTitle';
import ProfileFooter from '../components/modules/profileModules/ProfileFooter';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import ProfilePriceTitle from '../components/modules/profileModules/ProfilePriceTitle';
import CustomRadoiGroup from '../components/common/form/CustomRadoiGroup';
import StripePaymentForm from '../components/modules/paymentModules/stripeForm/StripePaymentForm';

const standardPlan = [
  'Enjoy 10 applications per day',
  'Apply on all platforms',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
];

const premiumPlan = [
  'Enjoy 20 applications per day',
  'Apply on all platforms',
  'Create unlimited custom CVs',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
  'Add extra user and enjoy all benefits',
];

const PaymentPage = () => {
  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
  const [planType, setPlanType] = useState('standard');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => {
        console.log('stripe response', res);
        res.json();
      })
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto">
          <PageSubTitle
            title={`Subscribe to ${planType}`}
            subTitle="Fill the information below to subscribe"
            needRoute={true}
            routeTo="account?tab=Manage Subscription"
          />
          <InnerLayoutWrapper>
            <div className="flex gap-[20px] pb-[40px]">
              <div className="flex flex-col gap-[20px]  max-w-[367px]">
                {planType === 'standard' ? (
                  <div className="bg-[#fff] border border-[#E5E6EC] rounded-[4px] w-full h-auto">
                    <ProfilePriceTitle
                      className="py-[12px]"
                      title="Standard Plan"
                      yearlyPrice="$2,700.00"
                      price="$3,000.00"
                      //   togledPlan={togledPlan}
                    />

                    <div className="flex flex-col justify-between p-3">
                      <div className="flex flex-col gap-[8px] mb-5 min-h-[209px]">
                        {standardPlan.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-start gap-[4px]"
                          >
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="20"
                                height="20"
                                rx="10"
                                fill="#131D26"
                                fill-opacity="0.12"
                              />
                              <rect
                                x="0.5"
                                y="1"
                                width="19"
                                height="19"
                                rx="9.5"
                                stroke="#E7E7E7"
                                stroke-opacity="0.08"
                              />
                              <path
                                d="M7.99977 13.7801L5.68644 11.4667C5.56179 11.3421 5.39272 11.272 5.21644 11.272C5.04015 11.272 4.87109 11.3421 4.74644 11.4667C4.62179 11.5914 4.55176 11.7604 4.55176 11.9367C4.55176 12.024 4.56895 12.1104 4.60235 12.1911C4.63576 12.2717 4.68472 12.345 4.74644 12.4067L7.53311 15.1934C7.79311 15.4534 8.2131 15.4534 8.4731 15.1934L15.5264 8.14005C15.6511 8.0154 15.7211 7.84634 15.7211 7.67005C15.7211 7.49377 15.6511 7.3247 15.5264 7.20005C15.4018 7.0754 15.2327 7.00537 15.0564 7.00537C14.8802 7.00537 14.7111 7.0754 14.5864 7.20005L7.99977 13.7801Z"
                                fill="#131D26"
                              />
                            </svg>
                            <span className="text-xs lg:text-sm  text-[#28292A] font-medium">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#fff] border border-[#E5E6EC] rounded-[4px] w-full h-auto ">
                    <ProfilePriceTitle
                      className="py-[12px]"
                      title="Premium Plan"
                      price="$5,000.00"
                      yearlyPrice="$4,700.00"
                      //   togledPlan={togledPlan}
                    />

                    <div className="flex flex-col justify-between p-3 ">
                      <div className="flex flex-col gap-[8px] mb-5 min-h-[209px]">
                        {premiumPlan.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-start gap-[4px]"
                          >
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="20"
                                height="20"
                                rx="10"
                                fill="#131D26"
                                fill-opacity="0.12"
                              />
                              <rect
                                x="0.5"
                                y="1"
                                width="19"
                                height="19"
                                rx="9.5"
                                stroke="#E7E7E7"
                                stroke-opacity="0.08"
                              />
                              <path
                                d="M7.99977 13.7801L5.68644 11.4667C5.56179 11.3421 5.39272 11.272 5.21644 11.272C5.04015 11.272 4.87109 11.3421 4.74644 11.4667C4.62179 11.5914 4.55176 11.7604 4.55176 11.9367C4.55176 12.024 4.56895 12.1104 4.60235 12.1911C4.63576 12.2717 4.68472 12.345 4.74644 12.4067L7.53311 15.1934C7.79311 15.4534 8.2131 15.4534 8.4731 15.1934L15.5264 8.14005C15.6511 8.0154 15.7211 7.84634 15.7211 7.67005C15.7211 7.49377 15.6511 7.3247 15.5264 7.20005C15.4018 7.0754 15.2327 7.00537 15.0564 7.00537C14.8802 7.00537 14.7111 7.0754 14.5864 7.20005L7.99977 13.7801Z"
                                fill="#131D26"
                              />
                            </svg>
                            <span className="text-xs lg:text-sm text-[#28292A] font-medium">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-[#FFFFFF] p-[12px] flex flex-col gap-[12px] rounded border border-[#E5E6EC] w-full">
                  <div className="flex flex-col gap-[4px]">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[#414343] text-xs font-normal">
                        Plan Amount (Without Tax):
                      </p>
                      <h3 className="text-sm text-[#131D26] font-semibold">
                        $2,800.00
                      </h3>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[#414343] text-xs font-normal">VAT:</p>
                      <h3 className="text-sm text-[#131D26] font-semibold">
                        $200.00
                      </h3>
                    </div>
                  </div>
                  <div className="border-t border-[#131d2633] py-[12px]">
                    <div className="flex items-center justify-between rounded bg-[#C1C2C333] p-[12px]">
                      <p className="text-[#414343] text-xs font-normal">
                        Grand Total:
                      </p>
                      <h3 className="text-base text-[#219653] font-semibold">
                        $3,000.00
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-[20px] border border-[#E5E6EC] rounded-[8px]  bg-[#fff] h-auto w-[754px]">
                <div className="p-[12px] border border-[#E5E6EC] rounded-[8px]  h-auto flex flex-col gap-[32px]">
                  <div className="flex flex-col items-start max-w-[440px]">
                    <h2 className="inline-block text-[#131D26] text-base font-semibold">
                      Billing Information
                    </h2>
                    <p className="inline-block text-[#414343] text-xs font-medium">
                      Choose how you want to pay
                    </p>
                  </div>
                  {/* plan type */}
                  <div className="pt-[28px] px-[12px] pb-[12px] border border-[#E5E6EC] rounded relative">
                    <div className="py-[4px] px-[8px] bg-[#EEEEEE] rounded flex items-center justify-center w-fit absolute top-[-12px]">
                      <span className="text-xs text-[#131D26] font-semibold">
                        Plan Type
                      </span>
                    </div>
                    <CustomRadoiGroup options={['monthly', 'yearly']} />
                  </div>
                  {/* transaction type */}
                  <div className="pt-[28px] px-[12px] pb-[12px] border border-[#E5E6EC] rounded relative">
                    <div className="py-[4px] px-[8px] bg-[#EEEEEE] rounded flex items-center justify-center w-fit absolute top-[-12px]">
                      <span className="text-xs text-[#131D26] font-semibold">
                        Preferred Transaction Type
                      </span>
                    </div>
                    <CustomRadoiGroup
                      options={['Recurring', 'One-Time Payment']}
                    />
                  </div>
                  {/* payment */}
                  <div className="pt-[28px] px-[12px] pb-[12px] border border-[#E5E6EC] rounded relative">
                    <div className="py-[4px] px-[8px] bg-[#EEEEEE] rounded flex items-center justify-center w-fit absolute top-[-12px]">
                      <span className="text-xs text-[#131D26] font-semibold">
                        Payment
                      </span>
                    </div>
                    {clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <StripePaymentForm />
                      </Elements>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </InnerLayoutWrapper>
          <ProfileFooter />
        </div>
      </Layoutwrapper>
    </>
  );
};

export default PaymentPage;
