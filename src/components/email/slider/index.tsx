import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { ANIMATION_TIME } from '@/src/shared/config/config';

interface SliderProps {
  children: React.ReactNode;
  header: React.ReactNode;
  currentIndex: number;
  nextIndex: number;
  isReverseSlide?: boolean;
  onAnimationComplete: () => void;
}

const Slider: React.FC<SliderProps> = ({ children, header, currentIndex, nextIndex, isReverseSlide, onAnimationComplete }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');
  const translateContent = useSharedValue<number>(0);
  const translateHeader = useSharedValue<number>(0);
  const { width: screenWidth } = useWindowDimensions();

  const animatedContentStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateContent.value }],
  }));

  const animatedHeaderStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateHeader.value }],
  }));

  const handleAnimationComplete = () => {
    onAnimationComplete();
    setTimeout(() => {
      setPointerEvents('auto');
    }, 50); 
  };

  useEffect(() => {
  if (isInitialRender) {
    setIsInitialRender(false);
    return;
  }

  const startAnimation = () => {
    setPointerEvents('none');
    const direction = isReverseSlide ? -screenWidth * 1.1 : screenWidth * 1.1;

    translateContent.value = withTiming(
      -direction,
      {
        duration: ANIMATION_TIME,
        easing: Easing.in(Easing.cubic),
      },
      () => {
        runOnJS(onAnimationComplete)();
        translateContent.value = direction;
        translateContent.value = withSpring(
          0,
          { damping: 16 },
          () => runOnJS(handleAnimationComplete)()
        );
      }
    );

    
    const shouldAnimateHeader = 
      (currentIndex === 3 && nextIndex === 4) || 
      (currentIndex === 5 && nextIndex === 3);    

    if (shouldAnimateHeader) {
      translateHeader.value = withTiming(
        -direction, 
        {
          duration: ANIMATION_TIME, 
          easing: Easing.in(Easing.cubic), 
        },
        () => {
          translateHeader.value = direction; 
          translateHeader.value = withSpring(
            0,
            { damping: 16 }, 
            () => console.log('Header animation complete')
          );
        }
      );
    }
  };

  startAnimation();
}, [nextIndex, isReverseSlide]);

  return (
    <>
      <Animated.View style={[animatedHeaderStyles, { width: screenWidth * 0.88, alignSelf: 'center' }]}>
        {header}
      </Animated.View>
      <Animated.View
        style={[animatedContentStyles, { width: screenWidth * 0.88, alignSelf: 'center', flex: 1 }]}
        pointerEvents={pointerEvents}
        onLayout={() => console.log('Animated.View rendered, pointerEvents:', pointerEvents)}
      >
        {children}
      </Animated.View>
    </>
  );
};

export default Slider;