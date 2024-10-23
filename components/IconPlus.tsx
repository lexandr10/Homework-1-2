import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { colors } from '../styles/global';

const IconPlus= () => {
    return (
      <Svg
        width={25} height={25} viewBox="0 0 25 25" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z" fill="#FF6C00" />
      </Svg>
    );
  };
  
  export default IconPlus;