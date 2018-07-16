# React Native Billing

이 문서는 react-native-billing 모듈을 이용하여 Android 플랫폼의 In App Bliing 을 구현하는 방법을 설명합니다.

## 프로젝트 생성

윈도우 환경에서 아래의 명령을 입력하여 프로젝트를 생성하고 구동합니다.

```bash
react-native init --version="0.55.4" rnb
cd rnb
react-native run-android
```

## react-native-billing 모듈 설치

react-native-billing 모듈 사용을 위해 아래의 명령을 입력합니다.

```bash
# 모듈 설치
npm install --save react-native-billing
# 모듈 링크
react-native link react-native-billing
```

## Android Project 설정

android 폴더를 Android Studio 에서 Import 하고 아래의 내용들을 입력하여 의존성을 설정합니다.
