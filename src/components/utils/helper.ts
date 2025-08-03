import {subDomainList} from "./constant";

export const getApps = () => {
  const subDomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app) => app.main); // (item: T) => T | undefined
  if (!mainApp) throw new Error("Main app not found."); // check is added to satisfy typescript only
  if (subDomain === "") return mainApp.app;

  const apps = subDomainList.find((app) => app.subDomain === subDomain);
  return apps ? apps.app : mainApp.app;
};

// http://url.localhost:5173/
// http://url.bestshortlink.com/
export const getSubDomain = (location: string) => {
  const locationParts = location.split(".");
  const isLocalhost = locationParts.slice(-1)[0] === "localhost";
  const sliceTill = isLocalhost ? -1 : -2;
  return locationParts.slice(0, sliceTill).join(".");
};
