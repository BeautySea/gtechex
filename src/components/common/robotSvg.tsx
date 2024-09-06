import { SVGProps, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const RobotSvgComp = (props?: SVGProps<SVGSVGElement>) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const svgHeight = useMotionValue(0);
  const viewBoxHeight = useMotionValue(0);

  useEffect(() => {
    if (svgRef.current) {
      const height = svgRef.current.getBoundingClientRect().height;
      svgHeight.set(height);
      updateViewBoxHeight(height); // Update viewBoxHeight on component mount
    }
  }, []);

  // Update viewBoxHeight whenever svgHeight or movement range changes
  useEffect(() => {
    updateViewBoxHeight(svgHeight.get());
  }, [svgHeight]);

  const updateViewBoxHeight = (height: number) => {
    // Calculate viewBoxHeight to include additional space for movement range
    const viewBoxHeightValue = height + Math.abs(height / 10) * 2;
    viewBoxHeight.set(viewBoxHeightValue);
  };

  return (
    <svg
      width={358}
      height={503}
      viewBox="0 0 358 603"
      // viewBox={`0 0 358 ${viewBoxHeight.get()}`}
      fill="none"
      // ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Component 1" transform="translate(0 50)">
        <motion.g
          id="robot"
          animate={{ y: [-20, 0, -20] }}
          // animate={{ y: [-svgHeight.get() / 20, 0, -svgHeight.get() / 20] }}
          transition={{
            times: [0, 1],
            duration: 2,
            repeat: Infinity,
            type: 'keyframes',
            ease: 'easeInOut',
          }}
        >
          <path
            id="Vector"
            d="M106.337 262.325C97.6945 314.678 58.2362 356.906 41.0186 373.11C22.3296 390.697 2.15141 387.727 0.264893 352.094C-1.18898 324.586 3.43674 293.272 12.4845 265.281C20.4154 240.746 33.8222 217.42 52.8332 202.515C57.5948 198.78 63.1436 196.529 68.8837 195.908C83.5432 194.329 97.1814 203.706 102.363 218.957C106.969 232.517 108.732 247.841 106.34 262.325H106.337Z"
            fill="url(#paint0_linear_835_15750)"
          />
          <path
            id="Vector_2"
            d="M251.664 262.325C254.607 280.158 261.127 296.816 269.126 311.673C269.888 313.092 270.665 314.491 271.455 315.877C286.658 342.568 306.189 362.953 316.983 373.11C335.669 390.7 355.85 387.725 357.739 352.094C359.193 324.586 354.565 293.272 345.519 265.281C345.18 264.227 344.828 263.174 344.465 262.124C343.864 260.374 343.233 258.626 342.571 256.893C334.439 235.502 321.998 215.71 305.171 202.515C300.411 198.783 294.863 196.529 289.123 195.908C274.461 194.329 260.825 203.706 255.643 218.957C251.038 232.517 249.274 247.843 251.666 262.325H251.664Z"
            fill="url(#paint1_linear_835_15750)"
          />
          <path
            id="Vector_3"
            opacity={0.1}
            d="M269.127 311.673C269.889 313.092 270.666 314.491 271.456 315.877C300.264 305.251 324.698 287.268 344.464 262.122C343.863 260.372 343.231 258.624 342.57 256.891C331.595 271.296 319.069 283.426 305.187 293.077C294.139 300.754 282.083 306.968 269.127 311.673Z"
            fill="#131E2E"
          />
          <path
            id="Vector_4"
            opacity={0.1}
            d="M88.8721 311.673C88.1099 313.092 87.3327 314.491 86.5429 315.877C57.7345 305.251 33.3004 287.268 13.5348 262.122C14.1359 260.372 14.7673 258.624 15.4288 256.891C26.4033 271.296 38.9297 283.426 52.812 293.077C63.8594 300.754 75.9155 306.968 88.8721 311.673Z"
            fill="#131E2E"
          />
          <path
            id="Vector_5"
            d="M57.4308 269.089C57.4308 287.788 60.2128 306.964 65.2888 325.436C125.378 379.228 219.452 377.333 290.667 325.38C295.735 306.925 298.512 287.77 298.512 269.089C298.512 186.72 244.543 173.201 177.972 173.201C111.4 173.201 57.4308 186.72 57.4308 269.089Z"
            fill="url(#paint2_linear_835_15750)"
          />
          <path
            id="Vector_6"
            d="M65.2919 325.433C82.5875 388.326 126.513 443.064 177.972 443.064C229.431 443.064 273.387 388.292 290.67 325.374C288.044 325.261 285.418 325.028 282.812 324.663C263.044 321.909 244.335 311.845 230.935 296.76C222.242 286.976 215.788 275.254 206.73 265.821C206.655 265.741 206.582 265.667 206.506 265.59C191.334 249.964 166.532 249.964 151.36 265.59C151.284 265.667 151.211 265.741 151.136 265.821C142.078 275.254 135.624 286.976 126.931 296.76C113.531 311.847 94.8221 321.909 75.054 324.663C71.8192 325.115 68.5593 325.369 65.2969 325.431L65.2919 325.433Z"
            fill="url(#paint3_linear_835_15750)"
          />
          <path
            id="Vector_7"
            d="M316.198 132.273C334.072 132.273 348.56 116.729 348.56 97.5558C348.56 78.3823 334.072 62.8381 316.198 62.8381V132.271V132.273Z"
            fill="url(#paint4_linear_835_15750)"
          />
          <path
            id="Vector_8"
            d="M41.6582 132.273C23.7841 132.273 9.29568 116.729 9.29568 97.5558C9.29568 78.3823 23.7841 62.8381 41.6582 62.8381V132.271V132.273Z"
            fill="url(#paint5_linear_835_15750)"
          />
          <path
            id="Vector_9"
            d="M33.0096 104.366C33.0096 176.94 98.3711 195.118 179.001 195.118C259.628 195.118 324.992 176.94 324.992 104.366V90.752C324.989 18.1776 259.628 0 179.001 0C98.3736 0 33.0096 18.1776 33.0096 90.752V104.366Z"
            fill="url(#paint6_linear_835_15750)"
          />
          <path
            id="Vector_10"
            d="M62.8271 112.645C62.8271 152.899 114.807 162.981 178.928 162.981C243.05 162.981 295.029 152.899 295.029 112.645V105.094C295.029 64.8399 243.05 54.7578 178.928 54.7578C114.807 54.7578 62.8271 64.8399 62.8271 105.094V112.645Z"
            fill="#131C27"
          />
          <path
            id="Vector_11"
            d="M210.382 116.672C209.668 119.513 212.231 122.087 215.013 121.343C221.417 119.628 227.982 118.771 234.55 118.771C241.117 118.771 247.682 119.628 254.086 121.343C256.866 122.087 259.429 119.513 258.717 116.672C255.958 105.678 246.183 97.5545 234.55 97.5545C222.916 97.5545 213.144 105.681 210.382 116.672Z"
            fill="#F6D155"
          />
          <path
            id="Vector_12"
            d="M147.477 116.672C148.191 119.513 145.628 122.087 142.846 121.343C136.442 119.628 129.877 118.771 123.309 118.771C116.742 118.771 110.176 119.628 103.772 121.343C100.993 122.087 98.4297 119.513 99.1416 116.672C101.901 105.678 111.676 97.5545 123.309 97.5545C134.943 97.5545 144.715 105.681 147.477 116.672Z"
            fill="#F6D155"
          />
          <path
            id="Vector_13"
            opacity={0.76}
            d="M62.8267 105.094V112.643C62.8267 113.092 62.8342 113.538 62.8468 113.98C63.9837 74.8347 115.521 64.9785 178.925 64.9785C242.33 64.9785 293.869 74.8373 295.006 113.98C295.021 113.538 295.026 113.092 295.026 112.643V105.094C295.026 64.8373 243.047 54.7578 178.923 54.7578C114.799 54.7578 62.8242 64.8373 62.8242 105.094H62.8267Z"
            fill="#131E2E"
          />
          <path
            id="Vector_14"
            d="M113.883 5.47997C120.851 12.3357 125.461 21.5914 127.609 33.5036C128.286 37.2715 131.544 39.9794 135.294 39.9794H222.707C226.458 39.9794 229.715 37.269 230.397 33.5036C232.542 21.5914 237.153 12.3332 244.121 5.48254C224.516 1.53234 202.401 0 179.001 0C155.6 0 133.485 1.53234 113.883 5.47997Z"
            fill="#FBD050"
          />
          <path
            id="Vector_15"
            d="M113.883 5.47956C120.851 12.3353 125.461 21.5909 127.609 33.5031C128.286 37.2711 131.544 39.979 135.294 39.979H222.707C226.458 39.979 229.715 37.2685 230.397 33.5031C232.542 21.5909 237.153 12.3327 244.121 5.48212C234.721 11.1803 229.232 16.0237 227.22 27.1992C226.586 30.7336 223.527 33.2747 220.011 33.2747H137.998C134.479 33.2747 131.423 30.7311 130.789 27.1992C128.774 16.0211 123.077 8.516 113.888 5.47699L113.883 5.47956Z"
            fill="#141E26"
          />
          <g id="Group">
            <path
              id="Vector_16"
              d="M178.929 342.349C161.625 342.349 147.597 328.034 147.597 310.377C147.597 292.72 161.625 278.406 178.929 278.406C196.232 278.406 210.26 292.72 210.26 310.377C210.26 328.034 196.232 342.349 178.929 342.349Z"
              fill="url(#paint7_linear_835_15750)"
            />
            <path
              id="Vector_17"
              d="M178.926 335.957C165.087 335.957 153.868 324.509 153.868 310.387C153.868 296.265 165.087 284.818 178.926 284.818C192.766 284.818 203.984 296.265 203.984 310.387C203.984 324.509 192.766 335.957 178.926 335.957Z"
              fill="#FBD050"
            />
            <path
              id="Vector_18"
              opacity={0.1}
              d="M153.868 310.387C153.868 311.206 153.906 312.017 153.982 312.815C155.179 299.83 165.889 289.671 178.926 289.671C191.964 289.671 202.674 299.83 203.871 312.815C203.949 312.017 203.984 311.206 203.984 310.387C203.984 296.263 192.766 284.818 178.926 284.818C165.087 284.818 153.868 296.263 153.868 310.387Z"
              fill="#131E2E"
            />
          </g>
        </motion.g>
        <motion.g
          id="shadow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 2, 2, 1, 1] }}
          //   transition={{ duration: 0.5 }}
          transition={{
            times: [0, 1],
            duration: 5,
            repeat: Infinity,
          }}
        >
          <path
            id="Vector_19"
            opacity={0.63}
            d="M178.923 503.001C134.809 503.001 99.0479 496.329 99.0479 488.098C99.0479 479.868 134.809 473.196 178.923 473.196C223.037 473.196 258.798 479.868 258.798 488.098C258.798 496.329 223.037 503.001 178.923 503.001Z"
            fill="url(#paint8_radial_835_15750)"
          />
        </motion.g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_835_15750"
          x1={23.2481}
          y1={286.865}
          x2={89.7066}
          y2={294.574}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_835_15750"
          x1={338.019}
          y1={289.665}
          x2={264.716}
          y2={289.665}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_835_15750"
          x1={177.972}
          y1={302.798}
          x2={177.972}
          y2={201.099}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_835_15750"
          x1={177.98}
          y1={384.91}
          x2={177.98}
          y2={264.892}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_835_15750"
          x1={348.56}
          y1={97.5558}
          x2={316.198}
          y2={97.5558}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_835_15750"
          x1={41.6582}
          y1={97.5558}
          x2={9.29819}
          y2={97.5558}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_835_15750"
          x1={324.989}
          y1={97.5589}
          x2={33.0096}
          y2={97.5589}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_835_15750"
          x1={200.377}
          y1={289.754}
          x2={156.645}
          y2={330.139}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset={0.2} stopColor="#A5B0B5" />
          <stop offset={0.37} stopColor="#CCD1D3" />
          <stop offset={0.57} stopColor="#B5BEC2" />
          <stop offset={0.74} stopColor="white" />
          <stop offset={1} stopColor="#A5B0B5" />
        </linearGradient>
        <radialGradient
          id="paint8_radial_835_15750"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(178.923 487.696) rotate(180) scale(76.2806 12.4542)"
        >
          <stop stopOpacity={0.3} />
          <stop offset={0.92} stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};
// export { RobotSvgComp as ReactComponent };
export default RobotSvgComp;
