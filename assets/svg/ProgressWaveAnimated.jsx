import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ProgressWaveAnimated(props) {
    return (
        <Svg
            width={253}
            height={17}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1.5 10s2.675 3.278 5 4.5C14.653 18.785 17.29 2 26.5 2s10.79 12.5 20 12.5S57.29 2 66.5 2s10.79 12.5 20 12.5S97.29 2 106.5 2s10.79 12.5 20 12.5S137.29 2 146.5 2s10.79 12.5 20 12.5S177.29 2 186.5 2s10.79 12.5 20 12.5S217.29 2 226.5 2s11.847 16.785 20 12.5c2.325-1.222 5-4.5 5-4.5"
                stroke="#60A0FF"
                strokeWidth={3}
                strokeLinecap="round"
            />
        </Svg>
    );
}

export default ProgressWaveAnimated;

