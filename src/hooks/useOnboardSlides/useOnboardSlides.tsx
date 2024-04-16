import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { appStorageGet, appStorageSet } from 'helpers';
import { mockOnboardingSlides } from './mocks';

const IS_ONBOARDING_PASSED_STORAGE_KEY = 'IS_ONBOARDING_PASSED';

export const useOnboardSlides = () => {
  useEffect(() => {
    const showOnboarding = async () => {
      const storageKeysResult = await appStorageGet([
        IS_ONBOARDING_PASSED_STORAGE_KEY,
      ]);

      if (
        storageKeysResult &&
        storageKeysResult.keys[0] &&
        storageKeysResult.keys[0].value !== 'confirm'
      ) {
        /*
          Модуль 4. Разработка Урок 15. Онбординг #M4L15.
          VKWebAppShowSlidesSheet показывает информационные экраны (слайды),
          которые используются для онбординга пользователя и знакомства с новыми возможностями мини-приложения или игры.
        */
        const showOnboardSlidesResult = await bridge.send(
          'VKWebAppShowSlidesSheet',
          mockOnboardingSlides,
        );

        appStorageSet(
          IS_ONBOARDING_PASSED_STORAGE_KEY,
          showOnboardSlidesResult.action,
        );
      }
    };

    void showOnboarding();
  }, []);
};
