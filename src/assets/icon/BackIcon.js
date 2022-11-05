import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../utils';

const BackIcon = props => {
  let width = props?.width || 25;
  let height = props?.height || 25;
  let color = props?.color || COLORS.black;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      class="bi bi-x-lg"
      viewBox="0 0 25 24"
      {...props}>
      <Path
        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BackIcon;
