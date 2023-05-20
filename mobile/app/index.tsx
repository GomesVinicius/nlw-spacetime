import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { styled } from 'nativewind';
import blurBg from '../src/assets/bg-blur.png';
import NlwLogo from '../src/assets/nlw-spacetime-logo.svg';
import Stripes from '../src/assets/stripes.svg';

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { api } from '../src/assets/lib/api';

import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const router = useRouter()
  
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/78cd284b63d8e41c688a',
  };
  
  const [, response, signInWithGitHub] = useAuthRequest(
    {
      clientId: '78cd284b63d8e41c688a',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      
      handleGithubOAuthCode(code)
    }

  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  const StyledStripes = styled(Stripes)

  return (
    <ImageBackground source={blurBg} className="relative px-8 py-10 flex-1 items-center bg-gray-900" imageStyle={{ position: 'absolute', left: '-100%' }}>
      <StatusBar style="light" translucent />

      <StyledStripes  className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NlwLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">Colecione momentos da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.73}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signInWithGitHub()}
        >
          <Text className="font-alt text-sm uppercase text-black">Cadastra Lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 🐱‍🐉 no NLW da Rocketseat
      </Text>

    </ImageBackground>
  );
}
