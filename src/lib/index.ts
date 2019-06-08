import { createContext, useEffect, useContext } from "react";

interface ClientConfigI {
  clientId: string;
  redirectURI: string;
  scope: string;
  state: string;
}

interface AuthI {
  init(config?: ClientConfigI): void; 
  signIn(config?: ClientConfigI): void;
}

interface AppleID {
  auth: AuthI;
}

declare global {
  interface Window { AppleID: AppleID; }
}

const APPLEID_AUTH_SDK_URL: string = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
const APPLEID_AUTH_SDK_ELEMENT_ID: string = "__appleid_auth_sdk";

const AppleIDConfigContext = createContext({
  loaded: false,
});

const loadSDK = () => new Promise((resolve, reject) => {
  const existingScript = document.getElementById(APPLEID_AUTH_SDK_ELEMENT_ID);

  if (existingScript) {
    resolve();
    return;
  }

  const script = document.createElement('script');
  script.src = APPLEID_AUTH_SDK_URL;
  script.id = APPLEID_AUTH_SDK_ELEMENT_ID;
  document.body.appendChild(script);

  script.onload = () => {
    resolve();
  };

  script.onerror = () => {
    reject();
  }

  return;
});

const initSDK = async (config?: ClientConfigI) => {
  window.AppleID.auth.init(config);
}

export const useAppleID = (config?: ClientConfigI) => {
  const ctx = useContext(AppleIDConfigContext);

  useEffect(() => {
    loadSDK().then(() => initSDK(config)).then(() => {
      ctx.loaded = true;
    })
  }, [ctx, config]);

  const signIn = () => {
    window.AppleID.auth.signIn();
  }

  return { signIn };
}
