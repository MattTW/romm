import { defineStore } from "pinia";
import type { CollectionSchema } from "@/__generated__";
import { uniqBy } from "lodash";

export type Collection = CollectionSchema;

export default defineStore("collections", {
  state: () => {
    return {
      allCollections: [] as Collection[],
      searchText: "" as string,
    };
  },
  getters: {
    filteredCollections: ({ allCollections, searchText }) =>
      allCollections.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
  },
  actions: {
    _reorder() {
      this.allCollections = this.allCollections.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.allCollections = uniqBy(this.allCollections, "id");
    },
    set(collections: Collection[]) {
      this.allCollections = collections;
    },
    add(collection: Collection) {
      this.allCollections.push(collection);
      this._reorder();
    },
    update(collection: Collection) {
      this.allCollections = this.allCollections.map((value) =>
        value.id === collection.id ? collection : value,
      );
      this._reorder();
    },
    exists(collection: Collection) {
      return (
        this.allCollections.filter((p) => p.name == collection.name).length > 0
      );
    },
    remove(collection: Collection) {
      this.allCollections = this.allCollections.filter((p) => {
        return p.name !== collection.name;
      });
    },
    get(collectionId: number) {
      return this.allCollections.find((p) => p.id === collectionId);
    },
  },
});