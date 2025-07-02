declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

declare namespace NodeJS {
    interface ProcessEnv {
        API_BASE_URL: string;
        BASE_URL: string;
        TEST_ACCESS_TOKEN: string;
    }
}
