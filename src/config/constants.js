import { Platform } from 'react-native';

export const IS_ENV_DEVELOPMENT = __DEV__;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const FOLLOW_TYPES = ['arrow', 'text'];
export const IS_DEBUG_MODE_ENABLED = window.navigator.userAgent;
export const INITIAL_TIME = 20;

export const CLEAR_STACK_DURATION = 2000;
export const PREPARE_ROUND_DURATION = 1000;
export const INTERLUDE_DURATION = 2000;
export const MENU_ANIM_DURATION = 1000;
