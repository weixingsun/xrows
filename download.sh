curl -o index.android.bundle http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false&minify=false
#curl -o index.ios.jsbundle   http://localhost:8081/index.ios.bundle?platform=ios&dev=true
curl -o main.jsbundle   http://localhost:8081/index.ios.bundle?platform=ios
