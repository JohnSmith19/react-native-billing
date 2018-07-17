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

android 폴더를 Android Studio 에서 Import 하고 아래의 내용들을 확인합니다.

- android/setting.gradle

```
include ':react-native-billing', ':app'
project(':react-native-billing').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-billing/android')
```

- android/app/build.gradle

```
...
dependencies {
    ...
    compile project(':react-native-billing')
}
```

- MainApplication.java

```java
import com.idehub.Billing.InAppBillingBridgePackage;

@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    // add package here
    new InAppBillingBridgePackage()
  );
}
```

- android/app/src/main/res/values/strings.xml

Google Play license key 를 아래의 리소스 항목에 입력합니다.

```xml
<string name="RNB_GOOGLE_PLAY_LICENSE_KEY">YOUR_GOOGLE_PLAY_LICENSE_KEY_HERE</string>
```

또는 위의 패키지 생성 루틴에 아래와 같이 parameter 로 입력합니다.

```java
.addPackage(new InAppBillingBridgePackage("YOUR_LICENSE_KEY"))
```
