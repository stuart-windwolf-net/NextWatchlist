import { CounterHydration, CounterStore } from "./CounterStore";
import { sizeSwitcherStoreFactory } from "./SizeSwitcher-common-Store";

export type RootStoreHydration = {
  stopwatchStore?: CounterHydration;
};

export class RootStore {
  counterStore: CounterStore;
  sizeSwitcherStore: ReturnType<typeof sizeSwitcherStoreFactory>;

  constructor() {
    this.counterStore = new CounterStore(this);
    this.sizeSwitcherStore = sizeSwitcherStoreFactory(this);
  }

  hydrate(data: RootStoreHydration) {
    if (data.stopwatchStore) {
      this.counterStore.hydrate(data.stopwatchStore);
    }
  }
}
