import AppRouter, {SubDomainRouter} from "../../AppRouter";

export const subDomainList = [
  {subDomain: "www", app: AppRouter, main: true},
  {subDomain: "url", app: SubDomainRouter, main: false},
];
