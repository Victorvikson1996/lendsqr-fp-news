import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../utils';

const BackMenuIcon = props => {
  let width = props?.width || 20;
  let height = props?.height || 20;
  let color = props?.color || COLORS.black;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      class="bi bi-arrow-left"
      viewBox="0 0 21 20"
      {...props}>
      <Path
        fill-rule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BackMenuIcon;
