import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Amazon from '../../../assets/amazon.png';
import Spotify from '../../../assets/spotify.png';
import SpaceX from '../../../assets/spacex.png';
import Microsoft from '../../../assets/microsoft.png';
import Discord from '../../../assets/discord.png';
import Slack from '../../../assets/newslack.png';
import Netlify from '../../../assets/netflix.png';
import Wallmart from '../../../assets/wallmart.png';

const logos = [
  Amazon,
  Spotify,
  SpaceX,
  Netlify,
  Microsoft,
  Discord,
  Wallmart,
  Slack,
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2.5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CompanyLogosComp: React.FC = () => {
  return (
    <div className="mx-auto bg-[#030512] w-full py-[20px] px-4">
      <h2 className="text-center text-xl font-semibold mb-6 text-[#F8F9FF]">
        Our Users have gotten jobs from these notable companies
      </h2>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="p-4">
            <img src={logo} alt="Company Logo" className="mx-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyLogosComp;
