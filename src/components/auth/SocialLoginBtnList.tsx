import { Flex, IconButton, Tooltip, Image } from '@chakra-ui/react';

const SOCIAL_AUTH_URL = {
  google: 'Backend URL for Google login',
  naver: 'Backend URL for Naver login',
  instagram: 'Backend URL for Instagram login',
};

import naverLogo from '@/assets/imgs/naver_icon_circle.png';
import googleLogo from '@/assets/imgs/google_icon_circle.png';
import instaLogo from '@/assets/imgs/instagram_icon_square.png';

export const SocialLoginBtnList = () => {
  const handleSocialLogin = (provider: 'google' | 'naver' | 'instagram') => {
    window.location.href = SOCIAL_AUTH_URL[provider];
  };

  return (
    <Flex
      w="100%"
      justify="space-between" // 공간을 균등하게 분배
      align="center"
      gap={4} // 간격 조절
      mt={4}
      px={20} // 양쪽 여백
    >
      <Tooltip label="Google 로그인" hasArrow>
        <IconButton
          aria-label="Google 로그인"
          icon={<Image src={googleLogo} boxSize="26px" objectFit="contain" />}
          onClick={() => handleSocialLogin('google')}
          variant={'ghost'}
          borderRadius="full"
          size="lg"
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
        />
      </Tooltip>
      <Tooltip label="Naver 로그인" hasArrow>
        <IconButton
          aria-label="Naver 로그인"
          icon={<Image src={naverLogo} boxSize="26px" objectFit="contain" />}
          onClick={() => handleSocialLogin('naver')}
          variant={'ghost'}
          borderRadius="full"
          size="lg"
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
        />
      </Tooltip>

      <Tooltip label="Instagram 로그인" hasArrow>
        <IconButton
          aria-label="Instagram 로그인"
          icon={<Image src={instaLogo} boxSize="24px" objectFit="contain" />}
          onClick={() => handleSocialLogin('instagram')}
          variant={'ghost'}
          borderRadius="full"
          size="lg"
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
        />
      </Tooltip>
    </Flex>
  );
};
