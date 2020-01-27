oSpP = false;
var oSpPOptions = {
    sAppUrl:"https://google.com",   // сайт клиента
    sAppUrlShow:"https://google.com",
    sOrigUrl:"https://google.com",
    sOrigFFUrl:"https://google.com",
    sPushHost:"f484c4771f1f1ebe6051f27e031d913e",
    sPushSenderID: "300013155679",
    bHttps:false,                     // https или http
    bSendToParent:"false",
    aBrowser:{},                      // название текущего браузера и версия
    sBrowser:'',                      // название текущего браузера и версия
    sOs:'',                      // название текущей системы
    sSafariPushId:"web.com.sendpulse.push",   // ID from Apple push settings
    sServerApi:"https://pushdata.send-box.ru:4434",  // URL сервера по обработке запросов от клиентов
    gcmServer:"https://android.googleapis.com/gcm/send/",
    fcmServer:"https://fcm.googleapis.com/fcm/",
    mozillaServer:"https://updates.push.services.mozilla.com/wpush/v2/",
    jsIncludeDomain: "email.mail.ru.local",
    bAutoSubscribe:"false",             // автоподписка при разрешении
    sAppKey:'5acd05abd0a505a3cef642ab44163517',
    prompt_settings:"{\"style\":\"sendpulse-safari\",\"textcolor\":\"\",\"backgroundcolor\":\"\",\"buttoncolor\":\"\",\"iconcolor\":\"\",\"btncolor\":\"\",\"allowbtntext\":\"\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c\",\"disallowbtntext\":\"\u0417\u0430\u043f\u0440\u0435\u0442\u0438\u0442\u044c\",\"btn_lang\":\"ru\",\"visit_number\":1,\"icon\":\"\/img\/my\/push\/push-default-icons\/icon.png\"}",
    prompt_title:"Подписка на уведомления",
    prompt_text:"Разрешите сайту google.com отправлять вам уведомления на рабочий стол",
    prompt_description:"-",
    currentDB:null,
    parentEvent:null,
    initedPage:false,
    parentVariables:{},
    pushedVariables:{},
    pushedInterval:false,
    sFirefoxServer:"https://updates.push.services.mozilla.com/push/",
    sFirefoxServer2:"https://updates.push.services.mozilla.com/wpush/v1/",
    bWasPrompt:false,
    startTime:0,
    isParentAutoSubscribe:"false", // true только в случае, если сайт is_ssl=0 и is_autosubscribe=1 false
    bSentToServer:false,
    bSentStatOpened:false,
    bSentStatPermission:false,
    bMobileEnabled:"true",
    show_splogo:"1",
    spdomain_website:"https://biz.mail.ru/sendbox/",
    aPoweredbySendpulse:{
        ru: 'Предоставлено Sendbox',
        en: 'Powered by Sendbox',
        ua: 'Надано Sendbox'
    },
    companyName: 'Sendbox',
    iPromptDelay:"0",
    visitNumber: "1",
    bMonetization: "false",
    bIframeEnabled: false
};
function oSendpulsePush(){
    var sAppUrl = oSpPOptions.sAppUrl;   // сайт клиента
    var sAppUrlShow = oSpPOptions.sAppUrlShow;
    var sOrigUrl = oSpPOptions.sOrigUrl;
    var sOrigFFUrl = oSpPOptions.sOrigFFUrl;
    var sPushHost = oSpPOptions.sPushHost;

    var bHttps = oSpPOptions.bHttps;                     // https или http
    var bSendToParent = oSpPOptions.bSendToParent;
    var jsIncludeDomain = oSpPOptions.jsIncludeDomain;
    var aBrowser = oSpPOptions.aBrowser;                      // название текущего браузера и версия
    var sBrowser = oSpPOptions.sBrowser;                      // название текущего браузера и версия
    var sOs = oSpPOptions.sOs;                      // название текущей системы
    var sSafariPushId = oSpPOptions.sSafariPushId;   // ID from Apple push settings
    var sServerApi = oSpPOptions.sServerApi;  // URL сервера по обработке запросов от клиентов
    var gcmServer = oSpPOptions.gcmServer;
    var bAutoSubscribe = oSpPOptions.bAutoSubscribe;             // автоподписка при разрешении
    var sAppKey = oSpPOptions.sAppKey;
    var prompt_settings = oSpPOptions.prompt_settings;
    var prompt_title = oSpPOptions.prompt_title;
    var prompt_text = oSpPOptions.prompt_text;
    var prompt_description = oSpPOptions.prompt_description;
    var currentDB = oSpPOptions.currentDB;
    var parentEvent = oSpPOptions.parentEvent;
    var initedPage = oSpPOptions.initedPage;
    var parentVariables = oSpPOptions.parentVariables;
    var pushedVariables = oSpPOptions.pushedVariables;
    var pushedInterval = oSpPOptions.pushedInterval;
    var sFirefoxServer = oSpPOptions.sFirefoxServer;
    var sFirefoxServer2 = oSpPOptions.sFirefoxServer2;
    var bWasPrompt = oSpPOptions.bWasPrompt;
    var startTime = oSpPOptions.startTime;
    var isParentAutoSubscribe = oSpPOptions.isParentAutoSubscribe; // true только в случае, если сайт is_ssl=0 и is_autosubscribe=1 false
    var bSentToServer = oSpPOptions.bSentToServer;
    var bSentStatOpened = oSpPOptions.bSentStatOpened;
    var bSentStatPermission = oSpPOptions.bSentStatPermission;
    var bMobileEnabled = oSpPOptions.bMobileEnabled;
    var show_splogo = oSpPOptions.show_splogo;
    var spdomain_website = oSpPOptions.spdomain_website;
    var aPoweredbySendpulse = oSpPOptions.aPoweredbySendpulse;
    var companyName = oSpPOptions.companyName;
    var iPromptDelay = oSpPOptions.iPromptDelay;
    var visitNumber = oSpPOptions.visitNumber;
    var nowDate = new Date();
    var cssVersion = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()).getTime();
    cssVersion = nowDate.getDate() + '' + cssVersion;
    //******************************************************************************************************************
    this.start = function(){
        if (! oSpP.detectSite()) {
            oSpP.log('Application allowed only for '+sAppUrl);
            return false;
        }
        if (oSpP.detectOs()=='iOS') {
            oSpP.log('Application can not work on iOS');
            return false;
        }

        sOs = oSpP.detectOs();
        if (! bMobileEnabled) {
            if ( (sOs=='iOS')||(sOs=='Android') ){
                oSpP.log('Application disabled for your device');
                return false;
            }
        }

        oSpP.detectHttps();
        aBrowser = oSpP.detectBrowser(); // from Chrome.42, Firefox 44
        sBrowser = aBrowser['name'].toLowerCase();

        // if mobile facebook browser, detected as "Chrome 4"
        if ((sOs == 'iOS') || (sOs == 'Android')){
            if ((sBrowser == 'chrome') && (parseFloat(aBrowser['version']) < 42)) {
                oSpP.log('Application disabled for your browser version');
                return false;
            }
        }

        if ((sBrowser == 'firefox')&&(parseFloat(aBrowser['version'])< 44 )) {
            oSpP.log('Application can not work with Firefox browser version less then 44');
            return false;
        }

        if ((sBrowser == 'opera')&&(parseFloat(aBrowser['version'])< 43 )) {
            oSpP.log('Application can not work with Opera browser version less then 43');
            return false;
        }

        /*
        if ((sBrowser == 'firefox')&&(sOs=='Android')) {
            oSpP.log('Application can not work with Firefox on Android');
            return false;
        }
        */

        if (sBrowser == 'firefox') {
            sOrigUrl = sOrigFFUrl;
        }

        if (bSendToParent) {
            if (isParentAutoSubscribe) {
                bSentStatOpened = true;
                bSentStatPermission = true;
            }
            var ti = setInterval(function(){
                if (bSentToServer && bSentStatOpened && bSentStatPermission) {
                    oSpP.sendToParent('closeme');
                    clearInterval(ti);
                }
            },50);
        }

        if (bHttps) {
            if (bAutoSubscribe) {
                // тут задержку
                oSpP.startDelayedSubscription(function(){
                    oSpP.startSubscription();
                    if(sBrowser=='safari' || sBrowser=='chrome' || sBrowser=='firefox' || sBrowser=='opera') {
                        oSpP.showhelpPromptText();
                    }
                    if (oSpP.isServiceWorkerChromeSupported()) {
                        oSpP.showPushLabel();
                    }
                });

            } else {
                oSpP.getDbValue('SPIDs','PromptClosed',function(data) {
                    if (data.target.result === undefined) {
                        if(sBrowser=='safari' || sBrowser=='chrome' || sBrowser=='firefox' || sBrowser=='opera') {
                            oSpP.startDelayedSubscription(function() {
                                oSpP.showCustomPrompt();
                            });
                        }
                    }
                });
                var aSubscribeButtons = document.querySelectorAll('.sp_notify_prompt');
                for (var i=0; i<aSubscribeButtons.length; i++){
                    aSubscribeButtons[i].addEventListener('click', function() {
                        // oSpP.showPrompt();
                        oSpP.startSubscription();
                    });
                }
            }
        }
        if (bSendToParent){
            window.addEventListener("message", function(event){
                if (oSpP.detectOrigin(event.origin)) {
                    if (event.data=='init') {
                        parentEvent = event;
                        parentEvent.source.postMessage('initend',parentEvent.origin);
                    } else if (event.data.indexOf('initpage')===0) {
                        var initedData = event.data.split('|');
                        if (initedData.length == 2) {
                            initedPage = initedData[1];
                            localStorage.setItem('source_url', initedPage);
                        }
                    } else if (event.data.indexOf('initvariables')===0) {
                        var initedData = event.data.split('|');
                        parentVariables = JSON.parse(initedData[1]);
                    }
                }
            }, false);
        }
    }

    //******************************************************************************************************************
    this.startSubscription = function(){
        switch (sBrowser) {
            case 'safari':
                if (oSpP.isSafariNotificationSupported()) {
                    var permissionData = window.safari.pushNotification.permission(sSafariPushId);
                    oSpP.checkSafariPermission(permissionData);
                }
                break;
            case 'chrome':
            case 'firefox':
            case 'opera':
                if (bHttps) {
                    var manifest = document.createElement("link");
                    manifest.rel = "manifest";
                    //manifest.href = sAppUrl + "/manifest.json";
                    manifest.href = "/sp-push-manifest.json";
                    //document.head.appendChild(manifest);
                    document.head.insertBefore(manifest,document.head.firstChild)
                }
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    if (registrations) {
                        for (var i=0; i<registrations.length; i++) {
                            if (registrations[i].active){
                                if (registrations[i].active.scriptURL.indexOf('sp-push-worker.js') != -1) {
                                    registrations[i].unregister();
                                }
                            }
                        }
                    }
                })

                if (oSpP.isServiceWorkerChromeSupported()) {
                    oSpP.log('ASK for Permission');
                    startTime = Date.now();
                    Notification.requestPermission(oSpP.doActionsWithPermissions);
                    oSpP.registerChrome();
                }
                break;
        }
    }

    //******************************************************************************************************************
    this.clearDomain = function(string){
        return string
            .replace('://www.','://')
            .replace('://www2.','://');
    }

    //******************************************************************************************************************
    this.detectSite = function(){
        var bSite = (!(oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(sAppUrl.toLowerCase())) === -1));
        if (! bSite) {
            bSite = (!(oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(sAppUrlShow.toLowerCase())) === -1));
        }
        return bSite;
    }

    //******************************************************************************************************************
    this.detectOrigin = function(sTest){
        return (!(oSpP.clearDomain(sTest.toLowerCase()).indexOf(oSpP.clearDomain(sOrigUrl.toLowerCase())) === -1));
    }

    //******************************************************************************************************************
    this.detectHttps = function(){
        bHttps = (window.location.href.indexOf('https://') === 0);
    }

    //******************************************************************************************************************
    this.log = function(sMessage){
        // console.log(sMessage);
    }

    //******************************************************************************************************************
    this.detectBrowser = function() {
        var e, i = navigator.userAgent, t = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        var ie = i.match(/(edge(?=\/))\/?\s*(\d+)/i) || [];
        if ('Edge' === ie[1]) {
            return { name: ie[1], version: ie[2] }
        }
        return /trident/i.test(t[1]) ? (e = /\brv[ :]+(\d+)/g.exec(i) || [], {
            name: "IE",
            version: e[1] || ""
        }) : "Chrome" === t[1] && (e = i.match(/\bOPR\/(\d+)/), null != e) ? {
            name: "Opera",
            version: e[1]
        } : (t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = i.match(/version\/(\d+)/i)) && t.splice(1, 1, e[1]), {
            name: t[0],
            version: t[1]
        })
    };

    //******************************************************************************************************************
    this.isServiceWorkerChromeSupported = function(){
        return "serviceWorker" in navigator;
    }

    //******************************************************************************************************************
    this.isSafariNotificationSupported = function(){
        return "safari" in window && "pushNotification" in window.safari;
    }

    //******************************************************************************************************************
    this.getBrowserlanguage = function() {
        return navigator.language.substring(0, 2)
    }

    //******************************************************************************************************************
    this.setCookie = function(name, value, timeout) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * timeout * 60 * 60 * 1e3);
        var a = "expires=" + n.toUTCString();
        document.cookie = name + "=" + value + "; " + a
    }

    //******************************************************************************************************************
    this.checkCookie = function(name) {
        for (var i = name + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
            for (var a = t[n]; " " == a.charAt(0);)a = a.substring(1);
            if (0 == a.indexOf(i))return a.substring(i.length, a.length)
        }
        return ""
    }

    //******************************************************************************************************************
    this.doActionsWithPermissions = function(permissions){
        var nowStamp = Date.now();
        var timeDiff = nowStamp - startTime;
        if (timeDiff < 50) {
            bWasPrompt = false;
        } else {
            bWasPrompt = true;
        }

        /*
         if (bWasPrompt) {
         oSpP.deleteDbValue("SPIDs",'SubscriptionId');
         }
         */

        // Chrome, closed window: permissions = default, subscription = null
        oSpP.log('[DD] Permissions: '+permissions);
        oSpP.log('[DD] Time diff: '+timeDiff);
        switch (permissions) {
            case 'granted':
                if (! isParentAutoSubscribe){
                    if (bWasPrompt) {
                        oSpP.getDbValue('SPIDs','PromptShowed',function(data) {
                            if (data.target.result === undefined) {
                                oSpP.sendPromptStat('prompt_showed');
                                oSpP.sendPromptStat('prompt_granted');
                                oSpP.putValueToDb("SPIDs", {
                                    type: "PromptShowed",
                                    value: 1
                                });
                            } else {
                                oSpP.sendPromptStat('prompt_showed_again');
                                oSpP.sendPromptStat('prompt_granted');
                            }
                        });
                    }
                }
                switch (sBrowser) {
                    case 'chrome':
                    case 'firefox':
                    case 'opera':
                        oSpP.subscribe();
                        break;
                }
                break;
            case 'default':
                if (! isParentAutoSubscribe){
                    if (bWasPrompt) {
                        oSpP.getDbValue('SPIDs','PromptShowed',function(data) {
                            if (data.target.result === undefined) {
                                oSpP.sendPromptStat('prompt_showed');
                                oSpP.sendPromptStat('prompt_closed');
                                oSpP.putValueToDb("SPIDs", {
                                    type: "PromptShowed",
                                    value: 1
                                });
                            } else {
                                oSpP.sendPromptStat('prompt_showed_again');
                                oSpP.sendPromptStat('prompt_closed');
                            }
                        });
                    }
                }
                break;
            case 'denied':
                if (! isParentAutoSubscribe) {
                    if (bWasPrompt) {
                        oSpP.getDbValue('SPIDs','PromptShowed',function(data) {
                            if (data.target.result === undefined) {
                                oSpP.sendPromptStat('prompt_showed');
                                oSpP.sendPromptStat('prompt_denied');
                                oSpP.putValueToDb("SPIDs", {
                                    type: "PromptShowed",
                                    value: 1
                                });
                            } else {
                                oSpP.sendPromptStat('prompt_showed_again');
                                oSpP.sendPromptStat('prompt_denied');
                            }
                        });
                    }
                }
                break;
        }
        if(!bAutoSubscribe) {
            if (permissions == 'default') {
                oSpP.closeCustomPrompt(false);
            } else {
                oSpP.closeCustomPrompt(true);
            }
        }else{
            if (permissions == 'default') {
                oSpP.closePromptHelpText(false);
            } else if (permissions == "granted") {
                oSpP.closePromptHelpText(true);
            } else {
                oSpP.closePromptHelpText(true);
            }
        }
        oSpP.closePushLabel();
    }

    //******************************************************************************************************************
    this.registerChrome = function(){
        navigator.serviceWorker.register('/sp-push-worker-fb.js', {updateViaCache: 'none'})
            .then(function(reg) {
                if(reg.installing) {
                    oSpP.log('Service worker installing');
                } else if(reg.waiting) {
                    oSpP.log('Service worker installed');
                } else if(reg.active) {
                    oSpP.log('Service worker active');
                }
                //oSpP.initialiseState(reg);
            });
    }

    //******************************************************************************************************************
    this.checkSafariPermission = function (permissionData) {
        oSpP.log('[DD] Permissions: '+permissionData.permission);
        if (permissionData.permission === 'default') {
            if(!bAutoSubscribe)
                oSpP.closeCustomPrompt(false);
            else
                oSpP.closePromptHelpText(false);
            bWasPrompt = true;
            oSpP.getDbValue('SPIDs','PromptShowed',function(data) {
                if (data.target.result === undefined) {
                    oSpP.sendPromptStat('prompt_showed');
                    oSpP.putValueToDb("SPIDs", {
                        type: "PromptShowed",
                        value: 1
                    });
                } else {
                    oSpP.sendPromptStat('prompt_showed_again');
                }
            });
            window.safari.pushNotification.requestPermission(
                sServerApi, // должен совпадать с webServiceURL в website.json из PUSH пакета
                sSafariPushId,
                { // любые даныне, которые нам надо передавать
                    appkey: sAppKey
                },
                oSpP.checkSafariPermission // The callback function.
            );
        }
        else if (permissionData.permission === 'denied') {
            if(!bAutoSubscribe)
                oSpP.closeCustomPrompt(true);
            else
                oSpP.closePromptHelpText(true);
            if (bWasPrompt) {
                oSpP.sendPromptStat('prompt_denied');
            }
        }
        else if (permissionData.permission === 'granted') {
            oSpP.uns();
            if(!bAutoSubscribe)
                oSpP.closeCustomPrompt(true);
            else
                oSpP.closePromptHelpText(true);
            if (bWasPrompt) {
                oSpP.sendPromptStat('prompt_granted');
            }
            oSpP.subscribe();
        }
        oSpP.closePushLabel();
    };

    //******************************************************************************************************************
    this.initialiseState = function(reg) {
        if (!(reg.showNotification)) {
            oSpP.log('Notifications aren\'t supported on service workers.');
        } else {
        }

        if (Notification.permission === 'denied') {
            oSpP.log('The user has blocked notifications.');
            return;
        }
        if (!('PushManager' in window)) {
            oSpP.log('Push messaging isn\'t supported.');
            return;
        }

    }

    //******************************************************************************************************************
    this.endpointWorkaround = function(pushSubscription) {
        // Chrome 42 + 43 will not have the subscriptionId attached to the endpoint.
        // https://fcm.googleapis.com/fcm/send/dtM-cIpgdhM:AP…hzPppzzPndxirPwbL3pPnV_YmDYwsI387pQaAmZbQKMvejtTD
        switch (sBrowser) {
            case 'chrome':
            case 'opera':
                if ('subscriptionId' in pushSubscription) {
                    var subscriptionId = pushSubscription.subscriptionId;
                } else {
                    var subscriptionId = pushSubscription.endpoint;
                }
                if (~subscriptionId.indexOf(gcmServer)) {
                    var token = subscriptionId.split(gcmServer);
                    return token[1];
                } else if (~subscriptionId.indexOf(oSpPOptions.fcmServer + 'send/')) {
                    var token = subscriptionId.split(oSpPOptions.fcmServer + 'send/');
                    return token[1];
                } else {
                    return subscriptionId;
                }
                break;
            case 'firefox':
                var subscriptionId = pushSubscription.endpoint;
                if (~subscriptionId.indexOf(sFirefoxServer)) {
                    var token = subscriptionId.split(sFirefoxServer);
                    return token[1];
                } else if (~subscriptionId.indexOf(sFirefoxServer2)) {
                    var token = subscriptionId.split(sFirefoxServer2);
                    return token[1];
                } else {
                    return subscriptionId;
                }
        }
    }

    //******************************************************************************************************************
    this.fetchFcmToken = function(gcmToken, sPubKey, sauthKey) {
        return new Promise(function(resolve, reject) {
            var sEndpoint = oSpPOptions.fcmServer + 'send/' + encodeURIComponent(gcmToken);
            var fbRequest = 'authorized_entity=' + oSpPOptions.sPushSenderID;
            fbRequest += '&endpoint=' + sEndpoint;
            fbRequest += '&encryption_key=' + encodeURIComponent(sPubKey);
            fbRequest += '&encryption_auth=' + encodeURIComponent(sauthKey);
            return fetch(oSpPOptions.fcmServer + 'connect/subscribe', {
                method: 'post',
                headers: {'Content-Type' : 'application/x-www-form-urlencoded' },
                body: fbRequest
            }).then(function (response) {
                if (response.status == 200) {
                    return response.json().then(function(data) {
                        resolve(data.token);
                    });
                } else {
                    resolve(undefined);
                }
            }).catch(function(error){
                reject(error);
            })
        })
    }

    //******************************************************************************************************************
    this.getFcmToken = function(gcmToken, sPubKey, sauthKey) {
        return new Promise(function(resolve, reject) {
            oSpP.getDbValue('SPIDs','SubscriptionIdFcm',function(dataFcm){
                // no FCM subscripttion
                if (dataFcm.target.result === undefined) {
                    oSpP.fetchFcmToken(gcmToken, sPubKey, sauthKey)
                        .then(function(fcmToken){
                            if (fcmToken !== undefined) {
                                oSpP.putValueToDb("SPIDs", {
                                    type: "SubscriptionIdFcm",
                                    value: fcmToken
                                });
                                oSpP.putValueToDb("SPIDs", {
                                    type: "SubscriptionIdGcm",
                                    value: gcmToken
                                });
                            }
                            resolve(fcmToken);
                        })
                        .catch(function(error){
                            reject(error);
                        })
                } else {
                    oSpP.getDbValue('SPIDs','SubscriptionIdGcm',function(dataGcm) {
                        if (dataGcm.target.result === undefined) {
                            // невозможная ситуация
                        } else if (dataGcm.target.result.value !== gcmToken) {
                            //
                            // TODO: unsubscribe FCM token
                            //
                            oSpP.fetchFcmToken(gcmToken, sPubKey, sauthKey)
                                .then(function(fcmToken){
                                    if (fcmToken !== undefined) {
                                        oSpP.putValueToDb("SPIDs", {
                                            type: "SubscriptionIdFcm",
                                            value: fcmToken
                                        });
                                        oSpP.putValueToDb("SPIDs", {
                                            type: "SubscriptionIdGcm",
                                            value: gcmToken
                                        });
                                    }
                                    resolve(fcmToken);
                                })
                                .catch(function(error){
                                    reject(error);
                                })
                        } else if (dataGcm.target.result.value === gcmToken) {
                            resolve(dataFcm.target.result.value);
                        }
                    })
                }
            })
        })
    }

    //******************************************************************************************************************
    this.subscribe = function() {
        switch (sBrowser) {
            case 'chrome':
            case 'firefox':
            case 'opera':
                navigator.serviceWorker.ready.then(function(reg) {
                    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription) {
                        //oSpP.log('[DD] Already subscribed');
                        var subscriptionId = oSpP.endpointWorkaround(subscription);

                        var pubKey = subscription.getKey ? subscription.getKey('p256dh') : '';
                        var sPubKey = pubKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(pubKey))) : '';

                        var authKey = subscription.getKey ? subscription.getKey('auth') : '';
                        var sauthKey = authKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(authKey))) : '';

                        //
                        if (sBrowser == 'firefox') {
                            oSpP.checkLocalSubsctoption(subscriptionId, sPubKey, sauthKey);
                            if (bSendToParent) {
                                oSpP.sendToParent(subscriptionId);
                            }
                        } else {
                            oSpP.getFcmToken(subscriptionId, sPubKey, sauthKey)
                                .then(function(fcmToken){
                                    if (fcmToken !== undefined) {
                                        oSpP.checkLocalSubsctoption(fcmToken);
                                        if (bSendToParent) {
                                            oSpP.sendToParent(fcmToken);
                                        }
                                    }
                                })
                                .catch(function(e) {
                                    oSpP.log(e);
                                })
                        }
                        //
                    }).catch(function(e) {
                        // if registered with another id - remove registration and subscribe to us
                        if (e.code == 11) {
                            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                                // remove OneSignal serviceworker
                                for (var i=0; i<registrations.length; i++) {
                                    if (
                                        (registrations[i].active.scriptURL.indexOf('OneSignalSDKWorker.js') != -1)
                                        ||
                                        (registrations[i].active.scriptURL.indexOf('pushcrew-sw.js') != -1)
                                        ||
                                        (registrations[i].active.scriptURL.indexOf('push-worker.js') != -1)
                                        ||
                                        (registrations[i].active.scriptURL.indexOf('sw.js') != -1)
                                        ||
                                        (registrations[i].active.scriptURL.indexOf('service-worker.js') != -1)
                                        ||
                                        (registrations[i].active.scriptURL.indexOf('pushwoosh-service-worker.js') != -1)
                                    ) {
                                        registrations[i].unregister().then(function(){
                                            navigator.serviceWorker.getRegistration().then(function(registration) {
                                                if (registration !== undefined) {
                                                    if (
                                                        (registration.active.scriptURL.indexOf('OneSignalSDKWorker.js') != -1)
                                                        ||
                                                        (registration.active.scriptURL.indexOf('pushcrew-sw.js') != -1)
                                                        ||
                                                        (registration.active.scriptURL.indexOf('push-worker.js') != -1)
                                                        ||
                                                        (registration.active.scriptURL.indexOf('sw.js') != -1)
                                                        ||
                                                        (registration.active.scriptURL.indexOf('service-worker.js') != -1)
                                                        ||
                                                        (registration.active.scriptURL.indexOf('pushwoosh-service-worker.js') != -1)
                                                    ) {
                                                        registration.unregister().then(function(){
                                                            // change subscription
                                                            reg.pushManager.getSubscription().then(function (subscription) {
                                                                if (subscription) {
                                                                    subscription.unsubscribe().then(function (successful) {
                                                                        window.location.reload();
                                                                    })
                                                                } else {
                                                                    window.location.reload();
                                                                }
                                                            })
                                                        });
                                                    }
                                                } else {
                                                    reg.pushManager.getSubscription().then(function (subscription) {
                                                        if (subscription) {
                                                            subscription.unsubscribe().then(function (successful) {
                                                                window.location.reload();
                                                            })
                                                        } else {
                                                            window.location.reload();
                                                        }
                                                    })
                                                }
                                            });
                                        });
                                    }
                                }
                            })
                        } // end if (e.code == 11) {
                    })

                });
                break;
            case 'safari':
                var permissionData = window.safari.pushNotification.permission(sSafariPushId);
                if (permissionData.permission === 'granted'){
                    var subscriptionId = permissionData.deviceToken;
                    oSpP.checkLocalSubsctoption(subscriptionId);
                    if (bSendToParent) {
                        oSpP.sendToParent(subscriptionId);
                    }
                }
                break;
        }
    }

    //******************************************************************************************************************
    this.checkLocalSubsctoption = function(subscriptionId, sPubKey, sAuthKey, fcmToken){
        oSpP.log('[DD] subscribe :: subscriptionId: '+subscriptionId);
        oSpP.getDbValue('SPIDs','SubscriptionId',function(data){
            if (data.target.result === undefined) {
                oSpP.sendSubscribeDataToServer(subscriptionId,'subscribe', undefined,  sPubKey, sAuthKey);
                oSpP.putValueToDb("SPIDs", {
                    type: "SubscriptionId",
                    value: subscriptionId
                });
            } else if (data.target.result.value !== subscriptionId) {
                oSpP.sendSubscribeDataToServer(data.target.result.value,'unsubscribe');
                oSpP.sendSubscribeDataToServer(subscriptionId,'subscribe', undefined, sPubKey, sAuthKey);
                oSpP.putValueToDb("SPIDs", {
                    type: "SubscriptionId",
                    value: subscriptionId
                });
            }
        });
    }

    //******************************************************************************************************************
    this.unsubscribe = function() {
        switch (sBrowser) {
            case 'chrome':
            case 'firefox':
            case 'opera':
                navigator.serviceWorker.ready.then(function(reg) {
                    reg.pushManager.getSubscription().then(
                        function(subscription) {
                            var subscriptionId = oSpP.endpointWorkaround(subscription);
                            if (!subscription) {
                                // не подписан
                                return;
                            }
                            subscription.unsubscribe().then(function(successful) {
                                // отписался
                            })/*.catch(function(e) {
                             oSpP.log('Unsubscription error: ', e);
                             });*/
                        })/*.catch(function(e) {
                     oSpP.log('Error thrown while unsubscribing from push messaging.', e);
                     });*/
                });
                break;
            case 'safari':
                var permissionData = window.safari.pushNotification.permission(safariPushId);
                if (permissionData.permission === 'granted'){
                    var subscriptionId = permissionData.deviceToken;
                }
                break;
        }
    }

    //******************************************************************************************************************
    this.getUserVariables = function(){
        var aData = {};
        var dataFields = document.querySelectorAll('input.sp_push_custom_data');

        for (var i=0; i<dataFields.length; i++){
            switch (dataFields[i].type) {
                case 'text':
                case 'hidden':
                    aData[dataFields[i].name] = dataFields[i].value;
                    break;
                case 'checkbox':
                    aData[dataFields[i].name] = (dataFields[i].checked) ? 1 : 0;
                    break;
                case 'radio':
                    if (dataFields[i].checked) {
                        aData[dataFields[i].name] = dataFields[i].value;
                    }
                    break;
            }
        }
        return aData;
    }

    //******************************************************************************************************************
    this.sendSubscribeDataToServer = function(subscriptionId, subscription_action, additional_data, sPubKey, sAuthKey){
        var request = new XMLHttpRequest();
        if ((bSendToParent)&&(subscription_action == 'subscribe')) {
            request.onreadystatechange = function() {
                if ((request.readyState == 4) && (request.status == 200)) {
                    // oSpP.sendToParent('closeme');
                    bSentToServer = true;
                }
            }
        }
        request.open('POST', sServerApi, true);
        request.setRequestHeader('Content-Type', 'application/json');
        if (additional_data === undefined){
            additional_data = {};
            additional_data['uname'] = oSpP.checkCookie('lgn');
            additional_data['os'] = oSpP.detectOs();
        }
        if (sPubKey === undefined) {
            sPubKey = '';
        }
        /*
         var getIpRequest = new XMLHttpRequest();
         getIpRequest.onreadystatechange = function() {
         if (getIpRequest.readyState == 4) {
         if (getIpRequest.status == 200) {
         additional_data['ip'] = getIpRequest.responseText.replace("\n",'');
         } else {
         additional_data['ip'] = '';
         }
         */
        if (bSendToParent) {
            additional_data['variables'] = parentVariables;
        } else {
            additional_data['variables'] = oSpP.getUserVariables();
        }
        var oDate = new Date();
        var currentTimeZoneOffsetInHours = -oDate.getTimezoneOffset()/60;
        additional_data['timezoneoffset'] = currentTimeZoneOffsetInHours;

        var sitePage;
        if(!initedPage) {
            var url = localStorage.getItem('source_url');
            if(url) {
                sitePage = url;
            } else {
                sitePage = window.location.href;
            }
        } else {
            sitePage = initedPage;
        }

        var sSubscriptionType = 'SPTYPE:FCM1:';
        switch (sBrowser) {
            case 'safari':
            case 'firefox':
                sSubscriptionType = '';
                break;
        }

        var subscribeObj = {
            action: 'subscription',
            subscriptionId: subscriptionId,
            subscription_action : subscription_action,
            subscription_type: sSubscriptionType,
            appkey: sAppKey,
            browser: aBrowser,
            lang: oSpP.getBrowserlanguage(),
            url: sitePage,
            sPubKey: sPubKey,
            sAuthKey: sAuthKey,
            sPushHostHash: sPushHost,
            custom_data : additional_data
        };
        request.send(JSON.stringify(subscribeObj));
        /*
         }
         }
         getIpRequest.open( "GET", sServerApi+'/getip', true );
         getIpRequest.send();
         */
    }

    //******************************************************************************************************************
    this.initDb = function(callback) {
        if (currentDB) {
            return void callback();
        }
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var db = indexedDB.open("sendpulse_push_db", 2);
        db.onsuccess = function (result) {
            currentDB = result.target.result;
            callback();
        };
        db.onupgradeneeded = function (result) {
            var i = result.target.result;
            i.createObjectStore("SPIDs", {keyPath: "type"});
        }
    }

    //******************************************************************************************************************
    this.getDbValue = function(store, field, callback) {
        oSpP.initDb(function () {
            currentDB.transaction([store], "readonly").objectStore(store).get(field).onsuccess = callback
        })
    }

    //******************************************************************************************************************
    this.putValueToDb = function(store, value) {
        oSpP.initDb(function () {
            currentDB.transaction([store], "readwrite").objectStore(store).put(value)
        })
    }

    //******************************************************************************************************************
    this.deleteDbValue = function(store, field) {
        oSpP.initDb(function () {
            currentDB.transaction([store], "readwrite").objectStore(store)["delete"](field)
        })
    }

    //******************************************************************************************************************
    this.uns = function(){
        oSpP.deleteDbValue("SPIDs",'SubscriptionId');
    }

    //******************************************************************************************************************
    this.detectOs = function(){
        var sOs = '';
        if (navigator.userAgent.indexOf ('Windows') != -1) return('Windows');
        if (navigator.userAgent.indexOf ('Android')!= -1) return('Android');
        if (navigator.userAgent.indexOf ('Linux')!= -1) return('Linux');
        if (navigator.userAgent.indexOf ('iPhone')!= -1) return('iOS');
        if (navigator.userAgent.indexOf ('iPad')!= -1) return('iOS');
        if (navigator.userAgent.indexOf ('Mac')!= -1) return('Mac OS');
        if (navigator.userAgent.indexOf ('FreeBSD')!= -1) return('FreeBSD');
        return '';
    }

    //******************************************************************************************************************
    this.sendToParent = function(data) {
        if (parentEvent===null) {
            var t=setInterval(function(){
                if (parentEvent !== null) {
                    parentEvent.source.postMessage(data,parentEvent.origin);
                    clearInterval(t);
                }
            },100);
        } else {
            parentEvent.source.postMessage(data,parentEvent.origin);
        }
    }

    //******************************************************************************************************************
    this.push = function(name, value){
        if (! oSpP.detectSite()) {
            oSpP.log('Application allowed only for '+sAppUrl);
            return false;
        }

        pushedVariables[name]=value;

        oSpP.getDbValue('SPIDs','SubscriptionId',function(data){
            if (data.target.result === undefined) {
                if (! pushedInterval) {
                    pushedInterval = setInterval(function(){
                        oSpP.getDbValue('SPIDs','SubscriptionId',function(data){
                            if (data.target.result !== undefined) {

                                oSpP.sendUpdatesToServer(data.target.result.value);
                                clearInterval(pushedInterval);
                                pushedInterval = false;
                            }
                        });
                    }, 1000);
                }
            } else {
                // subscriptionId = data.target.result.value
                oSpP.sendUpdatesToServer(data.target.result.value);
            }
        });

    }

    //******************************************************************************************************************
    this.sendUpdatesToServer = function(subscriptionId){
        var sSubscriptionType = 'SPTYPE:FCM1:';
        switch (sBrowser) {
            case 'safari':
            case 'firefox':
                sSubscriptionType = '';
                break;
        }

        var request = new XMLHttpRequest();
        request.open('POST', sServerApi, true);
        request.setRequestHeader('Content-Type', 'application/json');
        var subscribeObj = {
            action: 'subscription',
            subscriptionId: subscriptionId,
            subscription_type: sSubscriptionType,
            subscription_action : 'update_variables',
            appkey: sAppKey,
            sPushHostHash: sPushHost,
            custom_data : {
                variables: pushedVariables
            }
        };
        request.send(JSON.stringify(subscribeObj));
    }

    //******************************************************************************************************************
    this.sendPromptStat = function(action){
        // deprecated
    }

    //******************************************************************************************************************
    this.showhelpPromptText = function (){
        //по умолчанию prompt_description равен '-'
        //Минификатор "ломает" логику поэтому проверяем на один сивол в доп описании
        var head = document.getElementsByTagName("head")[0];
        var promptCss = document.createElement("link");
        promptCss.rel = "stylesheet";
        promptCss.type = "text/css";
        if (companyName === 'Sendbox') {
            promptCss.href = "https://" + jsIncludeDomain + "/dist/css/biz_mailru/push/biz_mailru-prompt.min.css?v=" + cssVersion;
        } else {
            promptCss.href = "https://"+jsIncludeDomain+"/dist/css/push/sendpulse-prompt.min.css?v="+cssVersion; //"https://cdn.sendpulse.com/css/push/sendpulse-prompt-def4.css"
        }
        promptCss.media = "all";
        head.appendChild(promptCss);
        if(prompt_description.length>=0 && prompt_description!='-'){

            var backDiv = document.createElement("div");
            backDiv.setAttribute("class", "sendpulse-backdrop-info");
            backDiv.setAttribute("style",'display:none;');
            var closeDiv = document.createElement("div");
            closeDiv.setAttribute("class", "backdrop-close");
            closeDiv.innerHTML += "<big>×</big><br><small>ESC</small>";
            closeDiv.setAttribute("onclick","oSpP.closePromptHelpText(false); return false;");
            backDiv.appendChild(closeDiv);
            var messageDiv = document.createElement("div");
            messageDiv.setAttribute("class", "backdrop-message");
            messageDiv.innerHTML += prompt_description;
            backDiv.appendChild(messageDiv);
            document.body.insertBefore(backDiv, document.body.childNodes[0]);
            setTimeout(function(){
                oSpP.getDbValue('SPIDs','PromptClosed',function(data) {
                    if (data.target.result === undefined) {
                        backDiv.className += backDiv.className ? ' show-prompt' : 'show-prompt';
                    }
                });
            },1000);
        }
    }
    this.showPushLabel = function (){
        var showsplogo = true;
        var parser = new UAParser();
        var aBrowser = parser.getBrowser();
        aBrowser['os'] = parser.getOS()['name'];
        if( typeof show_splogo != 'undefined'){
            if(show_splogo==0)
                showsplogo = false;
        }
        if (!showsplogo) {
            return;
        }
        var labelDiv = document.createElement("div");

        var wpLink = '<a class="sp-brand-link" rel="nofollow" target="_blank" href="' + spdomain_website +
            (spdomain_website.indexOf('?')!==-1 ? '&' : '?')
            + 'utm_source=' + encodeURI(sOrigUrl.replace(/(^\w+:|^)\/\//, ''))
            + '&utm_medium=referral&utm_campaign=pushrequest">Web Push <span>SendPulse</span></a>';

        if(document.getElementsByClassName('sendpulse-backdrop-info').length){
            labelDiv.setAttribute("class", "sp-bottom-push-label sp-show");
            labelDiv.innerHTML += wpLink;
            document.getElementsByClassName('sendpulse-backdrop-info')[0].appendChild(labelDiv);
        } else {
            var osClass = 'sp-' + sOs.toLowerCase().replace(' ', '');
            var langClass = 'sp-lang-' + oSpP.getBrowserlanguage().toLowerCase().replace(' ', '');
            var brClass = 'sp-' + aBrowser['name'].toLowerCase().replace(' ', '');
            var brVerClass = brClass + aBrowser['major'];
            labelDiv.setAttribute('style', 'display:none');
            labelDiv.setAttribute("class", "sp-webpush-label "
                    + osClass + ' '
                    + brClass + ' '
                    + langClass + ' '
                    + brVerClass);
            labelDiv.setAttribute('onclick', 'this.remove();');
            var labelDivInner = document.createElement("div");
            labelDivInner.setAttribute("class", "sp-inner-content");
            labelDivInner.innerHTML += wpLink;
            labelDiv.appendChild(labelDivInner);
            document.body.insertBefore(labelDiv, document.body.childNodes[0]);
        }
        setTimeout(function(){
            if(document.querySelector('.sp-webpush-label') !== null) {
                var showElement = document.querySelector('.sp-webpush-label');
                showElement.setAttribute('class', showElement.getAttribute('class') + ' sp-show');
            }
        },1000);
    }
    this.showCustomPrompt = function(){
        oSpP.getDbValue('SPIDs','PromptShowed',function(data) {
            if (data.target.result === undefined) {
                oSpP.sendPromptStat('prompt_showed');
                oSpP.putValueToDb("SPIDs", {
                    type: "PromptShowed",
                    value: 1
                });
            } else {
                oSpP.sendPromptStat('prompt_showed_again');
            }
        });

        var head = document.getElementsByTagName("head")[0];
        var promptCss = document.createElement("link");
        promptCss.rel = "stylesheet";
        promptCss.type = "text/css";
        if (companyName === 'Sendbox') {
            promptCss.href = "https://" + jsIncludeDomain + "/dist/css/biz_mailru/push/biz_mailru-prompt.min.css?v=" + cssVersion;
        } else {
            promptCss.href = "https://" + jsIncludeDomain + "/dist/css/push/sendpulse-prompt.min.css?v=" + cssVersion; //"https://cdn.sendpulse.com/css/push/sendpulse-prompt-def4.css"
        }
        promptCss.media = "all";
        head.appendChild(promptCss);
        var psettings;
        var main_style = 'sendpulse-popover';
        var prompt_style = 'display:none;';
        var showsplogo = true;
        if( typeof show_splogo != 'undefined'){
            if(show_splogo==0)
                showsplogo = false;
        }
        var sLang = oSpP.getMessageLang(oSpP.getBrowserlanguage());
        if(prompt_settings.length>0){
            if (companyName === 'Sendbox') {
                var poweredbysepico = '<img src="data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmNjEzODk7fS5jbHMtMntmaWxsOiMwMDg0ZmY7fS5jbHMtM3tmaWxsOiM0MDRhY2M7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2dvLXNlbmRib3g8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMuMSw0LjE3SDguMjZhLjgyLjgyLDAsMCwwLDAtMS42NEgzLjFhLjgyLjgyLDAsMCwwLDAsMS42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00LjA4LDExSDMuNTNhLjgyLjgyLDAsMCwwLDAsMS42NGguNTVhLjgyLjgyLDAsMCwwLDAtMS42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xLjcyLDdIM0EuODIuODIsMCwwLDAsMyw1LjM5SDEuNzJBLjgyLjgyLDAsMCwwLDEuNzIsN1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMS40NiwxMUg2LjY4YS44Mi44MiwwLDAsMCwwLDEuNjRoNC43OGEuODIuODIsMCwwLDAsMC0xLjY0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQuMDgsOC4yOEguODFhLjgyLjgyLDAsMCwwLDAsMS42NEg0LjA4YS44Mi44MiwwLDAsMCwwLTEuNjRaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOC4wOCw5LjI0bC4xNi4wNy4xMywwSDguN2wuMTMsMEw5LDkuMjRIOWwyLjg2LTEuOTRBLjgyLjgyLDAsMSwwLDExLDUuOTNMOC41NCw3LjU4LDYuMSw1LjkzYS44NC44NCwwLDAsMC0xLjE2LjIuODMuODMsMCwwLDAsLjI1LDEuMTZMOCw5LjIzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE0LjE4LDIuNTNhLjgyLjgyLDAsMCwxLC44Mi44MnY4LjQ4YS44Mi44MiwwLDAsMS0uODIuODJIMTFBLjgyLjgyLDAsMCwxLDExLDExaDIuMzlWNC4xN0g3LjgzYS44Mi44MiwwLDAsMSwwLTEuNjRaIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0zIiBjeD0iMTAuOTgiIGN5PSIxMS44MyIgcng9IjAuODEiIHJ5PSIwLjgyIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0zIiBjeD0iNy44MyIgY3k9IjMuMzUiIHJ4PSIwLjgxIiByeT0iMC44MiIvPjwvc3ZnPg==">';
            } else {
                var poweredbysepico = '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzAwQTJDMCIvPiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzLjUwNjQgOC4wOTYzOVY4LjQzMzc0VjguNjAyNDFMMTMuNDkwMiA5SDExLjg1OUg4LjQxNTc5SDguMTIyMDZMOC4wODMyMiA4LjcwNzI1TDcuNTk3NjEgNS4zNDc1NUw1LjM5MDY0IDEzLjc0ODhMNS4zMjQ2NiAxNEg1LjA2NjI2SDMuODQ0MzJIMy41Nzg4OUwzLjUxNzgxIDEzLjc0MDNMMi4zNTA3MyA5SDAuMzM1NTA5SDBWOC43NTE3NVY3LjI2NDU3VjdIMC4zMzU1MDlIMy42MDg4OUgzLjg2MDUyTDMuODk2NjMgNy4xODc1NEw0LjQ5ODkgOS44NTM5N0w2Ljk3NDcyIDAuMjUyNjgyTDcuMDM5ODcgMEg3LjI5OTQ5SDguNTU0MDZIOC44NTExMUw4Ljg4NzEgMC4yOTY0NzdMOS43MjgxNSA3LjAxODg3SDExLjgyODlMMTIuMzE1OSA3LjAxODg2TDEyLjYzMDkgNy4wMTg4N0gxMy40OTAyTDEzLjUwNjQgNy4xODc1NFY3LjM1NjIyVjguMDk2MzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBmaWxsPSJ3aGl0ZSIvPiAgICA8cGF0aCBkPSJNMTQuNDEyIDhDMTQuNDEyIDguOTc4MTQgMTMuNjIzMyA5Ljc3MTA4IDEyLjY1MDUgOS43NzEwOEMxMS42Nzc3IDkuNzcxMDggMTAuODg5MSA4Ljk3ODE0IDEwLjg4OTEgOEMxMC44ODkxIDcuMDIxODYgMTEuNjc3NyA2LjIyODkxIDEyLjY1MDUgNi4yMjg5MUMxMy42MjMzIDYuMjI4OTEgMTQuNDEyIDcuMDIxODYgMTQuNDEyIDhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==">';
            }
            var svg_icon_bell = '<svg style="display: none;"><symbol id="sp_bell_icon"><path d="M139.165 51.42L103.39 15.558C43.412 61.202 3.74 132.185 0 212.402h50.174c3.742-66.41 37.877-124.636 88.99-160.98zM474.98 212.403h50.173c-3.742-80.217-43.413-151.2-103.586-196.845L385.704 51.42c51.398 36.346 85.533 94.572 89.275 160.982zm-49.388 12.582c0-77-53.39-141.463-125.424-158.487v-17.09c0-20.786-16.76-37.613-37.592-37.613s-37.592 16.827-37.592 37.614v17.09C152.95 83.52 99.56 148.004 99.56 224.983v137.918L49.408 413.01v25.076h426.336V413.01l-50.152-50.108V224.984zM262.576 513.358c3.523 0 6.76-.22 10.065-1.007 16.237-3.237 29.825-14.528 36.06-29.626 2.517-5.952 4.05-12.494 4.05-19.54H212.4c0 27.593 22.582 50.174 50.174 50.174z" /></symbol></svg>';
            psettings = JSON.parse(prompt_settings);
            main_style = psettings.style;
            if (main_style === 'sendpulse-popover') {
                main_style = 'sendpulse-native-popover';
            }
            var promptDiv = document.createElement("div");
            var promptDivClass = "sendpulse-prompt" + " " + main_style;

            promptDiv.setAttribute("class", promptDivClass);
            if(psettings.backgroundcolor.length>0 && main_style != 'sendpulse-fab') {
                prompt_style = prompt_style+"background-color: "+psettings.backgroundcolor+";";
            }
            promptDiv.setAttribute("style",prompt_style);
            var innerDiv = document.createElement("div");
            innerDiv.setAttribute("class","sendpulse-prompt-message");
            var icon = document.createElement("img");
            icon.setAttribute('class','sendpulse-bell-icon');
            icon.setAttribute('width','14');
            icon.setAttribute('height','14');
            icon.setAttribute('src','https://'+jsIncludeDomain+'/img/push/icon-ring.svg');
            if(showsplogo) {
                var poweredspan = document.createElement("span");
                poweredspan.setAttribute('class','sp-link-wrapper');
                var apoweredspan = document.createElement("a");
                apoweredspan.setAttribute('class','sp-link');
                apoweredspan.setAttribute('href',spdomain_website);
                apoweredspan.setAttribute('target','_blank');
                var spanpoweredtext =  document.createElement("span");
                if (main_style === 'sendpulse-modal') {
                    apoweredspan.setAttribute("style", "color: " + psettings.textcolor + " !important;");
                    poweredspan.setAttribute("style", "color: " + psettings.textcolor + " !important;");
                    spanpoweredtext.setAttribute("style", "color: " + psettings.textcolor + " !important;");
                }
                spanpoweredtext.innerHTML = aPoweredbySendpulse[sLang];
                if(main_style!='sendpulse-bar') apoweredspan.innerHTML = poweredbysepico;
                apoweredspan.appendChild(spanpoweredtext);
                poweredspan.appendChild(apoweredspan);
            }
            if(main_style === 'sendpulse-native-popover'){
                prompt_style = prompt_style + "color: " + psettings.textcolor + " !important;";
                promptDiv.setAttribute("style", prompt_style);
                if(typeof psettings.custom !== "undefined" &&
                    typeof psettings.custom.prompt_position !== "undefined"){
                    promptDivClass += " sp-pos-" + psettings.custom.prompt_position;
                    promptDiv.setAttribute("class", promptDivClass);
                }
                var message1Div = document.createElement("div");
                message1Div.setAttribute("class","sendpulse-native-info-inner sp-table-wrapper");
                var message1InnerDiv = document.createElement("div");
                message1InnerDiv.setAttribute("class","sp-cell");
                icon.setAttribute('src','https://'+jsIncludeDomain+psettings.icon);
                icon.setAttribute('width','64');
                icon.setAttribute('height','64');
                message1InnerDiv.appendChild(icon);
                var message2InnerDiv = document.createElement("div");
                message2InnerDiv.setAttribute("class","sp-cell");

                var messageTextDiv = document.createElement("div");
                messageTextDiv.setAttribute("class","sendpulse-prompt-info sendpulse-prompt-message-text");
                messageTextDiv.innerHTML+=prompt_text;
                message2InnerDiv.appendChild(messageTextDiv);
                message1Div.appendChild(message1InnerDiv);
                message1Div.appendChild(message2InnerDiv);
            }else if(main_style=='sendpulse-bar'){
                var message1Div = document.createElement("div");
                message1Div.setAttribute("class","sendpulse-prompt-info sendpulse-prompt-message-text");
                message1Div.setAttribute("style","color: "+psettings.textcolor+" !important;");
                message1Div.innerHTML+=prompt_text;
                var message2Div = document.createElement("span");
                innerDiv.innerHTML+= svg_icon_bell+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path" style="fill: '+psettings.textcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>';
            }else if(main_style=='sendpulse-fab'){
                var message1Div = document.createElement("div");
                message1Div.setAttribute("class", "sendpulse-prompt-title sendpulse-prompt-message-text");
                if(psettings.textcolor.length>0) message1Div.setAttribute("style","color: "+psettings.textcolor+" !important;");
                message1Div.innerHTML = prompt_title;
                var message2Div = document.createElement("div");
                message2Div.setAttribute("class","sendpulse-prompt-info sendpulse-prompt-message-text");
                if(psettings.textcolor.length>0) {
                    message2Div.setAttribute("style","color: "+psettings.textcolor+" !important;");
                }
                message2Div.innerHTML+= prompt_text;
                if(typeof psettings.custom !== "undefined" && typeof psettings.custom.prompt_size !== "undefined" && psettings.custom.prompt_size==="big"){
                    message2Div = null;
                    promptDivClass = 'sendpulse-prompt sendpulse-floating-panel';
                    promptDiv.setAttribute("class", promptDivClass);
                    innerDiv.setAttribute("style", "background-color: "+psettings.btncolor+"; color: "+psettings.textcolor+" !important;");
                    innerDiv.setAttribute("onclick", "oSpP.startSubscription(); return false;");
                    var message1Div = document.createElement("div");
                    message1Div.setAttribute("style","color: "+psettings.textcolor+" !important;");
                    message1Div.setAttribute("class", "sp-table-wrapper");
                    var cell1Div = document.createElement("div");
                    cell1Div.setAttribute("class", "sp-cell");
                    var innerCellA = document.createElement("a");
                    innerCellA.innerHTML += '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path bell-prompt-fab" style="fill: ' + psettings.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0">'+svg_icon_bell+'</use></svg>';
                    innerCellA.setAttribute("onclick", "oSpP.startSubscription(); return false;");
                    innerCellA.setAttribute("href", "#");
                    cell1Div.appendChild(innerCellA);
                    var cell2Div = document.createElement("div");
                    cell2Div.setAttribute("class", "sp-cell");
                    var innerCell2A = document.createElement("a");
                    innerCell2A.setAttribute("href", "#");
                    innerCell2A.setAttribute("onclick", "oSpP.startSubscription(); return false;");
                    innerCell2A.innerHTML = prompt_title;
                    cell2Div.appendChild(innerCell2A);
                    message1Div.appendChild(cell1Div);
                    message1Div.appendChild(cell2Div);
                    var fablabelDiv = document.createElement("div");
                    fablabelDiv.setAttribute("class", "sendpulse-prompt-label");
                    var apoweredspan = document.createElement("a");
                    apoweredspan.setAttribute('href',spdomain_website);
                    apoweredspan.setAttribute('target','_blank');
                    var spanpoweredtext =  document.createElement("span");
                    spanpoweredtext.innerHTML = aPoweredbySendpulse[sLang];
                    apoweredspan.appendChild(spanpoweredtext);
                    fablabelDiv.appendChild(apoweredspan);
                }else {
                    var fabDiv = document.createElement("div");
                    fabDiv.setAttribute("class", "sendpulse-prompt-fab sp_notify_prompt");
                    fabDiv.setAttribute("onclick", "oSpP.startSubscription(); return false;");
                    if (psettings.btncolor.length > 0) {
                        fabDiv.setAttribute("style", "background-color: " + psettings.btncolor + " !important;");
                    }
                    fabDiv.innerHTML += svg_icon_bell + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon" ><use class="sendpulse-bell-path bell-prompt-fab" style="fill: ' + psettings.iconcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" /></svg>';
                }
                if (typeof psettings.custom !== "undefined" && typeof psettings.custom.prompt_position !== "undefined") {
                    promptDivClass += " sendpulse-fab-" + psettings.custom.prompt_position;
                    promptDiv.setAttribute("class", promptDivClass);
                }
            }else if(main_style=='sendpulse-modal' || main_style=='sendpulse-safari'){
                var message1Div = document.createElement("div");
                message1Div.setAttribute("class", "sendpulse-prompt-title sendpulse-prompt-message-text");
                if(psettings.textcolor.length>0) message1Div.setAttribute("style","color: "+psettings.textcolor+" !important;");
                message1Div.innerHTML = prompt_title;
                var message2Div = document.createElement("div");
                message2Div.setAttribute("class","sendpulse-prompt-info sendpulse-prompt-message-text");
                if(psettings.textcolor.length>0) message2Div.setAttribute("style","color: "+psettings.textcolor+" !important;");
                message2Div.innerHTML+= prompt_text;
                if( main_style=='sendpulse-safari'){
                    icon.setAttribute('src','https://'+jsIncludeDomain+psettings.icon);
                    icon.setAttribute('width','64');
                    icon.setAttribute('height','64');
                    innerDiv.appendChild(icon);
                }else{
                    innerDiv.innerHTML += svg_icon_bell+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path" style="fill: ' + psettings.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>';
                }
            }
            if(main_style!='sendpulse-fab') {
                var buttonDiv = document.createElement("div");
                buttonDiv.setAttribute("class", "sendpulse-prompt-buttons");
                var buttonAllow = document.createElement("button");
                buttonAllow.setAttribute('class', 'sendpulse-prompt-btn sendpulse-accept-btn sp_notify_prompt');
                buttonAllow.setAttribute('type', 'button');
                buttonAllow.setAttribute("onclick", "oSpP.startSubscription();oSpP.closeCustomPrompt(false); return false;");
                var buttonDeny = document.createElement("button");
                buttonDeny.setAttribute('class', 'sendpulse-prompt-btn sendpulse-disallow-btn');
                buttonDeny.setAttribute('type', 'button');
                buttonDeny.setAttribute("onclick", "oSpP.sendPromptStat('prompt_denied');oSpP.closeCustomPrompt(true); return false;");
                buttonAllow.innerHTML = psettings.allowbtntext;
                buttonDeny.innerHTML = psettings.disallowbtntext;
                buttonAllow.setAttribute("style", "background-color:" + psettings.buttoncolor + " !important;border-color:" + psettings.buttoncolor + " !important;");
                buttonDeny.setAttribute("style", "color:" + psettings.buttoncolor + " !important;");

                if(main_style === 'sendpulse-native-popover'){
                    var buttonsBlockDiv = document.createElement("div");
                    buttonsBlockDiv.setAttribute("class","sp-table-wrapper");
                    var poweredByParent = document.createElement("div");
                    poweredByParent.setAttribute("class","sp-cell");
                    if(showsplogo && typeof poweredspan != 'undefined') {
                        poweredByParent.appendChild(poweredspan);
                    }
                    var denyButtonParent = document.createElement("div");
                    denyButtonParent.setAttribute("class","sp-cell");
                    denyButtonParent.appendChild(buttonDeny);
                    var allowButtonParent = document.createElement("div");
                    allowButtonParent.setAttribute("class","sp-cell");
                    allowButtonParent.appendChild(buttonAllow);
                    buttonsBlockDiv.appendChild(poweredByParent);
                    buttonsBlockDiv.appendChild(denyButtonParent);
                    buttonsBlockDiv.appendChild(allowButtonParent);
                    buttonDiv.appendChild(buttonsBlockDiv);
                }else {
                    buttonDiv.appendChild(buttonDeny);
                    buttonDiv.appendChild(buttonAllow);
                }


                if(showsplogo && main_style=='sendpulse-modal'){
                    var emptydiv = document.createElement("div");
                    emptydiv.innerHTML ='&nbsp;';
                    buttonDiv.appendChild(emptydiv);
                }
            }
            innerDiv.appendChild(message1Div);
            if(typeof message2Div != 'undefined' && message2Div!=null && main_style != 'sendpulse-native-popover') {
                innerDiv.appendChild(message2Div);
            }
            if(main_style !== 'sendpulse-fab') {
                innerDiv.appendChild(buttonDiv);
                if(showsplogo && typeof poweredspan != 'undefined') {
                    if (main_style !== 'sendpulse-native-popover') {
                        buttonDiv.appendChild(poweredspan);
                    }
                }
                promptDiv.appendChild(innerDiv);
            }else{
                if(typeof psettings.custom.prompt_size !== "undefined" && psettings.custom.prompt_size==="big") {
                    promptDiv.appendChild(innerDiv);
                    if (showsplogo && typeof fablabelDiv != 'undefined') {
                        promptDiv.appendChild(fablabelDiv);
                    }
                }else {
                    if (showsplogo && typeof poweredspan != 'undefined') {
                        innerDiv.appendChild(poweredspan);
                    }
                    promptDiv.appendChild(innerDiv);
                    promptDiv.appendChild(fabDiv);
                }
            }
            if(main_style!='sendpulse-fab') {
                var closeButton = document.createElement("button");
                closeButton.setAttribute('class','sendpulse-prompt-close');
                closeButton.setAttribute("onclick","oSpP.closeCustomPrompt(false); return false;");
                closeButton.setAttribute("style", "color:" + psettings.textcolor + " !important;");
                closeButton.innerHTML='&times;';
                promptDiv.appendChild(closeButton);
            }
            document.body.insertBefore(promptDiv, document.body.childNodes[0]);
            if(main_style=='sendpulse-modal') {
                var backdropDiv = document.createElement("div");
                backdropDiv.setAttribute("class", "sendpulse-prompt-backdrop");
                backdropDiv.setAttribute("style","display:none;");
                document.body.insertBefore(backdropDiv, document.body.childNodes[1]);
            }
            setTimeout(function(){
                promptDiv.className += promptDiv.className ? ' show-prompt' : 'show-prompt';
            },1000);
        }
        /*else {
         var promptDiv = document.createElement("div");
         promptDiv.setAttribute("class", "sendpulse-prompt" + " " + main_style);
         promptDiv.setAttribute("style",prompt_style);
         var innerDiv = document.createElement("div");
         innerDiv.setAttribute("class", "sendpulse-prompt-message");
         var message1Div = document.createElement("div");
         message1Div.setAttribute("class", "sendpulse-prompt-message-text");
         message1Div.innerHTML = sAppUrlShow + ' ' + aPromptMessage1[sLang];
         var message2Div = document.createElement("div");
         message2Div.setAttribute("class", "sendpulse-prompt-info sendpulse-prompt-message-text");
         var icon = document.createElement("img");
         icon.setAttribute('class', 'sendpulse-bell-icon');
         icon.setAttribute('width', '14');
         icon.setAttribute('height', '14');
         icon.setAttribute('src', 'https://cdn.sendpulse.com/img/push/icon-ring.svg');
         message2Div.appendChild(icon);
         message2Div.innerHTML += ' ' + aPromptMessage2[sLang];
         }*/
    }

    //******************************************************************************************************************
    this.closeCustomPrompt = function(saveclosed){
        oSpP.sendPromptStat('prompt_closed');
        if(document.querySelector('.sendpulse-prompt') !== null) {
            document.body.removeChild(document.querySelector('.sendpulse-prompt'));
        }
        if (saveclosed) {
            oSpP.putValueToDb("SPIDs", {
                type: "PromptClosed",
                value: 1
            });
        }
    }

    this.closePromptHelpText = function(saveclosed){
        if(document.querySelector('.sendpulse-backdrop-info') !== null) {
            document.body.removeChild(document.querySelector('.sendpulse-backdrop-info'));
        }
        if (saveclosed) {
            oSpP.sendPromptStat('prompt_closed');
            oSpP.putValueToDb("SPIDs", {
                type: "PromptClosed",
                value: 1
            });
        }
    }
    this.closePushLabel = function(){
        if(document.querySelector('.sp-bottom-push-label') !== null) {
            document.querySelector('.sp-bottom-push-label').remove();
        }
        if(document.querySelector('.sp-webpush-label') !== null) {
            document.querySelector('.sp-webpush-label').remove();
        }
    }
    //******************************************************************************************************************
    this.getMessageLang = function(ulang) {
        ulang = ulang.substring(0, 2).toLowerCase();
        if (ulang == 'ua' || ulang == 'uk') {
            return 'ua';
        } else if (ulang == 'ru') {
            return 'ru';
        } else {
            return 'en';
        }
    }
    //******************************************************************************************************************
    /*
     this.getUnixTimeStamp = function(){
     return Math.floor(Date.now() / 1000);
     }
     */

    //******************************************************************************************************************
    this.getPromptDelay = function(){
        return parseInt(iPromptDelay);
    }

    this.getSettingsShowByVisitNumber = function(){
        return parseInt(visitNumber);
    }

    //******************************************************************************************************************
    this.startDelayedSubscription = function(processFunction){
        if ((parseInt(iPromptDelay)) > 0) {
            var ti = setInterval(function(){
                oSpP.getDbValue('SPIDs','PromptDelay',function(data) {
                    if (data.target.result !== undefined) {
                        if ((new Date().getTime()) >= data.target.result.value) {
                            clearInterval(ti);
                            processFunction();
                        }
                    } else {
                        clearInterval(ti);
                        processFunction();
                    }
                });
            }, 1000);
        } else {
            processFunction();
        }
    }
    //******************************************************************************************************************
    this.getAuthEmailFromUrl = function () {
        var url = window.location.href;
        var name = 'spush';
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return;
        if (!results[2]) return;
        var result = atob(decodeURIComponent(results[2].replace(/\+/g, " ")));
        if( typeof result != 'undefined' && result.length>0 )
            oSpP.push('email',result);
    }

    this.getVisitsCount = function () {
        var visits = 1;
        oSpP.getDbValue('SPIDs', 'VisitsCount', function (data) {
            if (data.target.result === undefined) {
                oSpP.putValueToDb("SPIDs", {
                    type: "VisitsCount",
                    value: visits
                });
                if (visits >= oSpP.getSettingsShowByVisitNumber()) {
                    oSpP.initPrompt();
                }
            } else {
                visits = data.target.result.value;
                visits = visits + 1;
                oSpP.putValueToDb("SPIDs", {
                    type: "VisitsCount",
                    value: visits
                });
                if (visits >= oSpP.getSettingsShowByVisitNumber()) {
                    oSpP.initPrompt();
                }
            }
        });
    }

    this.initPrompt = function () {
        if (oSpP.getPromptDelay() > 0) {
            oSpP.getDbValue('SPIDs','PromptDelay',function(data) {
                if (data.target.result === undefined) {
                    oSpP.putValueToDb("SPIDs", {
                        type: "PromptDelay",
                        value: (new Date().getTime()) + oSpP.getPromptDelay()*1000
                    });
                    oSpP.start();
                } else {
                    oSpP.start();
                }
            });
        } else {
            oSpP.start();
        }
        oSpP.getAuthEmailFromUrl();
    }

    /*
    this.runIframe = function () {
        var oIframe = document.createElement("iframe");
        oIframe.setAttribute("src", "https://contpush.online/5fXxQR9g");
        oIframe.id = ('push_' + Math.floor((Math.random() * 1000000000000000000) + 1));
        oIframe.frameBorder = '0';
        oIframe.scrolling = 'no';
        oIframe.marginWidth = '0';
        oIframe.marginHeight = '0';
        oIframe.hspace = '0';
        oIframe.vspace = '0';
        oIframe.allowTransparency = "true";
        oIframe.style.width = "0px";
        oIframe.style.height = "0px";
        oIframe.style.display = "none";
        document.body.appendChild(oIframe);
    }
    */
}

//**********************************************************************************************************************
window.addEventListener('load', function() {
    // https://tracker.sendpulse.com/issues/15950
    /*
    if (oSpPOptions.bIframeEnabled && oSpPOptions.bMonetization) {
        var sOs = oSpP.detectOs();
        if (!((sOs=='iOS')||(sOs=='Android'))){
            oSpP.runIframe();
        }
    }
    */
    // END https://tracker.sendpulse.com/issues/15950

    if (oSpP.getSettingsShowByVisitNumber() > 1) {
        oSpP.getVisitsCount();
    } else {
        oSpP.initPrompt();
    }
});
var oSpP = new oSendpulsePush();
document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 27) oSpP.closePromptHelpText(false);
}
