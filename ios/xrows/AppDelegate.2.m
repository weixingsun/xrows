#import "AppDelegate.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import <UserNotifications/UserNotifications.h>
#import "Xrows-Swift.h"

@implementation AppDelegate
#define APPKEY @"WAqWASmCo1GO6uA2AWkjs868PVDRaQOO"
/** 注册用户通知 */
- (void)registerUserNotification {
  // 注册通知(推送) 申请App需要接受来自服务商提供推送消息  iOS8 下需要使用新的 API
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 10.0) {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge|UNAuthorizationOptionSound|UNAuthorizationOptionAlert)
                          completionHandler:^(BOOL granted,NSError *_Nullable error){
                            if(!error) NSLog(@"request push authorization succeeded!");
                          }];
  }/*else if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
    UIUserNotificationType myTypes = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:myTypes categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    }else {
    UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
    }*/
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // register APNS for push
  [self registerUserNotification];
  [BaiDuPush registerChannel:launchOptions apiKey:APPKEY pushMode:BPushModeDevelopment];
  [BaiDuPush disableLbs];
  NSMutableDictionary *appProperties = [NSMutableDictionary dictionary];
  if (launchOptions != nil) {
    // Get Local Notification used to launch application.
    NSDictionary *notification = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    if (notification) {
      [BaiDuPush handleNotification:notification];
      [appProperties setObject:notification forKey:@"initialNotification"];
      //NSMutableDictionary *kv=notification[@"custom"][@"a"][@"p2p_notification"][@"key"];
      //type:lat,lng:ctime#rtime
      //NSString *str=[NSString stringWithFormat:@"share://shareplus.co.nf/i/%@", kv];
      //str=@"share://shareplus.co.nf/c/"; //encodeURI(dict.toString)
      //NSURL *url = [NSURL URLWithString:str];
      //NSDictionary *options = @{UIApplicationOpenURLOptionUniversalLinksOnly : @YES};
      //[[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil ];
    }
  }
  //角标清0
  [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
  //NSURL *jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.67:8081/index.ios.bundle?platform=ios&dev=true"];
  NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"xrows"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
//百度云推送添加
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UNNotificationSettings *)notificationSettings
{
  [application registerForRemoteNotifications];
  //[TencentXG didRegisterUserNotificationSettings:notificationSettings];
}
//百度云推送添加
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  //[TencentXG didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  NSLog(@"device_token:%@",deviceToken);
  [BaiDuPush registerDeviceToken:deviceToken];
}
//百度云推送添加
- (void)application:(UIApplication *)app didFailToRegisterForRemoteNotificationsWithError:(NSError *)err
{
  //[TencentXG didFailToRegisterForRemoteNotificationsWithError:err];
  NSLog(@"Failed to get DeviceToken, error:%@",err);
}
// 此方法是 用户点击了通知，应用在前台 或者开启后台并且应用在后台 时调起
- (void)application:(UIApplication*)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  //[TencentXG didReceiveRemoteNotification:notification];
  //[RCTPushNotificationManager didReceiveRemoteNotification:notification];
  //[RCTOneSignal didReceiveRemoteNotification:notification];
  completionHandler(UIBackgroundFetchResultNewData);
  // 应用在前台，不跳转页面，让用户选择。
  if (application.applicationState == UIApplicationStateActive) {
    NSDictionary* data = [userInfo objectForKey:@"aps"];
    NSString* msg = [data objectForKey:@"alert"];
    //[BaiDuPush receivePushMessages:msg];
    [BaiDuPush pushNotificationMessages:msg];
  }
  //杀死状态下，直接跳转到跳转页面。
  if (application.applicationState == UIApplicationStateInactive) {
    //NSDictionary* data = [userInfo objectForKey:@"aps"];
    //NSString* msg = [data objectForKey:@"alert"];
    //[BaiDuPush pushNotificationMessages:msg];
  }
  [BaiDuPush saveNotificationMessages:userInfo];
}
@end
