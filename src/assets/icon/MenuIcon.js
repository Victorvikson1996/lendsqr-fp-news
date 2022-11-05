import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../utils';

const MenuIcon = props => {
  let width = props?.width || 18;
  let height = props?.height || 18;
  let color = props?.color || COLORS.black;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      class="bi bi-list"
      viewBox="0 0 16 16"
      {...props}>
      <Path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MenuIcon;
