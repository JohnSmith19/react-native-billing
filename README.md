# React Native Billing

이 문서는 [react-native-billing](https://github.com/idehub/react-native-billing) 모듈을 이용하여 Android 플랫폼의 In App Bliing 을 구현하는 방법을 설명합니다.

## 프로젝트 생성

윈도우 환경에서는 아래의 명령을 입력하여 프로젝트를 생성하고 구동합니다.

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

## 테스트

### [정적 응답 테스트](http://developer.android.com/google/play/billing/billing_testing.html#billing-testing-static)

구글에서 미리 정의한 상품 아이디로 정적 응답 테스트를 진행할 수 있습니다.

- android.test.purchased
- android.test.canceled
- android.test.refunded
- android.test.item_unavailable

정적 테스트를 진행하기 위해서는 license key 를 null 로 설정 합니다.

[See the Google Play docs for more info on static responses.](https://developer.android.com/google/play/billing/billing_testing#billing-testing-static)

For instance to purchase and consume the static android.test.purchased products, with async/await (you can chain the promise) :

```js
// To be sure the service is close before opening it
async pay() {
  await InAppBilling.close();
  try {
    await InAppBilling.open();
    if (!await InAppBilling.isPurchased(productId)) {
      const details = await InAppBilling.purchase(productId);
      console.log('You purchased: ', details);
    }
    const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId);
    console.log('Transaction Status', transactionStatus);
    const productDetails = await InAppBilling.getProductDetails(productId);
    console.log(productDetails);
  } catch (err) {
    console.log(err);
  } finally {
    await InAppBilling.consumePurchase(productId);
    await InAppBilling.close();
  }
}
```
