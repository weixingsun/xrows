#cp android/app/google-services-debug.json android/app/google-services.json
#cp android/app/google-services-release.json android/app/google-services.json

#keytool -v -list -keystore android/app/wxsun-release-key.keystore
#keytool -genkey -v -keystore share-release-key.keystore -alias share-key-alias -keyalg RSA -keysize 2048 -validity 10000
#CN=Weixing Sun, OU=Dev, O=DaBo, L=Beijing, ST=BJ, C=CN

##################################################################
#ver=$1
ver0=`grep version package.json|awk '{print $2}'`  ###  "1.0.6",
ver1=`echo $ver0| sed "s/.$//"`    ###  "1.0.6"
cat android/app/build.gradle |sed -e "s/\"[[:digit:]].[[:digit:]].[[:digit:]]\"/$ver1/g" > android/app/build.gradle.latest
cp android/app/build.gradle.latest android/app/build.gradle
##################################################################

#&& ./gradlew clean
cd android && ./gradlew assembleRelease
sleep 5
cd ..
date=`date +%Y%m%d`
cp  android/app/build/outputs/apk/app-release.apk apk/xrows_$date.apk
scp apk/xrows_$date.apk nzmesse1@nzmessengers.co.nz:~/www/share/
ssh nzmesse1@nzmessengers.co.nz "cd /home1/nzmesse1/www/share && rm -f xrows.apk && ln -s xrows_$date.apk xrows.apk"



#ios
#rm -rf ~/Library/Developer/Xcode/DerivedData/xrows*
#find build folder:  ios/build/Build/Products/Debug-iphonesimulator
#drag folder into iTunes
#drag app to desktop: ipa 

#react-native bundle --entry-file ./index.ios.js --platform ios --bundle-output ios/xrows/main.jsbundle
