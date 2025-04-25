import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { FaInstagram } from 'react-icons/fa';

const SOCIAL_AUTH_URL = {
  google: 'https://your-backend.com/oauth2/authorize/google',
  naver: 'https://your-backend.com/oauth2/authorize/naver',
  instagram: 'https://your-backend.com/oauth2/authorize/instagram',
};

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
          icon={<FcGoogle size="24" />}
          onClick={() => handleSocialLogin('google')}
          variant="outline"
          borderRadius="full"
          size="lg"
        />
      </Tooltip>
      <Tooltip label="Naver 로그인" hasArrow>
        <IconButton
          aria-label="Naver 로그인"
          icon={<SiNaver size="20" />}
          onClick={() => handleSocialLogin('naver')}
          variant="outline"
          borderRadius="full"
          size="lg"
          color="green.500"
        />
      </Tooltip>

      <Tooltip label="Instagram 로그인" hasArrow>
        <IconButton
          aria-label="Instagram 로그인"
          icon={<FaInstagram size="20" />}
          onClick={() => handleSocialLogin('instagram')}
          variant="outline"
          borderRadius="full"
          size="lg"
          color="pink.400"
        />
      </Tooltip>
    </Flex>
  );
};
