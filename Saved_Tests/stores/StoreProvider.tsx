//import React, { createContext, useContext } from "react";
import CompanyHeaderStore from "./companyHeaderStore";
import CommonStore from "./commonStore";
import CompanyStore from "./companyStore";

import { enableStaticRendering } from "mobx-react-lite";
import React, { createContext, ReactNode, useContext } from "react";
import { RootStore, RootStoreHydration } from "./RootStore";

enableStaticRendering(typeof window === "undefined");

interface Store {
    companyHeaderStore: CompanyHeaderStore;
    commonStore: CommonStore;
    companyStore: CompanyStore;
}

export const store: Store = {
    companyStore: new CompanyStore(),
    companyHeaderStore: new CompanyHeaderStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext<Store | undefined> (undefined);
StoreContext.displayName = "StoreContext";

export function useStore () {
	const context = useContext(StoreContext);
	if (context === undefined) {
	  throw new Error("useStore must be used within storeProvider");
	}
  
	return context;
  }

// let store: RootStore;
// const StoreContext = createContext<RootStore | undefined>(undefined);
// StoreContext.displayName = "StoreContext";

// export function useRootStore() {
//   const context = useContext(StoreContext);
//   if (context === undefined) {
//     throw new Error("useRootStore must be used within RootStoreProvider");
//   }

//   return context;
// }

export function StoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode;
  hydrationData?: RootStoreHydration;
}) {
  const store = initializeStore(hydrationData);

  return (
    <StoreContext.Provider  value={store}>{children}</StoreContext.Provider>
  );
}

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore();

  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

// import { createContext, useContext } from "react";
// import CompanyHeaderStore from "./companyHeaderStore";
// import CommonStore from "./commonStore";
// import CompanyStore from "./companyStore";

// interface Store {
//     companyHeaderStore: CompanyHeaderStore;
//     commonStore: CommonStore;
//     companyStore: CompanyStore;
// }

// export const store: Store = {
//     companyStore: new CompanyStore(),
//     companyHeaderStore: new CompanyHeaderStore(),
//     commonStore: new CommonStore()
// }

// export const StoreContext = createContext(store);

// export function useStore () {
//     return useContext(StoreContext);
// }